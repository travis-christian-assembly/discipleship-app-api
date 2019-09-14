import * as documents from "../dal/documents";
import { success, notFoundError, failure } from "../util/response";

export async function main(event, context) {
  const params = {
    TableName: "Courses",
    Key: {
      CourseId: event.pathParameters.courseId
    }
  };

  try {
    const result = await documents.call("get", params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return notFoundError({ status: false, error: "Item not found." });
    }
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
