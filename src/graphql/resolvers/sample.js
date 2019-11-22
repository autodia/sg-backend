const Samplesheet = require("../../models/Samplesheet");

module.exports = {
  Mutation: {
    createSamples: async (parent, { samplesInput }, context) => {
      if (!context.isAuth) {
        throw new Error("Unauthenticated!");
      }

      console.log(samplesInput)
    }
  }
};
