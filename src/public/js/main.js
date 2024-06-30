const tokenCaptcha = document.querySelector('.token_captcha');
const buttonSubmit = document.querySelector("#btn-form")

function copiarLink() {
    const inputSerial = document.getElementById("inputSerial");
    inputSerial.select();

    try {
        document.execCommand('copy');
        console.log('Texto copiado para a área de transferência.');
      } catch (err) {
        console.error('Erro ao copiar texto para a área de transferência:', err);
      }
    
}

// Captcha
window.onloadTurnstileCallback = function () {
  buttonSubmit.disabled = true
  turnstile.render('#example-container', {
      sitekey: '0x4AAAAAAAW6io-VAOtir98a',
      callback: function(token) {
          tokenCaptcha.value = token;
          buttonSubmit.disabled = false

      },
  });
};