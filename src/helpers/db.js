const mongoose = require("mongoose");
const config = require("config");
const assert = require("assert");
const Assay = require("../models/Assay");

const db_uri = process.env.DB_URI || config.get("mongodb.URI");
const connectDB = async () => {
  try {
    await mongoose.connect(db_uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

const parseUsers = data => {
  data.forEach(async user => {
    const u = await User.findOne({ username: user.username });
    if (!u) {
      User.collection.insert(user, (err, r) => {
        assert.equal(null, err);
        assert.equal(1, r.insertedCount);
        console.log("Dev user added...");
      });
    }
  });
}

const parseAssayData = data => {
  parsedData = data.map(assay => {
    if (assay["singleIndex"]) {
      let index = [];
      assay["singleIndex"]["indexes"]["name"].forEach((_, i) =>
        index.push({
          name: assay["singleIndex"]["indexes"]["name"][i],
          bases: assay["singleIndex"]["indexes"]["bases"][i]
        })
      );
      return {
        ...assay,
        singleIndex: index
      };
    } else if (assay["uniqueDI"]) {
      let index = [];
      assay["uniqueDI"]["indexes"]["name"].forEach((_, i) =>
        index.push({
          name: assay["uniqueDI"]["indexes"]["name"][i],
          i7bases: assay["uniqueDI"]["indexes"]["i7bases"][i],
          i5novabases: assay["uniqueDI"]["indexes"]["i5novabases"][i],
          i5nextbases: assay["uniqueDI"]["indexes"]["i5nextbases"][i]
        })
      );
      return {
        ...assay,
        uniqueDI: index
      };
    } else if (assay["doubleIndex"]) {
      let index1 = [];
      let index2 = [];
      assay["doubleIndex"]["i7indexes"]["name"].forEach((_, i) =>
        index1.push({
          name: assay["doubleIndex"]["i7indexes"]["name"][i],
          bases: assay["doubleIndex"]["i7indexes"]["bases"][i]
        })
      );
      assay["doubleIndex"]["i5indexes"]["name"].forEach((_, i) =>
        index2.push({
          name: assay["doubleIndex"]["i5indexes"]["name"][i],
          novabases: assay["doubleIndex"]["i5indexes"]["novabases"][i],
          nextbases: assay["doubleIndex"]["i5indexes"]["nextbases"][i]
        })
      );
      return {
        ...assay,
        doubleIndex: {
          i7indexes: index1,
          i5indexes: index2
        }
      };
    }
    return assay;
  });
  Assay.collection.insertMany(parsedData, (err, r) => {
    assert.equal(null, err);
    assert.equal(6, r.insertedCount);
    console.log("Assays added...");
  });
};

module.exports = { connectDB, parseAssayData, parseUsers };
