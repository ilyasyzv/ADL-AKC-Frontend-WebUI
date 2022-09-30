import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-east-1:06244bd0-9791-4228-93e0-dc9a31336892',

        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',

        // // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // // Required only if it's different from Amazon Cognito Region
        // identityPoolRegion: 'XX-XXXX-X',

        // // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_smJ9ggpgb',

        // // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '7ggfikqc93tue30463eiibb6a3',

        // // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,

        // // OPTIONAL - Configuration for cookie storage
        // // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        // cookieStorage: {
        // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //     domain: '.yourdomain.com',
        // // OPTIONAL - Cookie path
        //     path: '/',
        // // OPTIONAL - Cookie expiration in days
        //     expires: 365,
        // // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
        //     sameSite: "strict" | "lax",
        // // OPTIONAL - Cookie secure flag
        // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        //     secure: true
        // },

        // // OPTIONAL - customized storage object
        // storage: MyStorage,

        // // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        // authenticationFlowType: 'USER_PASSWORD_AUTH',

        // // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        // clientMetadata: { myCustomKey: 'myCustomValue' },

         // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: 'samldpocdev.auth.us-east-1.amazoncognito.com',
            //scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            scope: ['openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: 'https://master.d33v7w13kus2av.amplifyapp.com/dashboard',
            redirectSignOut: 'https://master.d33v7w13kus2av.amplifyapp.com/dashboard',
            responseType: 'token' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
    }
});

// You can get the current config object
export const awsconfig = Auth.configure();
