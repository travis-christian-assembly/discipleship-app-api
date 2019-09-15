import * as documents from "../dal/documents";
import { success, notFoundError, failure } from "../util/response";

export async function main(event, context) {
  const params = {
    TableName: "Courses",
    Key: {
      CourseId: event.pathParameters.courseId
    },
    ConditionExpression:"CourseId = :courseId",
    ExpressionAttributeValues: {
      ":courseId": event.pathParameters.courseId
    }
  };

  try {
    const result = await documents.call("delete", params);
    return success(result.Item);
  } catch (e) {
    if (e.code == "ConditionalCheckFailedException") {
      return notFoundError({ status: false, error: "Item not found." });
    } else {
      return failure({ status: false });
    }
  }
}
