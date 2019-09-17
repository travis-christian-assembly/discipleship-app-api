import * as documents from "../dal/documents";
import { logRequest } from "../util/request";
import { success, notFoundError, failure } from "../util/response";

export async function main(event, context) {
  logRequest(event);

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
      return notFoundError({ status: false, error: "Course not found." });
    }
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
