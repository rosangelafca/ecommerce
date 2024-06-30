module.exports = function validateDadosCadastro(email, senha){

    let user = {
        emailUser: email,
        senhaUser: senha
    }

    user.emailUser = user.emailUser.trim()
    user.emailUser = user.emailUser.toLowerCase();

    user.senhaUser = user.senhaUser.trim();

    return user;

}