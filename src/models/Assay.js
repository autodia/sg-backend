const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AssaySchema = new Schema({
  assay: {
    type: String,
    required: true
  },
  name_shortcut: {
    type: String
  },
  adapter: {
    type: String
  },
  adapter1: {
    type: String
  },
  adapter2: {
    type: String
  },
  singleIndex: [
    {
      name: {
        type: String
      },
      bases: {
        type: String
      }
    }
  ],
  doubleIndex: {
    i7indexes: [
      {
        name: {
          type: String
        },
        bases: {
          type: String
        }
      }
    ],
    i5indexes: [
      {
        name: {
          type: String
        },
        novabases: {
          type: String
        },
        nextbases: {
          type: String
        }
      }
    ]
  },
  uniqueDI: [
    {
      name: {
        type: String
      },
      i7bases: {
        type: String
      },
      i5novabases: {
        type: String
      },
      i5nextbases: {
        type: String
      }
    }
  ]
});

module.exports = Assay = mongoose.model("assay", AssaySchema, 'assay');
