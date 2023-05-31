import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class GaggleModeServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const restApi = apigateway.RestApi.fromRestApiAttributes(
      this,
      "GaggleTechApi",
      {
        restApiId: cdk.Fn.importValue("GaggleTechRestApiId"),
        rootResourceId: cdk.Fn.importValue("GaggleTechRestApiRootResourceId"),
      }
    );

    const modeLambda = new lambda.Function(this, "GaggleModeServiceLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "calc-mode-handler.calcModeHandler",
      code: lambda.Code.fromAsset("../dist"),
    });

    restApi.root
      .addResource("mode")
      .addMethod("POST", new apigateway.LambdaIntegration(modeLambda));
  }
}
