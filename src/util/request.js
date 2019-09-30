import { badRequest } from "./response";

export function logRequest(event) {
  console.log("========== Request ==========");
  console.log("PathParameters: " + JSON.stringify(event.pathParameters));
  console.log("QueryStringParameters: " + JSON.stringify(event.queryStringParameters));
  console.log("Body: " + event.body);
  console.log("========== Request ==========");
}

export function requireInputArgs(keys, params) {
  var inputError = null;

  keys.forEach(
    function(key) {
      if (params && params[key]) {
        // Valid
      } else {
        inputError = badRequest({ status: false, error: `Missing required input argument: ${key}` });
        return;
      }
    }
  );

  return inputError;
}
