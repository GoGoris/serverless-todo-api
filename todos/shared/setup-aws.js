const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const localPort = 8000;

// Depends on serverless-offline plugion which adds IS_OFFLINE to process.env when running offline
const offline = process.env.IS_OFFLINE;
const dynamodbLocalOptions = {
	region: "localhost",
	endpoint: "http://localhost:" + localPort
};

module.exports = {
	AWS: AWS,
	DocumentClient: offline ? new AWS.DynamoDB.DocumentClient(dynamodbLocalOptions) : new AWS.DynamoDB.DocumentClient(),
	DynamoDB: offline ? new AWS.DynamoDB(dynamodbLocalOptions) : new AWS.DynamoDB()
};
