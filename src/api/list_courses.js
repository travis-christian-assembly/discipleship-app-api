import * as documents from "../dal/documents";
import { logRequest, requireInputArgs } from "../util/request";
import { success, failure } from "../util/response";

export async function main(event, context) {
  logRequest(event);

  const queryParams = event.queryStringParameters;
  const inputError = requireInputArgs(["requestedBy"], queryParams);
  if (inputError) {
    return inputError;
  }

  const params = {
    TableName: "Courses",
    IndexName: "ByCreators",
    KeyConditionExpression: "CreatedBy = :created_by",
    ExpressionAttributeValues: {
      ":created_by": queryParams.requestedBy
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
