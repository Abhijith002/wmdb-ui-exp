// Create the DynamoDB service client module using ES6 syntax.
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { create } from "ipfs-http-client";
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

// Set the parameters
const params = {
  TableName: "wmdbproposals",
};

async function getLinks(ipfsPath) {
  const url = "https://dweb.link/api/v0";
  const ipfs = create({ url });

  const links = [];
  for await (const link of ipfs.ls(ipfsPath)) {
    links.push(link);
  }
  return links;
}

const run = async () => {
  try {
    let cids = [];
    const data = await ddbDocClient.send(new ScanCommand(params));
    for (let i = 0; i < data.Items.length; i++) {
      let links = await getLinks(data.Items[i].cid);
      cids.push({
        cid: `${data.Items[i].cid}`,
        imgURL: `https://${data.Items[i].cid}.ipfs.w3s.link/${links[0].name}`,
        dataURL: `https://${data.Items[i].cid}.ipfs.w3s.link/${links[1].name}`,
        proposalID: data.Items[i].proposalid,
      });
    }
    return cids;
  } catch (err) {
    console.log("Error", err);
  }
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    let result = await run();
    res.status(200).json(result);
  }
}
