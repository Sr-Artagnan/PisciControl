const inputDef = document.querySelector(".input_def");
const saveIcon = document.querySelector("#save_icon");
const editIcon = document.querySelector("#edit_icon");
const divMask = document.querySelector(".div_mask")
const GPDDiv = document.querySelector(".GPD_card")

const FOOD_COST = "6323ad05327d67000e1915f5";
const TOKEN = 'BBFF-XZJulh8fbTcknZ3S4Dc7rQ0aZZZOty';

function closed() {   
    GPDDiv.classList.add("hidden");
    divMask.style.opacity = "100%";
}


function editCost(editIcon) {
    inputDef.removeAttribute("disabled");
    saveIcon.classList.remove("hidden");
    editIcon.classList.add("hidden");
}


// Postar variáveis no Ubidots:

function postData(input, callback) {
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
              variable: FOOD_COST,
              value: input.value,
          }
      ]),
    });
  } 
  
  // Postar variáveis ao clicar 

  function saveCost() {
        postData(inputDef, function (value) {
            console.log('Enviado!');
        });   
        inputDef.setAttribute("disabled", "disabled");
        saveIcon.classList.add("hidden");
        editIcon.classList.remove("hidden");  
  }