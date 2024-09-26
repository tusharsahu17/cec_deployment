const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");  // Folder where files will be uploaded
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer upload
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Accept only PDF files
        const filetypes = /pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: Only PDF files are allowed!");
        }
    }
});

module.exports = upload;