const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SampleSchema = new Schema({
  samplesheet: {
    type: Schema.Types.ObjectId,
    ref: "samplesheet"
  },
  lane: {
    type: String
  },
  number: {
    type: String,
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "project"
  },
  type: {
    type: String,
    required: true
  },
  library: {
    type: String,
    required: true
  },
  index1: {
    type: String,
    required: true
  },
  index2: {
    type: String
  },
  description: {
    type: String
  }
});

module.exports = Sample = mongoose.model("sample", SampleSchema, 'sample');
