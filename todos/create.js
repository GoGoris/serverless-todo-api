'use strict';

const uuid = require('uuid/v1');
const dynamoDb = require('./shared/setup-aws').DocumentClient;


exports.handler = async (event) => {
    const todoItem = JSON.parse(event.body);
    const params = {
        TableName: process.env.TODOS_TABLE,
        Item: {
            id: todoItem.id || uuid(),
            text: todoItem.text,
            completed: !!todoItem.completed
        },
    };

    return dynamoDb.put(params).promise().then(() => ({
        statusCode: 201,
        body: JSON.stringify(params.Item)
    }));
}
