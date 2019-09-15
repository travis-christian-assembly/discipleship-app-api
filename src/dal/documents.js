import AWS from "aws-sdk";

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](
    params,
    function(err, data) {
      if (err) {
        return err;
      } else {
        return data;
      }
    }
  ).promise();
}
