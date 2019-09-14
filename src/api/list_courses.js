import * as documents from "../dal/documents";
import { success, failure } from "../util/response";

export async function main(event, context) {
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
