const Usuario = require('../models/Usuario');
const HashPasswd = require('../utils/HashPasswd');
const bcrypt = require('bcrypt');
const validateDadosCadastro = require('../utils/ValidateDadosCadastro');
const validateDadosLogin = require('../utils/ValidateDadosLogin');
const verifyCaptcha = require("../utils/verifyCaptcha");

module.exports = class UsuarioController {
    static FormCadastro(req, res) {
        if(req.session.user){
            return res.redirect('/painel')
        }

        res.render('pages/cadastro', { title: 'Cadastre-se', sucessoMsg: req.flash('sucessoMsg'), erroMsg: req.flash('erroMsg') })
    }

    static FormLogin(req, res) {
        if(req.session.user){
            return res.redirect('/painel')
        }
        res.render('pages/login', { title: 'Entrar', erroMsg: req.flash('erroMsg') })
    }

    static async Cadastro(req, res) {

        let { nome, email, senha, token_captcha } = req.body;

        const captchaIsValide = await verifyCaptcha(token_captcha)

        if(!captchaIsValide){
            req.flash('erroMsg', 'Captcha inválido!');
           return res.redirect('/')
        }

        
        let {nomeUser, emailUser} = validateDadosCadastro(nome,email);

        senha = senha.trim();
        senha = await HashPasswd(senha); // Cria o hash da senha

        const usuario = await Usuario.count({
            where: {
                email: emailUser
            }
        });

        if (usuario > 0) {
            req.flash('erroMsg', 'Você já possui uma conta. Faça login!');
            return res.redirect('/')
        }

        try {

            await Usuario.create({
                nome: nomeUser,
                email: emailUser,
                hash_passwd: senha
            })
            req.flash('sucessoMsg', 'Sua conta foi criada com sucesso! Faça login.');
            res.redirect('/');

        } catch (error) {

            req.flash('erroMsg', 'Houve um erro ao criar sua conta!');
            res.redirect('/');

        }
    }

    static async Login(req, res) {

        let { email, senha, token_captcha } = req.body;

        const captchaIsValide = await verifyCaptcha(token_captcha)

        if(!captchaIsValide){
            req.flash('erroMsg', 'Captcha inválido!');
           return res.redirect('/login');
        }
        
        let {emailUser, senhaUser} = validateDadosLogin(email,senha)

        const usuario = await Usuario.findOne({ where: { email: emailUser } }).then(user => {
            if (user) {
                user.dataValues.pagamento = user.dataValues.pagamento != 0 ? true : false;
                let name = user.dataValues.nome.split(" ");
                user.dataValues.nome = name[0];
                return user.toJSON()
            }

            return user;
        });

        if (usuario != null && await bcrypt.compare(senhaUser, usuario.hash_passwd)) {
            let ip = req.body.ipUser;

            await Usuario.update({
                ip_user: ip
            }, { where: { id: usuario.id } })

            req.session.user = { id: usuario.id, nome: usuario.nome, email: usuario.email, ipUser: ip };
            res.redirect('/painel')
            return
        }

        req.flash('erroMsg', 'Usuário ou senha inválidos!');
        res.redirect('/login');

    }

    static Privacidade(req,res){
        res.render('pages/privacidade', {title: "Política de Privacidade"})
    }

}