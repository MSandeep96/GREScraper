const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    // path: 'magoosh.csv',
    path: 'offenders.csv',
    header: [
        {id: 'word', title: 'Word'},
        {id: 'def', title: 'Definition'},
        {id: 'pos', title: 'POS'},
        {id: 'ex', title: 'Example'}
    ]
});
 
// let content = fs.readFileSync("magoosh.txt").toString();
let content = fs.readFileSync("offenders.txt").toString();
let words = content.split("\n\r\n");
let records = [];
/*
words.forEach((x)=>{
  let firstBracket = x.indexOf('(');
  let word = x.slice(0, firstBracket);
  let pos = x.slice(firstBracket+1, x.indexOf(')'));
  let definitionWithExample = x.slice(x.indexOf(':') +2);
  let indexOfCapitalLetter = definitionWithExample.search(/[A-Z]/);
  let definition = '"' + definitionWithExample.slice(0, indexOfCapitalLetter-1) + '"';
  definition = definition.replace("\n",'');
  let example = '"' + definitionWithExample.slice(indexOfCapitalLetter) + '"';
  example = example.replace("\n", '');
  records.push({
    word: word,
    def: definition,
    pos: pos,
    ex: example
  });
});
*/

function getExampleValue(example){
  let endIndex = -1;
  endIndex = example.indexOf("Word Forms:");
  if(endIndex === -1){
    endIndex = example.indexOf("Antonym Form:");
  }
  if(endIndex === -1){
    endIndex = example.indexOf("Related Word:");
  }
  if(endIndex === -1){
    return example;
  }else{
    return example.slice(0, endIndex);
  }
}

words.forEach((x)=>{
  let indexOfColon = x.indexOf(':');
  let word = x.slice(0 , indexOfColon);
  let pos = x.slice(indexOfColon + 3, x.indexOf(')'));
  let definitionWithExample = x.slice(x.indexOf(')') + 2);
  let indexOfCapitalLetter = definitionWithExample.search(/[A-Z]/);
  let definition = '"' + definitionWithExample.slice(0, indexOfCapitalLetter-1) + '"';
  definition = definition.replace("\n",'');
  let example = getExampleValue(definitionWithExample.slice(indexOfCapitalLetter));
  example = '"' + example + '"';
  example = example.replace("\n", '');
  records.push({
    word: word,
    def: definition,
    pos: pos,
    ex: example
  });
});

csvWriter.writeRecords(records).then(()=>console.log("We done"));