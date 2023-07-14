const Users = require('./auth.controller');
module.exports = (router)=> {
    router.post('/register', Users.createUser);
    router.post('/login', Users.loginUser);
    router.get('/logout', Users.logOut);
    router.get('/usuario/:email', Users.obtenerUsuario);
}