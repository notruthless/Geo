/*
   Ruth Helfinstein 12/2012
   
   Simple library for access to geonames API 
   Based on sample code from Geonames, and including JSONScriptRequest functions
   from those examples.
   
   Functions:
      getNearbyCitiesByPostalCode(postalcode, radius, callbackFN)
      getNearbyCitiesByLatLong(latitude,longitude, radius, callbackFN)

   The callback function gets a list of city names as its only parameter as in 
   "function myCallback(cities)".
   postalcode is a valid US postal code
   radius is a number between 1 and 30, in kilometers
      getNearbyCities byPostalCode("94086", "10", myCallback);
   
   Calls back the callback function with an array of cities within that radius.
   
   
   ***If you're going to use this code, replace my geonames id with your own please***

*/

var userCallback; // to remember where to call back the user 


// this function will be called by our JSON callback
// the parameter jData will contain an array with postalcode objects
// NOTE: There is a lot more detail in jData, including zip codes, lat lon, etc
// but for simplicity we don't pass them on.  Might be helpful to figure out a way to 
// do so.

function cityListCallback(jData) {
    if (jData == null) {
        // There was a problem parsing search results
        return;
    } 
    
   
     var postalcodes = jData.postalCodes;
  //    var postalcodes = jData["postalCodes"]; // can access either way

      
      var cities = [];
      
   if (postalcodes != undefined) {
      var i;
      for (i = 0; i < postalcodes.length; i++) {
         var city = postalcodes[i].placeName;
         if (cities.indexOf(city) == -1)
         cities.push(city); 
      }
   }
    userCallback(cities);

}


 function sendRequest(request) {
    aObj = new JSONscriptRequest(request);
    // Build the script tag
    aObj.buildScriptTag();
    // Execute (add) the script tag
    aObj.addScriptTag();
    aObj.removeScriptTag();
 }


function getNearbyCitiesByPostalCode(postalcode, radius, callbackFN) {
   userCallback = callbackFN; // function to call with a list of city names 
    
   var request = 'http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=' + postalcode 
               + '&country=US'  + '&maxRows=20&radius=' + radius + '&username=your_user_name' 
               +  '&callback=cityListCallback' ;
   sendRequest(request);
}


function getNearbyCitiesByLatLon(latitude, longitude, radius, callbackFN) {
// http://api.geonames.org/findNearbyPostalCodes?lat=37.3861&lng=-122.0828&username=notruthless
   userCallback = callbackFN; // function to call with a list of city names 

   var  request = 'http://api.geonames.org/findNearbyPostalCodesJSON?lat=' + latitude + '&lng=' + longitude  
                  + '&maxRows=20&radius=' + radius + '&username=notruthless' +  '&callback=cityListCallback' ;
 //  var request = 'http://api.geonames.org/findNearbyPostalCodesJSON?lat=37.3861&lng=-122.0828&username=notruthless&callback=anothercallback'
   sendRequest(request);
}

//////////////
// I am including this within my library to not have a separate file to include.

// JSONscriptRequest -- a simple class for accessing Yahoo! Web Services
// using dynamically generated script tags and JSON
//
// Author: Jason Levitt
// Date: December 7th, 2005
//
// A SECURITY WARNING FROM DOUGLAS CROCKFORD:
// "The dynamic <script> tag hack suffers from a problem. It allows a page 
// to access data from any server in the web, which is really useful. 
// Unfortunately, the data is returned in the form of a script. That script 
// can deliver the data, but it runs with the same authority as scripts on 
// the base page, so it is able to steal cookies or misuse the authorization 
// of the user with the server. A rogue script can do destructive things to 
// the relationship between the user and the base server."
//
// So, be extremely cautious in your use of this script.
//

// Constructor -- pass a REST request URL to the constructor
//
function JSONscriptRequest(fullUrl) {
    // REST request path
    this.fullUrl = fullUrl; 
    // Keep IE from caching requests
    this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
    // Get the DOM location to put the script tag
    this.headLoc = document.getElementsByTagName("head").item(0);
    // Generate a unique script tag id
    this.scriptId = 'YJscriptId' + JSONscriptRequest.scriptCounter++;
}

// Static script ID counter
JSONscriptRequest.scriptCounter = 1;

// buildScriptTag method
//
JSONscriptRequest.prototype.buildScriptTag = function () {

    // Create the script tag
    this.scriptObj = document.createElement("script");
    
    // Add script object attributes
    this.scriptObj.setAttribute("type", "text/javascript");
//    this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE);
    this.scriptObj.setAttribute("src", this.fullUrl);
    this.scriptObj.setAttribute("id", this.scriptId);
}
 
// removeScriptTag method
// 
JSONscriptRequest.prototype.removeScriptTag = function () {
    // Destroy the script tag
    this.headLoc.removeChild(this.scriptObj);  
}

// addScriptTag method
//
JSONscriptRequest.prototype.addScriptTag = function () {
    // Create the script tag
    this.headLoc.appendChild(this.scriptObj);
}
