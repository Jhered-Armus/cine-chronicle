const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers('x-auth-token');

  //verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso no valido' });
  }
// verificar token
try {
  const cifrado = jwt.verify(token, process.env.SECRETA);
  req.usuario = cifrado.usuario;
  next();
} catch (error) {
  res.status(401).json({ msg: 'Token no valido' });
}

};
