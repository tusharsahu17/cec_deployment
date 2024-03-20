const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], "node");
      req.body.authorId = decoded.authorId;
      req.body.author = decoded.author;
      if (decoded) {
        next();
      } else {
        res.send({ msg: "Please Login" });
      }
    } catch (err) {
      res.send(err.message);
    }
  } else {
    res.send({ msg: "Please Login" });
  }
};
module.exports = {
  auth,
};
