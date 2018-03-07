var express = require("express"),
    app     = express(),
    fs      = require('fs'),
    parse   = require('csv-parse');
 
var inputFile='test.csv';
var outputFile = 'test.json';
console.log("Processing Data file");
 
var parser = parse({delimiter: '||', constructResult:true}, function (err, data) {
    if(err) throw err;
    
    // when the lists are available,then process them
    // note: array element at index 0 contains the row of headers that we should skip
    // data.forEach(function(line) {
        // create list object out of parsed fields
        // var list = { "name" : line[0] + ' ' + line[1]
        //             , "phone" : line[5].replace(/\D/g,'')
        //             , "person" : {
        //                             "firstName": {"type": ''}, 
        //                             "lastName": {"type": ''} 
        //                             } 
        //             , "amount" : line[7]
        //             , "date" : line[8].split('/').reverse().join('/')
        //             , "cc" : line[6].substr(3)
        //             };
        // console.log(JSON.stringify(list));
    // });   
    console.log('**************');
    for (var i = 1; i < data.length; i++) { 
        var arr = data[i];
        var list = { "name" : arr[0]
                    , "phone" : arr[5].replace(/\D/g,'')
                    , "person" : {
                                    "firstName": {"type": '-'}, 
                                    "lastName": {"type": '-'} 
                                    } 
                    , "amount" : arr[7]
                    , "data" : arr[8].split('/').reverse().join('/')
                    , "cc" : arr[6].substr(3)
        };
        console.log(JSON.stringify(list));
    }
    // save the list to a file
    // fs.appendFile('test.json', JSON.stringify(list), 'utf-8', function(err) {
	   // if (err) throw err
	   // console.log('Done!');
    // });
});
// .on('done',(jsonObj) => {
//     console.log('end');
//     console.log(jsonObj);
// });
 
// read the inputFile, feed the contents to the parser
fs.createReadStream(inputFile).pipe(parser);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The server is running');
});