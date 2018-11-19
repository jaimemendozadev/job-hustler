'use strict';

module.exports = async (event, context, callback) => {
  try {
    console.log("successfully fired Lambda");
    callback(null, "Success");
  } catch (error) {
    console.log("error firing Lambda ", error);
    callback(error, null);
  }
};