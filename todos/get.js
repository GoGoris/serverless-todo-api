'use strict';

const dynamoDb = require('./shared/setup-aws').DocumentClient;


exports.handler = async (event) => {
    const params = {
        TableName: process.env.TODOS_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
    };

    return dynamoDb.get(params).promise()
        .then(result => {
            if (result.Item) {
                return {
                    statusCode: 200,
                    body: JSON.stringify(result.Item)
                };
            } else {
                return { statusCode: 404 };
            }
        })
        .catch(err => {
            console.error(err);
            return {
                statusCode: err.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Couldn\'t fetch the todo item.',
            };
        });
};