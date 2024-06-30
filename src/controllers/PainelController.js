const Pagamento = require('../models/Pagamento');
const Serial = require('../models/Serial');
const Usuario = require('../models/Usuario');
const Produto = require('../models/Produto');
const path = require('path');

const MercadoPago = require('mercadopago');
const { Op } = require('sequelize');
MercadoPago.configure({
    sandbox: false,
    access_token: process.env.MP_CREDENCIAL
});

module.exports = class PainelController {

    static async dashboard(req, res) {

        const produto = await Produto.findOne({attributes:['preco'], raw: true});

        let { id } = req.session.user;

        let verificaPagamento = await Pagamento.findOne({where:{
            [Op.and]:[
                {usuarioId: id},
                {status: 'Aprovado'}
            ]
        }}, {raw: true });

        let userData = await Usuario.findByPk(id, {include: [Pagamento, Serial]}).then(data => data.toJSON());

        // Verifica se a assinatura está ativa
        let pagamento = verificaPagamento != null ? true : false;

        res.render('pages/painel/index', { title: 'Dashboard', user: userData, pagamento: pagamento, preco: produto.preco });
    }

    static async patch(req,res){
        res.download(path.join(__dirname, '../uploads/PATCH-D41D8CD98F00B204E9800998ECF8427E.zip'));
    }

    static async Payment(req, res) {
        let id = Date.now().toString();
        let email = req.session.user.email;

        const produto = await Produto.findOne({attributes:['titulo', 'preco']});
    
        // Define item separately
        let item = {
            id: id,
            title: produto.titulo,
            quantity: 1,
            currency_id: 'BRL',
            unit_price: parseFloat(produto.preco)
            
        };
    
        let dados = {
            items: [item],  // Push the item into the items array
            payer: {
                email: email
            },
            external_reference: id,
            "back_urls": {
                "success": "https://loja.adyson.com.br/painel"
            },
            "auto_return": "approved",
        };
    
        try {
            let pagamento = await MercadoPago.preferences.create(dados);
            await Pagamento.create({
                codigo: id,
                status: "Aguardando pagamento",
                usuarioId: req.session.user.id
            });
            return res.redirect(pagamento.body.init_point);
        } catch (error) {
            return res.json(error.message);
        }
    }
    

    static Logout(req, res) {
        req.session.destroy();
        res.redirect('/login');
    }


}
