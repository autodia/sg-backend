const uuid = require("uuid");

const Project = require("../../models/Project");

module.exports = {
  Query: {
    project: async (root, { id }, context) => {
      // FIX AUTH
      // if (!context.isAuth) {
      //   throw new Error("Unauthenticated!");
      // }
      try {
        const project = await Project.findById(id)
          .populate('author')
          .populate('contacts')
          .exec()

        return project;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
