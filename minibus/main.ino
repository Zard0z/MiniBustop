#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <SPI.h>
#include "LedMatrix.h"
#include <WiFiClient.h> 
#include <ESP8266WebServer.h>
#include <EEPROM.h>

#define NUMBER_OF_DEVICES 4
#define CS_PIN D4
LedMatrix ledMatrix = LedMatrix(NUMBER_OF_DEVICES, CS_PIN);

// WiFi Parameters
const char* ssid = "Freebox-A7D2A2";
const char* password = "akbkhbhjexi";
int i = 0;
int j = 0;

const char *ssidAP = "MiniBus";

//Bus station params
String code = "";
String station = "";

ESP8266WebServer server(80);

//Server handlers

void handleRoot(){
  server.send(200, "text/plain", "Current station : " + code + " - " + station);
}

void setParams() { //Handler
  String message = "";
  
  if (!server.hasArg("code") || !server.hasArg("station")){     //Parameter not found
  
    message = "missing_params";
  
  }else{     //Parameter found

    writeToMemory(String(server.arg("code")), String(server.arg("station")));
    message = "ok";
    readParams();
  
  }
  
  server.send(200, "text/plain", message);          //Returns the HTTP response
}

void setup() {
  delay(1000);
  Serial.begin(115200);

  
  EEPROM.begin(512);

  //reading params from memory
  readParams();
  
  
  Serial.println();
  Serial.print("Configuring access point...");
  WiFi.softAP(ssidAP);

  IPAddress myIP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(myIP);
  server.on("/", handleRoot);
  server.on("/params", setParams);
  server.begin();
  Serial.println("HTTP server started");

  ledMatrix.init();
  ledMatrix.setRotation(true);
  ledMatrix.setIntensity(10); // range is 0-15
  ledMatrix.setText("Waiting...");
 
  WiFi.begin(ssid, password);
  
  //while (WiFi.status() != WL_CONNECTED) {
  //  delay(1000);
  //  Serial.println("Waiting for connection...");
  //}
}

void loop() {
  server.handleClient();
  
  if(i++ == 120000 / 20){
    i = 0;
    ledMatrix.clear();
    ledMatrix.scrollTextLeft();
    ledMatrix.drawText();
    ledMatrix.commit(); // commit transfers the byte buffer to the displays
  }
  if(j++ == 140000 * 10){
    j = 0;
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;  //Object of class HTTPClient
      Serial.println("GET http://144.217.92.92/app.php/schedules/bus/" + code + "/" + station + "/A");
      http.begin("http://144.217.92.92/app.php/schedules/bus/" + code + "/" + station + "/A");
      int httpCode = http.GET();
      //Check the returning code                                                                  
      if (httpCode > 0) {
        // Get the request response payload
        const size_t bufferSize = JSON_ARRAY_SIZE(2) + JSON_OBJECT_SIZE(1) + 3*JSON_OBJECT_SIZE(2) + JSON_OBJECT_SIZE(3) + 240;
        DynamicJsonBuffer jsonBuffer(bufferSize);
        JsonObject& root = jsonBuffer.parseObject(http.getString());
  
        String display = "";
  
        String m1 = root["result"]["schedules"][0]["message"]; 
        String m2 = root["result"]["schedules"][1]["message"]; 

        display += m1.substring(0, m1.indexOf(" "));
        display += " ";
        display += m2.substring(0, m2.indexOf(" "));
        display += " ";
        display += code + ":" + station;
        
        ledMatrix.setText(display);
        Serial.println(display);
        
        //const char* result_schedules1_message = root["result"]["schedules"][1]["message"]; // "11 mn"
  
      }
      http.end();   //Close connection
    }else{
      Serial.println("Not connected to WiFi yet.");
    }
  }
  
}


//Memory managment

void readParams(){
  code= readString(30,0); 
  station= readString(30,100);
  Serial.println("Code : " + code + " - " + "Station : " + station);
}

//Reads a string out of memory
String readString(int l, int p){
  String temp;
  for (int n = p; n < l+p; ++n)
    {
     if(char(EEPROM.read(n))!=';'){
      if(isWhitespace(char(EEPROM.read(n)))){
          //do nothing
        }else temp += String(char(EEPROM.read(n)));
      
     }else n=l+p;
     
    }
  return temp;
}

void writeToMemory(String c,String s){
 c+=";";
 writeEEPROM(c,0);
 s+=";";
 writeEEPROM(s,100);
 EEPROM.commit();
}
//write to memory
void writeEEPROM(String x,int pos){
  for(int n=pos;n<x.length()+pos;n++){
     EEPROM.write(n,x[n-pos]);
  }
}