## README for the Original Template
See [here](https://github.com/AnomalyInnovations/serverless-nodejs-starter/blob/master/README.md) for the README of the template that this project was created from.

## Development Environment Setup
### AWS CLI Setup
* Install AWS CLI
  * ***[Preferred]*** Option 1 (via Homebrew, only available on macOS): `brew install awscli`
  * Option 2 (via Pip, available on Linux, Unix and macOS): `sudo pip install awscli`
* Ask Drew for instructions on how to configure the AWS CLI.

### Deploy Infrastructure
* Deploy CloudFormation Stack
  * Execute command: `python3 deploy_cf_stack.py Beta`
* Ask Drew for instructions on how to monitor the CloudFormation deployment progress and the necessary credentials.

### Run Locally
* Install dependencies
  * Execute command: `npm install`
* Run tests locally
  * Test specific function:
    * Example command:
      * `AWS_PROFILE=Discipleship serverless invoke local --function put_course --path fixtures/put_course.json`
      * `AWS_PROFILE=Discipleship serverless invoke local --function get_course --path fixtures/get_course.json`
      * ``
