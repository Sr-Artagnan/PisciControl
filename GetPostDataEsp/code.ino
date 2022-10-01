#include "Ubidots.h";
#include <WiFiManager.h>;

int startFeed;
int LDR_value;
int foodProvided;

const char* UBIDOTS_TOKEN = "BBFF-XZJulh8fbTcknZ3S4Dc7rQ0aZZZOty";  // Put here your Ubidots TOKEN
//const char* WIFI_SSID = "DAVID - 2.4G";      
//const char* WIFI_PASS = "davidartagnan619";      
const char* PISCICONTROL_LABEL = "0cb815d664d8"; 
const char* DATABASE_LABEL = "dataBase";
const char* LDR = "ldr";
const char* AMOUNT_FOOD_PROVIDED = "amount-food-provided";
const char* START_FEED = "start-feed";

Ubidots ubidots(UBIDOTS_TOKEN, UBI_HTTP);

void setup() {
    WiFi.mode(WIFI_STA);
  Serial.begin(115200);
  //ubidots.wifiConnect(WIFI_SSID, WIFI_PASS);
  WiFiManager wm;
  wm.resetSettings();

bool res;
res = wm.autoConnect("ESP32","randradeiros2022"); 
  
     if(!res) {
        Serial.println("Failed to connect");
        // ESP.restart();
    } 
    else {
        //if you get here you have connected to the WiFi    
        Serial.println("connected...yeey :)");
    }


  pinMode(32, INPUT);
  pinMode(26, OUTPUT);
  LDR_value=0;
}

void loop() {
  LDR_value = analogRead(32);

  // Obtains last value values using.
  startFeed = ubidots.get(PISCICONTROL_LABEL, START_FEED);  
  foodProvided = ubidots.get(DATABASE_LABEL, AMOUNT_FOOD_PROVIDED);  

  // Evaluates the results obtained
  if(startFeed!=ERROR_VALUE){
    Serial.print("startFeed:");
    Serial.println(startFeed);
  }  
  else {
    Serial.println("ERRO com o startFeed");
  }

  if(startFeed == 1){
    // em 3segundos, são liberados 2 KG de ração
    int time = (foodProvided * 3 / 2 * 1000) - 1000;
    Serial.println("variável time: ");
    Serial.print(time);
    digitalWrite(26, HIGH);
    delay(time);
    ubidots.add(START_FEED, 0);
    }
  
    ubidots.add("ldr", LDR_value);  

  bool bufferSent = false;
  bufferSent = ubidots.send();

  if (bufferSent) {
    Serial.println("Values sent by the device");
  }

    if(startFeed == 0){
    digitalWrite(26, LOW);
  }


  delay(1000);
}
