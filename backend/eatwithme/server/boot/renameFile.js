const crypto = require('crypto');

module.exports = function(app) {

  //Function for checking the file type..
  app.dataSources.storage.connector.getFilename = function(file, req, res) {
     //Return the new FileName
     var fileExtension = file.name.split('.').pop();

     return crypto.createHash('md5').update(file.name + new Date().toISOString()).digest('hex') + '.' + fileExtension;
 }
}
