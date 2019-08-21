const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  contacts: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ]
});

module.exports = Project = mongoose.model("project", ProjectSchema, 'project');
