'use strict';

const dynamoDb = require('./shared/setup-aws').DocumentClient;


exports.handler = (event, context, callback) => {

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

    dynamoDb.put(params, (error) => {
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: error,
            });
            return;
        }

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        });
    });

};