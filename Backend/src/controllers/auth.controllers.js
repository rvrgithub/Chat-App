const User = require("../modules/user.module");
// for get the token ... by jsonwebtoken..
var jwt = require("jsonwebtoken");
require("dotenv").config();
const gererateToken = (user) => {
  console.log(process.env.SECRET_KEY);
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);

  // return jwt.sign({user},"hellokjdfh"); //solt//
};

const register = async (req, res) => {
  try {
    // check email is alreay exist or not?....
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      // if is present
      return res.status(400).send({ message: "Email is already Exist" });
    }
    // create new user ...
    user = await User.create(req.body);
    const token = gererateToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ messag: err.message });
  }
};

// login part..........

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check if mail exists
    if (!user) {
      return res.status(400).send("Wrong Email or Password");
    }
    //    if exist and check password
    const match = user.checkPassword(req.body.password);
    if (!match) {
      return res.status(400).send({ message: "Wrong Email or Password" });
    }
    // if it match
    const token = gererateToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = { register, login };
