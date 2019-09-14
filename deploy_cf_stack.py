import os
import sys

input = sys.argv
valid_stages = [ "Beta", "Prod" ]

if len(input) < 2:
    sys.exit(f"A stage must be specified. Valid stages are: {valid_stages}")
elif len(input) > 2:
    sys.exit(f"Only one input argument was expected, but found multiple: {input[1:]}")
elif input[1] not in valid_stages:
    sys.exit(f"Invalid stage: {input[1]}. Valid stages are: {valid_stages}")

print(f"Provisioning CloudFormation stack for stage {input[1]}")

exit_code = os.system(f"aws cloudformation update-stack --profile Discipleship --stack-name Discipleship --parameters ParameterKey=Stage,ParameterValue={input[1]} --template-body file://cloud_formation/discipleship.yml --capabilities CAPABILITY_NAMED_IAM")

if exit_code != 0:
    print("CloudFormation provisioning encountered an unexpected error.")
    sys.exit(1)
