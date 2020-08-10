const Mongoose = require("mongoose");
const mySchema = Mongoose.Schema;
let userSchema = new mySchema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
});
userSchema.virtual('userBugs', {
  ref: 'Trackers',
  localField:'_id',
  foreignField:'owner'
})
module.exports = Mongoose.model("users", userSchema);
