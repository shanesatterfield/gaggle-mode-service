#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { GaggleModeServiceStack } from "../lib/gaggle-mode-service-stack";

const app = new cdk.App();
new GaggleModeServiceStack(app, "GaggleModeServiceStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
