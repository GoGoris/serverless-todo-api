'use strict';

const uuid = require('uuid/v1');
const dynamoDb = require('./shared/setup-aws').DocumentClient;


exports.handler = async (event) => {
    console.log(event);
    const todoItem = event.body;

    const params = {
        TableName: process.env.TODOS_TABLE,
        Item: {
            id: todoItem.id || uuid(),
            text: todoItem.text,
            completed: !!todoItem.completed
        },
    };
    return dynamoDb.put(params).promise().then(() => params.Item);
}
