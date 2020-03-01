'use strict';

const dynamoDb = require('./shared/setup-aws').DocumentClient;


exports.handler = async (event) => {
    const todoItem = JSON.parse(event.body);
    const params = {
        TableName: process.env.TODOS_TABLE,
        Item: {
            id: event.pathParameters.id,
            text: todoItem.text,
            completed: !!todoItem.completed
        },
        Expected: {
            id: {
                Value: event.pathParameters.id,
                Exists: true
            }
        }
    };

    return dynamoDb.put(params).promise()
        .then(() => ({
            statusCode: 200,
            body: JSON.stringify(params.Item),
        }))
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
                    body: err.message || "Can't update todo-item.",
                };
            }
        });

};