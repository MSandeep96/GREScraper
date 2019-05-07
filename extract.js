let path = require('path');
let fileName = path.join(__dirname,'offenders.pdf');
let extract = require('pdf-text-extract');
const fs = require('fs');

extract(fileName, function (err, pages) {
  if (err) {
    console.dir(err)
    return
  }
  fs.writeFile("offenders.txt", pages, (err)=>{
    console.log(pages);
    if(err) throw err;
    console.log("Success");
  });
});