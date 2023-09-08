const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  feedback: { type: String },
});

const feedbackmodel = mongoose.model("feedback_datas", feedbackSchema);
module.exports = feedbackmodel;
