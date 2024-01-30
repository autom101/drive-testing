require("dotenv").config();
const { google } = require("googleapis");
const path = require("path");
const { uploadFileToHaletaleFolder } = require("./uploadFile");
const findHaleTaleFolderId = require("./findHaleTaleFolderId");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function main() {
  const drive = google.drive({
    version: "v3",
    auth: oAuth2Client,
  });

  const filePath = path.join(__dirname, "test-picture.svg");
  const haletaleFolderId = await findHaleTaleFolderId(drive);
  const uploadResponse = await uploadFileToHaletaleFolder(
    drive,
    "image/svg+xml",
    filePath,
    haletaleFolderId
  );
  console.log(uploadResponse);
}

main();
