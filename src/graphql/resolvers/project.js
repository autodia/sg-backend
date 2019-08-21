const uuid = require("uuid");

const Project = require("../../models/Project");

module.exports = {
  Query: {
    projects: async (root, args, context) => {
      // FIX AUTH
      // if (!context.isAuth) {
      //   throw new Error("Unauthenticated!");
      // }
      try {
        const projects = await Project.find()
          .populate('author')
          .populate('contacts')
          .exec()

        return projects;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  },
  Mutation: {
    createProject: async (root, args, context) => {
      // FIX AUTH
      // if (!context.isAuth) {
      //   throw new Error("Unauthenticated!");
      // }
      const project = new Project({
        created: new Date(args.projectInput.created),
        author: context.userId,
        name: args.projectInput.name,
        description: args.projectInput.description,
        contacts: args.projectInput.contacts
      });
      let createdProject;
      try {
        const result = await project.save();
        createdProject = result;
        return createdProject;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    updateProject: async ( root, { projectId, description, contacts }, context) => {
      // FIX AUTH
      // if (!context.isAuth) {
      //   throw new Error("Unauthenticated!");
      // }
      const project = projects.find({ _id: projectId });
      if (!project) {
        throw new Error(`Could not find project with ID: ${projectId}`);
      }
      if (description !== undefined) {
        project.description = description;
      }
      project.contacts = contacts;
      return project;
    }
  }
};
