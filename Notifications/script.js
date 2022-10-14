const reservoirNotification = document.querySelector("#low_reservoir");
const outpuTimeRes = document.querySelector("#reservoirTime");

const TOKEN = 'BBFF-XZJulh8fbTcknZ3S4Dc7rQ0aZZZOty';
const TEMP = "6323af1cfb74ce0a8ec2fa79";
const PH = "6348bedd2e48aa046cf2ed7e";
const RESERVOIR = "6323af586d47110b341e11cd";


//Recarregar:
function reload_widget(){
    location.reload()
}

// Fechar notificação:
function closed() {   
 
}


// Pegar quantidade de ração no reservatório:
function getReservoir(variable, callback) {
    const url = 'https://industrial.api.ubidots.com/api/v1.6/variables/' + variable +
    '/values';

    const headers = {
    'X-Auth-Token': TOKEN,
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
    getReservoir(RESERVOIR, function (data) {
    const value = data.results[0].value;
    console.log(value);
    if (value < 2) {
        reservoirNotification.classList.remove("hidden");
        const timestamp = data.results[0].timestamp;
        var date = new Date(timestamp);
        outpuTimeRes.innerHTML = date.getDate() + "/" + (date.getMonth()+1) + " - " +date.getHours() + ":" + date.getMinutes();;
    }
    });