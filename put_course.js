import uuid from "uuid";
import * as dynamoDb from "./lib/dynamodb";
import { success, failure } from "./lib/response";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "Courses",
    Item: {
      CourseId: uuid.v1(),
      CreatedAt: Date.now(),
      CreatedBy: event.requestContext.identity.cognitoIdentityId,
      Description: data.description
    }
  };

  try {
    await dynamoDb.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
