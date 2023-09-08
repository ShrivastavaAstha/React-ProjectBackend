const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const accountSchema = new mongoose.Schema({
  username: { type: String },
  contact: { type: Number },
  email: { type: String },
  password: { type: String },
  // tokens: [{ token: { type: String, required: true } }],
});
// const accountmodel = mongoose.model("account_datas", accountSchema);
// module.exports = accountmodel;

//hashing the password

// accountSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = bcrypt.hash(this.password, 12);
//   }
//   next();
// });

// accountSchema.methods.generateAuthToken = async function () {
//   try {
//     let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (err) {
//     console.log(err);
//   }
// };
const accountmodel = mongoose.model("account_datas", accountSchema);
module.exports = accountmodel;
