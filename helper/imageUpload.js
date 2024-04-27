const imageUpload = function (fileData, pathName) {
  const fileName = fileData.image;
  const attachmentName = Date.now() + fileName?.name;
  const uploadPath = process.cwd() + `/public/${pathName}/` + attachmentName;
  fileName.mv(uploadPath);
  return `/${pathName}/` + attachmentName;
};

module.exports = {
  imageUpload,
};
