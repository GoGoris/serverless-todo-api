'use strict';

const dynamoDb = require('./shared/setup-aws').DocumentClient;


exports.handler = async (event) => {
    const params = {
        TableName: process.env.TODOS_TABLE,
    };

    return dynamoDb.scan(params).promise()
        .then(result => ({
            statusCode: 200,
            body: JSON.stringify(result.Items),
        }))
        .catch(err => {
            console.error(err);
            return {
                statusCode: err.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Couldn\'t fetch the todos.',
            };
        });
};