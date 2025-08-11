const { v4: uuid } = require('uuid');
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const task = { id: uuid(), title: body.title, done: false };

  await dynamo.put({
    TableName: process.env.TABLE_NAME,
    Item: task
  }).promise();

  return { statusCode: 201, body: JSON.stringify(task) };
};
