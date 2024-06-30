const {Router} = require('express');
const router = Router();
const UsuarioController = require('../controllers/UsuarioController');
const Produto = require('../models/Produto');

router
.get('/', UsuarioController.FormCadastro)
.get('/login', UsuarioController.FormLogin)
.post('/signin', UsuarioController.Cadastro)
.post('/login', UsuarioController.Login)
.get('/privacidade', UsuarioController.Privacidade)
.get('/price', async(req,res) => {
    const produto = await Produto.findOne({attributes: ['preco']});
    res.status(200).json(produto)
})

module.exports = router;