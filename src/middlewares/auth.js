const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(token);
    if (!token) {
      throw new Error("Token is not valid");
    }

    const decodedObj = jwt.verify(token, process.env.SECRET_KEY);

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send("ERROR: " + e.message);
  }
};

module.exports = {
  userAuth,
};
