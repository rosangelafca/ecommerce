module.exports = function validateDadosCadastro(nome, email){

    let user = {
        nomeUser: nome,
        emailUser: email
    }

    user.nomeUser = user.nomeUser.trim()
    user.nomeUser = user.nomeUser.toLowerCase();
    user.nomeUser = user.nomeUser.replace(/[^a-zA-Z\sÀ-ÿ]/g, '');

    user.emailUser = user.emailUser.trim();
    user.emailUser = user.emailUser.toLowerCase();

    return user;

}