const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId(function(err, strID ) { //calls the counter.js from require('./counter');
    // items[strID] = text;

    fs.writeFile(`${exports.dataDir}/${strID}.txt`, text, (err) => { // (exports.counterFile
      if (err) {
        throw (err);
      } else {
        // console.log(items);
        callback(null, {text: text, id: strID}); // addTodo() comes from the client.js
      }
    });

  });
};



// it('should only save todo text contents in file', (done) => {
//   const todoText = 'walk the dog';
//   todos.create(todoText, (err, todo) => {

//     const todoFileContents = fs.readFileSync(path.join(todos.dataDir, `${todo.id}.txt`)).toString();
//     expect(todoFileContents).to.equal(todoText);
//     done();
//   });

// });

exports.readAll = (callback) => { // [{text:, id:}, {}, {}] ['0001.txt', '0002'.txt, '0003.txt']

  fs.readdir(`${exports.dataDir}`, (err, files) => { // fs.readDir
    if (err) {
      throw (err);
    } else {
      callback (null, files);
    }
  });

};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {

  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
