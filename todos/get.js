'use strict';

const dynamoDb = require('./shared/setup-aws').DocumentClient;


exports.handler = (event, context, callback) => {

    const params = {
        TableName: process.env.TODOS_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
    };

    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Couldn\'t fetch the todo item.',
            });
            return;
        }

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        });
    });

};