module.exports = {
  context: ({ req, res }) => ({
    authorization: req.headers.authorization || "",
    isAuth: req.isAuth,
    userId: req.userId
  })
};
