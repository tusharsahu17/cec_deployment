const mongoose = require("mongoose");

const sliderSchema = mongoose.Schema(
  {
    image: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

// Define the models
const SliderSchema = mongoose.model("Sliders", sliderSchema);

module.exports = {
  SliderSchema,
};
