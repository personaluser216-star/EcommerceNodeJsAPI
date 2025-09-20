const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Login Again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRETKEY);

    if (!req.body) req.body = {};
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = Auth;
