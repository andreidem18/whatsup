const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  //Obtener el token
  let token = req.headers["authorization"];
  
  if(token){
      //Quitamos la palabra Bearer del valor de la cabecera authorization
      token = token.replace(/^Bearer\s+/, "");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      if(decoded) {
          req.user = decoded;
          console.log("decoded", decoded);
          return next();            
      }
      return res.status(401).json({message: "El token es invalido"});
  }
  return res.status(401).json({message: "El token no ha sido proporcionado"});

};
