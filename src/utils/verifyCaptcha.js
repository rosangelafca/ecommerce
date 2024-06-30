async function verifyCaptcha(token){
    const axios = require('axios');
    
    const verify = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        secret: process.env.SECRET_CAPTCHA,
        response: token
    }).then((response) => {
        return response.data.success;
    });

    

    return verify;
}

module.exports = verifyCaptcha;