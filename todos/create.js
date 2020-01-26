'use strict';

const uuid = require('uuid/v1');
const dynamoDb = require('serverless-dynamodb-client').doc;


exports.handler = async (event) => {
    console.log("Request: " + JSON.stringify(event));
    const todoItem = JSON.parse(event.body);

    if (!todoItem.text) {
        throw {
            statusCode: 400,
            body: {
                "Error": 'Missing text'
            }
        }
    }

    const params = {
        TableName: process.env.TODOS_TABLE,
        Item: {
            id: uuid(),
            text: todoItem.text,
            completed: false
        },
    };
    return dynamoDb.put(params).promise();
};