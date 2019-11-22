const Samplesheet = require("../../models/Samplesheet");

//const transformAssay = require("./merge");

module.exports = {
  Query: {
    samplesheets: async (parent, args, context) => {
      if (!context.isAuth) {
        throw new Error("Unauthenticated!");
      }
      try {
        const samplesheets = await Samplesheet.find();
        return samplesheets;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  },
  Mutation: {
    createSamplesheet: async (parent, { samplesheetInput }, context) => {
      if (!context.isAuth) {
        throw new Error("Unauthenticated!");
      }
      const samplesheet = new Samplesheet({
        created: new Date(),
        fullname: samplesheetInput.fullname,
        author: context.userId,
        project: samplesheetInput.project,
        secuencer: samplesheetInput.secuencer,
        run: samplesheetInput.run,
        flowcell: samplesheetInput.flowcell,
        iemfileversion: samplesheetInput.iemfileversion,
        date: new Date(samplesheetInput.date),
        workflow: samplesheetInput.workflow,
        application: samplesheetInput.application,
        description: samplesheetInput.description,
        chemistry: samplesheetInput.chemistry,
        reads: samplesheetInput.reads,
        umi: samplesheetInput.umi,
        adapter1: samplesheetInput.adapter1,
        adapter2: samplesheetInput.adapter2
      });
      let createdSamplesheet;
      try {
        const result = await samplesheet.save();
        createdSamplesheet = result;
        return createdSamplesheet;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
