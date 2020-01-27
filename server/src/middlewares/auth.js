const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.json({ error: "No token provided" });
  const parts = authHeader.split(" ");
  if (!parts.length === 2) return res.json({ error: "Token error" });
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) res.json({ error: "Token malformatted" });
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.json({ error: "Token Invalid" });
    req.userId = decoded.id;
    return next();
  });
};
