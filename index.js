const express = require('express');
const app = express();

app.use(express.static(__dirname + '/p5/'));

app.listen('3000', function() {
  console.log('Servidor web escuchando en el puerto 3000');
});
/*
var spawn = require('child_process').spawn;
var prc = spawn('java',  ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', 'programaJava/binaryConverter.jar']);

//noinspection JSUnresolvedFunction
prc.stdout.setEncoding('utf8');
prc.stdout.on('data', function (data) {
    var str = data.toString()
    var lines = str.split(/(\r?\n)/g);
    console.log(lines.join(""));
});

prc.on('close', function (code) {
    console.log('process exit code ' + code);
});
*/