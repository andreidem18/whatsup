const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  //Get the token
  let token = req.headers["authorization"];
  
  if(token){
      //Remove the word Bearer from the header autorization value
      token = token.replace(/^Bearer\s+/, "");

      try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
      } catch(err){
        return res.status(401).json({message: "El token es invalido"});
      }
  }
  return res.status(401).json({message: "El token no ha sido proporcionado"});
};
