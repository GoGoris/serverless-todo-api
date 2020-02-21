const AWSXRay = require('aws-xray-sdk-core');
const AWS = require('aws-sdk');
const localPort = 8000;

// Depends on serverless-offline plugion which adds IS_OFFLINE to process.env when running offline
const offline = process.env.IS_OFFLINE;
const dynamodbLocalOptions = {
	region: "localhost",
	endpoint: "http://localhost:" + localPort
};

if (offline) {
	module.exports = {
		AWS: AWS,
		DocumentClient: new AWS.DynamoDB.DocumentClient(dynamodbLocalOptions),
		DynamoDB: new AWS.DynamoDB(dynamodbLocalOptions)
	}
} else {
	const awsWithXray = AWSXRay.captureAWS(AWS);
	module.exports = {
		AWS: awsWithXray,
		DocumentClient: new awsWithXray.DynamoDB.DocumentClient(),
		DynamoDB: new awsWithXray.DynamoDB()
	}
}
