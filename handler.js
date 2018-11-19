'use strict';
const rp = require('request-promise');


module.exports.hello = async (event, context, callback) => {
  try {
   const result = await rp('https://www.metaweather.com/api/location/search/?query=london');

   console.log('the result from rp is ', result);

    callback(null, "Success");
  } catch (error) {
    callback(error, null);
  }
};
