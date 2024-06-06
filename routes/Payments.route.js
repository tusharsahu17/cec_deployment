const express = require("express");
const sha256 = require("sha256");
const axios = require("axios");
const { UserModel } = require("../model/User.model");
const PaymentRouter = express.Router();
PaymentRouter.use(express.json());
const BASE_URL = process.env.BASE_URL;
const MERCHANT_ID = process.env.MERCHANT_ID;
const SALT_INDEX = process.env.SALT_INDEX;
const SALT_KEY = process.env.SALT_KEY;
const PAYMENT_STATUS_URL = process.env.PAYMENT_STATUS_URL;
const PHONE_PE_HOST_URL = process.env.PHONE_PE_HOST_URL;

PaymentRouter.get("/pay-testseries/:_id/:courseId", async (req, res) => {
  try {
    console.log(req.params._id, req.body);
    // const {userId,amount,mobileNumber,name} = req.body
    const _id = req.params._id;
    const courseId = req.params.courseId;

    const amount = req.params.amount || 100;
    if (!_id) {
      return res.status(400).json({ status: false, message: "No user found" });
    }
    const userData = await UserModel.findOne({ _id });
    if (!userData) {
      return res.status(400).json({ status: false, message: "No user found" });
    }
    if (!userData.testSeries.includes(courseId)) {
      userData.testSeries.push(courseId);
    }

    // Save the updated user document
    await userData.save();

    // Generate a unique merchant transaction ID for each transaction
    let merchantTransactionId = "M" + Date.now();

    let normalPayLoad = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: _id,
      amount: amount * 100,
      name: userData[0]?.name,
      redirectUrl: `${BASE_URL}/wallet-payment/validate/${merchantTransactionId}`,
      callbackUrl: `${BASE_URL}/wallet-payment/validate/${merchantTransactionId}`,
      callbackMode: "GET",
      mobileNumber: userData[0]?.phone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    // make base64 encoded payload
    let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
    let base64EncodedPayload = bufferObj.toString("base64");

    let string = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
    let sha256_val = sha256(string);
    let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;
    // return console.log("added");

    axios
      .post(
        `${PHONE_PE_HOST_URL}/pg/v1/pay`,
        {
          request: base64EncodedPayload,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-VERIFY": xVerifyChecksum,
            accept: "application/json",
          },
        }
      )
      .then(function (response) {
        // console.log(response.data)
        // res.status(200).json({ status: true, message: "success",data:response.data })
        res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
      });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});
// PaymentRouter.get("/", async (req, res) => {
//   try {
//     const result = await SliderSchema.find();
//     res.status(200).json({
//       data: result,
//       message: "Slider Images found successfully",
//       status: true,
//     });
//   } catch (err) {
//     res.status(400).json({ message: err.message, status: false });
//   }
// });
// PaymentRouter.delete("/delete/:_id", async (req, res) => {
//   try {
//     const { _id } = req.params;
//     const result = await SliderSchema.findById(_id);
//     if (!result) {
//       return res.status(404).json({ message: "News not found" });
//     }
//     await result.deleteOne();

//     res.status(200).json({
//       message: "Slider Images deleted successfully",
//       status: true,
//     });
//   } catch (err) {
//     res.status(400).json({ message: err.message, status: false });
//   }
// });
module.exports = {
  PaymentRouter,
};
