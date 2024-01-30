async function findHaleTaleFolderId(drive, mimeType, filePath) {
  let id;
  try {
    const response = await drive.files.list();

    data = await response.data;

    const haletaleFolder = data.files.find(
      (file) =>
        file.name.toUpperCase() === "HALETALE" &&
        file.mimeType === "application/vnd.google-apps.folder"
    );
    ({ id } = haletaleFolder);
  } catch (err) {
    console.error(err);
  }

  return id;
}

module.exports = findHaleTaleFolderId;
