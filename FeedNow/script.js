//// Postar variável:
console.log("ua");

const amountFoodInput = $("#amount-food");
const sendButton = $("#submit");
const outputTime = document.querySelector('#output-timestamp');
const outputReservoir = document.querySelector("#output-reservoir")


const TOKEN = 'BBFF-XZJulh8fbTcknZ3S4Dc7rQ0aZZZOty';
const AMOUNT_FOOD_PROVIDED = "6323b1edfb74ce0a8ec2fa7d";
const START_FEED = "632b9fc7e56cf624b30910b0";
const FOOD_RESERVOIR = "6323af586d47110b341e11cd";

//const START_FEED = "6323b1f66d471105ef887b11";

// Postar variáveis no Ubidots:

function postData(token, food, callback) {
    const url = 'https://industrial.ubidots.com/api/v1.6/collections/values';
    
    const headers = {
      'Content-Type': 'application/json',
      'X-Auth-Token': TOKEN
    };
  
    $.ajax({
      url: url,
      method: 'POST',
      headers: headers,
      success: function (res) {
          callback(res.value);
        },
      data: JSON.stringify([
          {
              variable: AMOUNT_FOOD_PROVIDED,
              value: food.val(),
          },
          {
              variable: START_FEED,
              value: 1,
          },
      ]),
    });
  }
  
  // Postar variáveis ao clicar em "Salvar"
  sendButton.on('click', function () {
      postData(TOKEN, amountFoodInput, function (value) {
          console.log('Enviado!');
      });
      document.querySelector(".notification").classList.remove("hidden");
      const count = document.querySelector("#count");      

  });


  // Pegar variáveis do Ubidots:

  function getDate(token, variable, callback) {
    const url = 'https://industrial.api.ubidots.com/api/v1.6/variables/' + variable + '/values';

    const headers = {
        'X-Auth-Token': token,
        'Content-Type': 'application/json'
    };

    $.ajax({
        url: url,
        method: 'GET',
        headers: headers,
        success: function (res) {
            callback(res);
        }
    });
}
    getDate(TOKEN, AMOUNT_FOOD_PROVIDED, function (data) {
        const timestamp = data.results[0].timestamp;
        var date = new Date(timestamp);
        outputTime.innerHTML = date.getDate() + "/" + (date.getMonth()+1) + " - " +date.getHours() + ":" + date.getMinutes();;
        });


  // Pegar variáveis do Ubidots:

        function getFoodInReservoir(token, variable, callback) {
            const url = 'https://industrial.api.ubidots.com/api/v1.6/variables/' + variable + '/values';
        
            const headers = {
                'X-Auth-Token': token,
                'Content-Type': 'application/json'
            };
        
            $.ajax({
                url: url,
                method: 'GET',
                headers: headers,
                success: function (res) {
                    callback(res);
                }
            });
        }
            getFoodInReservoir(TOKEN, FOOD_RESERVOIR, function (data) {
                const value = data.results[0].value;
                outputReservoir.innerHTML = value;
                });
        
        //
