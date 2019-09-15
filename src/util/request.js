export function logRequest(event) {
  console.log("========== Request ==========");
  console.log("PathParameters: " + JSON.stringify(event.pathParameters));
  console.log("RequestContext::AccountId::CognitoIdentityId: " + event.requestContext.identity.cognitoIdentityId);
  console.log("Body: " + event.body);
  console.log("========== Request ==========");
}
