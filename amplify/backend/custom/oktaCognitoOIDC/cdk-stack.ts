import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import * as cognito from "@aws-cdk/aws-cognito";
import * as cdk from '@aws-cdk/core';
import dotenv from 'dotenv';
import { env } from 'process';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
const backendConfig = require("../../../backend-config.json");

dotenv.config()

export class cdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });
    /* AWS CDK code goes here - learn more: https://docs.aws.amazon.com/cdk/latest/guide/home.html */
    
    
    const authResourceName = Object.keys(backendConfig.auth)[0]
    const dependencies: AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this,
      amplifyResourceProps.category,
      amplifyResourceProps.resourceName,
      [
        {
          category: "auth", 
          resourceName: authResourceName
        }
      ] 
    );

    const userPool = cognito.UserPool.fromUserPoolArn(this, "userPoolRef", cdk.Fn.ref(dependencies.auth[authResourceName].UserPoolArn))

    new cognito.UserPoolIdentityProviderOidc(this, 'Okta', {
        name: "Okta",
        clientId: env["OKTA_CLIENT_ID"],
        clientSecret: env["OKTA_CLIENT_SECRET"],
        issuerUrl: env["OKTA_ISSUER_URL"],
        userPool,
        attributeRequestMethod: cognito.OidcAttributeRequestMethod.POST,
        attributeMapping: {
          email: cognito.ProviderAttribute.other('email')
        },
        scopes: ['email','profile','openid'],
      });    

  }
}