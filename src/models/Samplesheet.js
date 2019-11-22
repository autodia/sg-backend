const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SamplesheetSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  fullname: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  sequencer: {
    type: String,
    required: true
  },
  run: {
    type: String,
    required: true
  },
  flowcell: {
    type: String
  },
  iemfileversion: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  workflow: {
    type: String,
    required: true
  },
  application: {
    type: String,
    required: true
  },
  assay: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  chemistry: {
    type: String,
    required: true
  },
  reads: {
    type: String,
    required: true
  },
  umi: {
    type: String,
    required: true
  },
  adapter1: {
    type: String,
    required: true
  },
  adapter2: {
    type: String,
    required: true
  }
});

module.exports = Samplesheet = mongoose.model("samplesheet", SamplesheetSchema, 'samplesheet');
