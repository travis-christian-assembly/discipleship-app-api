import * as documents from "../dal/documents";
import { logRequest } from "../util/request";
import { success, failure } from "../util/response";

export async function main(event, context, callback) {
  logRequest(event);

  const data = JSON.parse(event.body);

  const params = {
    TableName: "Courses",
    Item: {
      CourseId: event.pathParameters.courseId,
      LastTouchedAt: Date.now(),
      CreatedBy: event.requestContext.identity.cognitoIdentityId,
      Description: data.description
    }
  };

  try {
    await documents.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
