import jwt from "jsonwebtoken";


export const verifyToken = (req, res,next) => {
  const token = req.cookies.access_token;
  // console.log(token);
  if (!token) return res.status(403).send("Token is not provided!");

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.status(401).send("Unauthorized!");
    // console.log(user);
    req.user = user;
    next();
  });

};