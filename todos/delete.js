'use strict';

const dynamoDb = require('./shared/setup-aws').DocumentClient;


exports.handler = async (event) => {

    const params = {
        TableName: process.env.TODOS_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
        Expected: {
            id: {
                Value: event.pathParameters.id,
                Exists: true
            }
        }
    };

    return dynamoDb.delete(params).promise()
        .then(() => {
            return { statusCode: 204 };
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'ConditionalCheckFailedException') {
                return {
                    statusCode: 404,
                    headers: { 'Content-Type': 'text/plain' },
                    body: "Todo-item does not exist.",
                };
            } else {
                return {
                    statusCode: err.statusCode || 501,
                    headers: { 'Content-Type': 'text/plain' },
                    body: err.message || "Can't delete todo-item.",
                };
            }
        });
};