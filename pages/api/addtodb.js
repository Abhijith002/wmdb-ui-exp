// Create the DynamoDB service client module using ES6 syntax.
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
// Set the AWS Region.
const REGION = "us-east-1"; // For example, "us-east-1".

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
  region: REGION,
});

// Create a service client module using ES6 syntax.
const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

// Create the DynamoDB document client.
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);

const putItem = async (params) => {
  // Set the parameters.
  //   const params = {
  //     TableName: "wmdbproposals",
  //     Item: {
  //       primaryKey: "VALUE_1",
  //       sortKey: "VALUE_2",
  //     },
  //   };
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.log("Success - item added or updated", data);
  } catch (err) {
    console.log("Error", err.stack);
  }
};

export default async function handler(req, res) {
  const prpdata = JSON.parse(req.body);
  if (req.method === "POST") {
    const params = {
      TableName: "wmdbproposals",
      Item: {
        proposalid: prpdata.proposalid,
        cid: prpdata.cid,
        proposalstate: prpdata.state,
      },
    };
    putItem(params);
    res.status(200).json({ message: "Proposal added successfully" });
  }
}
