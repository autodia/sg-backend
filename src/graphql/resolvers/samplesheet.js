const Samplesheet = require("../../models/Samplesheet");

//const transformAssay = require("./merge");

module.exports = {
  Query: {
    samplesheets: async (parent, args, context) => {
      // FIX AUTH
      // if (!context.isAuth) {
      //   throw new Error("Unauthenticated!");
      // }
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
      // FIX AUTH
      // if (!context.isAuth) {
      //   throw new Error("Unauthenticated!");
      // }
      const samplesheet = new Samplesheet({
        author: context.userId,
        project_id: "5d1dd7a39a0e623d185128ed",
        fullname: samplesheetInput.fullname,
        secuencer: samplesheetInput.secuencer,
        run: samplesheetInput.run,
        flowcell: samplesheetInput.flowcell,
        iemfileversion: samplesheetInput.iemfileversion,
        sequencer: samplesheetInput.sequencer,
        date: new Date(samplesheetInput.date),
        workflow: samplesheetInput.workflow,
        application: samplesheetInput.application,
        description: samplesheetInput.description,
        chemistry: samplesheetInput.chemistry,
        reads1: samplesheetInput.reads1,
        reads2: samplesheetInput.reads2,
        adapter1: samplesheetInput.adapter1,
        adapter2: samplesheetInput.adapter2,
        samples: new Array(samplesheetInput.samples)
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
