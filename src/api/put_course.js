import * as documents from "../dal/documents";
import { logRequest, requireInputArgs } from "../util/request";
import { success, conflictError, failure } from "../util/response";

export async function main(event, context, callback) {
  logRequest(event);

  const data = JSON.parse(event.body);
  const inputError = requireInputArgs(["requestedBy"], data);
  if (inputError) {
    return inputError;
  }

  // If `revisionToUpdateFrom` is specified, perform an UPDATE, otherwise, perform a CREATE.
  var isCreate = data.revisionToUpdateFrom == null;

  const params = {
    TableName: "Courses",
    Item: {
      CourseId: event.pathParameters.courseId,
      LastTouchedAt: Date.now(),
      CreatedBy: data.requestedBy,
      Description: data.description
    }
  };

  if (isCreate) {
    params.Item.Revision = 1;
    params.ConditionExpression = "attribute_not_exists(CourseId)";
  } else {
    params.Item.Revision = data.revisionToUpdateFrom + 1;
    params.ConditionExpression = "attribute_exists(CourseId) AND CreatedBy = :created_by AND Revision = :revision_to_update_from";
    params.ExpressionAttributeValues = {
      ":created_by": data.requestedBy,
      ":revision_to_update_from": data.revisionToUpdateFrom
    };
  }

  try {
    await documents.call("put", params);
    return success(params.Item);
  } catch (e) {
    if (e.code == "ConditionalCheckFailedException") {
      return conflictError({ status: false, error: isCreate ? "Course with a same CourseId already exists." : "Encountered a conflict while attempting an update." });
    } else {
      console.log(e);
      return failure({ status: false });
    }
  }
}
