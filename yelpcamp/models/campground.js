var mongoose = require('mongoose');
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "myComment"
    }
  ]
});
module.exports = mongoose.model("Campground", campgroundSchema);
