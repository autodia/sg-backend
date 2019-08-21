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
  project_id: {
    type: Schema.Types.ObjectId,
    ref: "project"
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
  description: {
    type: String
  },
  chemistry: {
    type: String,
    required: true
  },
  reads1: {
    type: String,
    required: true
  },
  reads2: {
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
  },
  /* samples: [
    {
      type: Schema.Types.ObjectId,
      ref: "sample"
    }
  ] */
  samples: [
    {
      lane: {
        type: String
      },
      number: {
        type: String,
        required: true
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
    }
  ]
});

module.exports = Samplesheet = mongoose.model("samplesheet", SamplesheetSchema, 'samplesheet');
