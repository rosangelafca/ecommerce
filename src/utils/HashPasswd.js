module.exports = function HashPasswd(senha){
    const bcrypt = require('bcrypt');
    const hashPasswd = bcrypt.hash(senha, 10);
    return hashPasswd;
}