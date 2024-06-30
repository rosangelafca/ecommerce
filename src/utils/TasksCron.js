const { Op } = require('sequelize');
const Pagamento = require('../models/Pagamento');

module.exports = function Tasks() {
    const cron = require('node-cron');

    const hoje = new Date();
    const dataLimite = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

    const where = {
        [Op.and]:[
            {
                createdAt: {
                    [Op.lt]: dataLimite,
                }
            },
            {
                data_pagamento: null
            }
        ]
    } 

    cron.schedule('* 0 * * *', async () => {

        await Pagamento.destroy({where: where});

    })
}

