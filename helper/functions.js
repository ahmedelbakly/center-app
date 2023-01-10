// import jsonwebtoken
const JWT = require("jsonwebtoken");

//********************************************************** */
// create function to create access-token  with three parameter
exports.generateToken = (userLog, secret, expire) => {
  const accessToken = JWT.sign(
    {
      id: userLog.id,
      name : userLog.name,
      type:userLog.type
    },
    secret,
    { expiresIn: expire }
  );
  return accessToken;
};
//************************************************************************** */

//create verify function to verify user authorize or not
exports.verifyToken = async (req, res, next) => {
  const authHeader = await req.headers.authorization;
  if (authHeader) {
    // const token = authHeader.split(" ")[1];
    const token = authHeader;
    console.log("token is :" + token);
   const variation = await  JWT.verify(token, "MySEcretToken", (error, user) => {
      if (error) {
        res.status(404).json("token not valid");
      }
      req.user = user;
      console.log(req.user);
      next();
    });
  } else {
    res.status(403).json("user not authorization");
  }
};
