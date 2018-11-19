'use strict';

module.exports = (event, context, callback) => {
  try {
    console.log("Successfully fired Lambda!");
    const body = JSON.stringify({error: false, msg: "Successfully fired Lambda!"});
    
    const message = {
      statusCode: 200,
      headers: {},
      body
    }

    callback(null, message);
  } catch (error) {

    const body = JSON.stringify({error: true, msg: "There was an error processing your request"});
    
    const message = {
        statusCode: 200,
        headers: {},
        body
      }
    
    console.log("Error firing Lambda ", error);
    callback(error, message);
  }
};