import { AmplifyAuthCognitoStackTemplate } from '@aws-amplify/cli-extensibility-helper';

const allowedOAuthScopes = ["aws.cognito.signin.user.admin", "email", "openid", "phone", "profile"]

export function override(resources: AmplifyAuthCognitoStackTemplate) {
    // UserPoolClient CF Reference
    // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html

    const { userPoolClient, userPoolClientWeb } = resources

    userPoolClient.addPropertyOverride("SupportedIdentityProviders", ["Okta"])
    userPoolClient.addPropertyOverride("CallbackURLs", ["http://localhost:3000/"])
    userPoolClient.addPropertyOverride("LogoutURLs", ["http://localhost:3000/"])
    userPoolClient.addPropertyOverride("AllowedOAuthFlows", ["code"])
    userPoolClient.addPropertyOverride("AllowedOAuthFlowsUserPoolClient", "true")
    userPoolClient.addPropertyOverride("AllowedOAuthScopes", allowedOAuthScopes)

    userPoolClientWeb.addPropertyOverride("SupportedIdentityProviders", ["Okta"])
    userPoolClientWeb.addPropertyOverride("CallbackURLs", ["http://localhost:3000/"])
    userPoolClientWeb.addPropertyOverride("LogoutURLs", ["http://localhost:3000/"])
    userPoolClientWeb.addPropertyOverride("AllowedOAuthFlows", ["code"])
    userPoolClientWeb.addPropertyOverride("AllowedOAuthFlowsUserPoolClient", "true")
    userPoolClientWeb.addPropertyOverride("AllowedOAuthScopes", allowedOAuthScopes)
}