const mongoose = require("mongoose");
const pyqSchema = mongoose.Schema(
    {
        file: { type: String, required: true },
        name: { type: String, required: true },
        desc: { type: String, required: false }
    },
    {
        versionKey: false,
    }
);

const PyqSchema = mongoose.model("pyq", pyqSchema);

module.exports = {
    PyqSchema,
};
