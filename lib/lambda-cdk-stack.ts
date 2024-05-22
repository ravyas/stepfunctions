import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';

export class LambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new IAM role
    const myRole = new iam.Role(this, 'MyRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    const lambdaFunction = new lambda.Function(this, 'LambdaHandler', {
      functionName: 'MyLambdaFunction',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src/lambda')),
      environment: {
        REGION: 'us-east-1',
      },
      role: myRole,
    });

    const anotherLambdaFunction = new lambda.Function(this, 'AnotherLambdaHandler', {
      functionName: 'AnotherLambdaFunction',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src/another-lambda')),
      environment: {
        REGION: 'us-east-1',
      },
    });

    // Define a task based on the Lambda function
    const lambdaTask = new tasks.LambdaInvoke(this, 'InvokeLambda', {
      lambdaFunction: anotherLambdaFunction,
    });

    // Define the state machine
    const stateMachine = new stepfunctions.StateMachine(this, 'StateMachine', {
      stateMachineName: 'MyStateMachine',
      definition: lambdaTask,
    });

    // Add a policy to the role to allow starting the state machine
    myRole.addToPolicy(new iam.PolicyStatement({
      actions: ['states:StartExecution'],
      resources: [stateMachine.stateMachineArn],
    }));
  }
}
