const User = require("../../models/User");

module.exports = {
  Query: {
    users: async (root, args, context) => {
      if (!context.isAuth) {
        throw new Error("Unauthenticated!");
      }
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
