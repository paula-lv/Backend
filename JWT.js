//middleware para verificar token, usaremos el id para identificar a cada usuario, podría ser el email tmb

const { sign, verify } = require('jsonwebtoken');
const SECRET_KEY = "a6US678h787B8ASF8g89768V78tiJL-._ksu67JGSaljk897DHuyd6YUgha76Y56rF67TYFr6678"

exports.createTokens = (user) => {
    const expiresIn = '30d'; // 30 dias
    const accessToken = sign({ username: user.email, id: user._id.valueOf(), tipo: user.tipo }, SECRET_KEY, {expiresIn: expiresIn});

    return accessToken; 
}

exports.validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if(!accessToken) return res.status(400).json({error: "Usuario no autenticado"});
    
    try {
        const validToken = verify(accessToken, SECRET_KEY);

        if(validToken) {
            req.authenticated = true;
            return next();
        }
    } catch(err) {
        return res.status(400).json({error: err})
    }
}
