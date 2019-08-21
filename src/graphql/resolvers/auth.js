
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");

module.exports = {
  Query: {
    login: async (root, { username, password }, context) => {
      const user = await User.findOne({ username: username });
      if (!user) {
        throw new Error("User does not exist!");
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Password is incorrect!");
      }

      secret = config.get("jwt.secret");
      payload = {
        "_id": user.id,
        "exp": Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiration
        "username": user.username
      }
      const token = jwt.sign(payload, secret);

      return { token: token };
    }
  },
  Mutation: {
    createUser: async (root, args, context) => {
      console.log(args);
      try {
        const existingUser = await User.findOne({
          username: args.userInput.username
        });
        if (existingUser) {
          throw new Error("User exists already.");
        }
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

        const user = new User({
          username: args.userInput.username,
          password: hashedPassword
        });

        const result = await user.save();

        return { ...result._doc, password: null, _id: result.id };
      } catch (err) {
        throw err;
      }
    }
  }
};
