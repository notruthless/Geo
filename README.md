Geo
===

Simple library to use geoNames to find nearby cities

Based on sample code from Geonames.org, and including JSONScriptRequest functions
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
   
   
NOTE: Written in 2012, just uploading for GitHub completeness
