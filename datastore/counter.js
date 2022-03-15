const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0; // counter.txt 0 === counter;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num); //str num 00000
};

const readCounter = (callback) => { // pass in "error first" function callback
  fs.readFile(exports.counterFile, (err, fileData) => { // can fail when no counter.txt exists
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData)); // fileData from the counter.txt
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => { //counter.txt doesn't exists? makes a counter.txt
    if (err) {
      throw ('error writing counter'); // .writeFile can fail due to async problems, what kind I dunno
    } else {
      callback(null, counterString); // this callback will update the var counter?????
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (specCB) => { //callback specCB(null, str);

  var rh = function (err, num) {
    if (err) {
      throw ('BIG ERROR for reading');
    } else {
      num++;
      writeCounter(num, specCB);
    }
  };

  readCounter(rh);

  // return zeroPaddedNumber(counter); // <--- BROKE EVERYTING counter 000 uniqueid,note,
};

<<<<<<< HEAD
=======
// var rh = function(err, num) {
//   if (num === 0) {

//   } else {

//   }

// };



// readCounter(rh);

// var wh = function(err) {
//   return counterString;
// };

// var rh = function(err, num) {
//   counter = num + 1;
//   if (num === 0) { // num 0
//     writeCounter(num, specCB);
//   } else { // num fileData
//     num++;
//     writeCounter(num, specCB);
//   }
// };



>>>>>>> 59691e16b61321ad4543b3e07bfa2431ffc8b0cc
// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt'); // ./
