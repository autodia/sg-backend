const { merge } = require("lodash");

const assayResolver = require("./assay");
const projectResolver = require("./project");
const getProjectResolver = require("./get-project");
const samplesheetResolver = require("./samplesheet");
const authResolver = require("./auth");
const userResolver = require("./user");
const sampleResolver = require("./sample");

const resolvers = merge(
  assayResolver,
  projectResolver,
  getProjectResolver,
  userResolver,
  samplesheetResolver,
  authResolver, 
  sampleResolver 
);

exports.resolvers = resolvers;
