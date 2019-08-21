const Assay = require("../../models/Assay");

//const transformAssay = require("./merge");

module.exports = {
  Query: {
    assays: async () => {
      // FIX AUTH
      // if (!context.isAuth) {
      //   throw new Error("Unauthenticated!");
      // }
      try {
        const assays = await Assay.find();
        return assays;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
