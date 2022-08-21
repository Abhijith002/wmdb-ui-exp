import { IncomingForm } from "formidable";
import { Web3Storage, getFilesFromPath } from "web3.storage";
import * as fs from "fs";

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return process.env.WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  return cid;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const asyncParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  console.log("Receiving");
  if (req.method === "POST") {
    const result = await asyncParse(req);
    fs.writeFile(
      result.files.movieIMG.newFilename + "data",
      result.fields.data,
      "utf8",
      (err) => {
        if (err) console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
        }
      }
    );
    const filesImg = await getFilesFromPath(result.files.movieIMG.filepath);
    const filesData = await getFilesFromPath(
      result.files.movieIMG.newFilename + "data"
    );

    const files = filesImg.concat(filesData);
    console.log(files);
    let fileCID = await storeFiles(files);
    fs.unlink(result.files.movieIMG.newFilename + "data", (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    res.status(200).json({ fileCID: fileCID });
    // res.status(200).json({ fileCID: "fileCID " });
  }
}
