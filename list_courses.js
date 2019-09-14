import * as dynamoDb from "./lib/dynamodb";
import { success, failure } from "./lib/response";

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
    const result = await dynamoDb.call("query", params);
    return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
