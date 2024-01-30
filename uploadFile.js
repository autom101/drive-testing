const fs = require("fs");

async function uploadFileToHaletaleFolder(drive, mimeType, filePath, folderId) {
  let data;
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "Test Picture for Haletale-test", //name of file going to be sent (is not the same as the one in the local computer)
        mimeType, //type of the file, which in this case is svg
        parents: [folderId], //sets the parent as the haletale folder
      },
      media: {
        mimeType,
        body: fs.createReadStream(filePath),
      },
    });

    data = await response.data;
  } catch (err) {
    console.error(err);
  }

  return data;
}

module.exports = { uploadFileToHaletaleFolder };
