import * as documents from "../dal/documents";
import { logRequest, requireInputArgs } from "../util/request";
import { success, notFoundError, failure } from "../util/response";

export async function main(event, context) {
  logRequest(event);

  const queryParams = event.queryStringParameters;
  const inputError = requireInputArgs(["requestedBy"], queryParams);
  if (inputError) {
    return inputError;
  }

  const params = {
    TableName: "Courses",
    Key: {
      CourseId: event.pathParameters.courseId
    },
    ConditionExpression:"CourseId = :courseId AND CreatedBy = :created_by",
    ExpressionAttributeValues: {
      ":courseId": event.pathParameters.courseId,
      ":created_by": queryParams.requestedBy
    }
  };

  try {
    const result = await documents.call("delete", params);
    return success(result.Item);
  } catch (e) {
    if (e.code == "ConditionalCheckFailedException") {
      return notFoundError({ status: false, error: "Course not found." });
    } else {
      console.log(e);
      return failure({ status: false });
    }
  }
}
