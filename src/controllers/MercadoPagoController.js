const Serial = require('../models/Serial');
const Pagamento = require('../models/Pagamento');
const Usuario = require('../models/Usuario');
const axios = require('axios');

const MercadoPago = require('mercadopago');
MercadoPago.configure({
    sandbox: true,
    access_token: process.env.MP_CREDENCIAL
});



module.exports = class MercadoPagoController{

    static async Notify(req,res){
        let id = req.query.id;

        setTimeout(() => {

            let filter = {
                "order.id":id
            }

            MercadoPago.payment.search({
                qs: filter
            }).then(async(data) => {
                let pagamento = data.body.results[0];

                // Verificia se o pagamento existe
                if(pagamento != undefined){
                    
                    // Caso o pagamento exista, ele verifica se foi pago.
                    if(pagamento.status === "approved"){

                        // Ao conferir o status do pagamento e verificar que o pedido foi pago, consulta o id do comprador.
                        const userId = await Pagamento.findOne({where:{codigo: pagamento.external_reference}, attributes:['usuarioId'], raw: true});

                        // busca dados do usuário
                        let dadosUser = await Usuario.findByPk(userId.usuarioId, {raw: true});

                        // Atualiza o status do pagamento
                        await Pagamento.update({
                            status: 'Aprovado',
                            data_pagamento: new Date()
                        }, {where:{codigo: pagamento.external_reference}});

                        // Gera a chave serial do cliente e salva no banco.
                        await axios.post('https://generate-serial-gamma.vercel.app/generate', {
                            idPedido: pagamento.external_reference
                        }).then(async(response) => {

                            // Salva a chave serial do cliente.
                            await Serial.create({
                                chave: response.data.serial,
                                id_usuario: userId.usuarioId
                            });

                            await axios.post('https://servico-email.vercel.app/activate', {
                                nome: dadosUser.nome,
                                email: dadosUser.email,
                                codigo: response.data.serial,
                                ipUser: dadosUser.ip_user
                            })

                        })  

                    }

                } else{
                    console.log("Pagamento não existe");
                }

            }).catch(error => {
                console.log(error)
            })

        }, 20000)


        res.status(200).json({"message":"ok"})
    }

}