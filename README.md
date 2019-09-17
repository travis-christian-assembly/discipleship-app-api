## README for the Original Template
See [here](https://github.com/AnomalyInnovations/serverless-nodejs-starter/blob/master/README.md) for the README of the template that this project was created from.

## Development Environment Setup
### AWS CLI Setup
* Install AWS CLI
  * ***[Preferred]*** Option 1 (via `Homebrew`): `brew install awscli`
  * Option 2 (via Pip): `sudo pip install awscli`
* Ask Drew for instructions on how to configure the AWS CLI.

### Serverless CLI Setup
* Execute command: `npm install serverless -g`

### Deploy Infrastructure
* Install dependencies
  * Execute command: `npm install`
* Deploy to Beta
  * Execute command: `serverless deploy --stage beta`

### Run Locally
* Install dependencies
  * Execute command: `npm install`
* Run tests locally
  * Test specific local function:
    * Example commands:
      * `AWS_PROFILE=Discipleship serverless invoke local --stage beta --function putCourse --path tst/fixtures/put_course.json`
      * `AWS_PROFILE=Discipleship serverless invoke local --stage beta --function getCourse --path tst/fixtures/get_course.json`
      * `AWS_PROFILE=Discipleship serverless invoke local --stage beta --function listCourses --path tst/fixtures/list_courses.json`
      * `AWS_PROFILE=Discipleship serverless invoke local --stage beta --function deleteCourse --path tst/fixtures/delete_course.json`
  * Test all local functions:
    * Execute command: `python integration_tests_local.py`
  * Test specific remote API in Beta:
    * Globally install `AWS API Gateway Test CLI`: `npm install -g aws-api-gateway-cli-test`
    * Example commands:
      * `apig-test --username='USER_NAME' --password='PASSWORD' --user-pool-id='USER_POOL_ID' --app-client-id='APP_CLIENT_ID' --cognito-region='REGION' --identity-pool-id='IDENTITY_POOL_ID' --invoke-url='API_GATEWAY_URL' --api-gateway-region='REGION' --path-template='API_GATEWAY_PATH' --method='HTTP_METHOD' --body='REQUEST_BODY_JSON'`
