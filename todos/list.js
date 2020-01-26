'use strict';

const dynamoDb = require('serverless-dynamodb-client').doc;


exports.handler = (event, context, callback) => {
    const params = {
        TableName: process.env.TODOS_TABLE,
    };

    dynamoDb.scan(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Couldn\'t fetch the todos.',
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
        callback(null, response);
    });
};