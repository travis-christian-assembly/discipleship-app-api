import * as documents from "../dal/documents";
import { logRequest } from "../util/request";
import { success, failure } from "../util/response";

export async function main(event, context) {
  logRequest(event);

  const params = {
    TableName: "Courses",
    IndexName: "ByCreators",
    KeyConditionExpression: "CreatedBy = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const result = await documents.call("query", params);
    return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
