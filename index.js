var fs = require("fs");
const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var formidable = require('formidable');
var path = require('path');

//var { fork } = require('child_process');
//var spawn = require('child_process').spawn;
//const { exec } = require('child_process');

var traceSkeleton = require("./servidor/traceSkeleton.js");
var wss = require("./servidor/servidorWS.js");
var servicio = require("./servidor/servicio.js");

var servidorWS = new wss.ServidorWS();

app.set('port', process.env.PORT || 5000);

//app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname)); 
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type"); 
    res.header("Access-Control-Allow-Credentials", true); 
    next(); 
});

//var trace = new traceSkeleton.TraceSkeleton();

app.get('/', function (request, response) {
    var contenido = fs.readFileSync(__dirname + "/cliente/index.html"); 
    
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.post('/upload', function (req, res) { 
    var form = new formidable.IncomingForm(); 
    form.parse(req, function (err, fields, files) { 
        var dir = "\\cliente\\img\\subidas\\";
        var servicioJava = new servicio.Servicio();
        console.log(files);
	   	try{
			if (fs.lstatSync(dir).isDirectory()){
		    	fs.readFile(files.foto.path, function (err, data) { 
		            // save file from temp dir to new dir 
		            var fileName = path.join(__dirname, dir, files.foto.name); 
		            //console.log(fileName); 
		            fs.writeFile(fileName, data, function (err) { 
		                if (err) 
		                    throw err; 
		                res.json({success: 'true'});

		            });

		            var pathFile = __dirname+dir+files.foto.name;
		            var name = files.foto.name;
		            var codigo = servicioJava.getCodigo();
		            servicioJava.throwJavaProg(pathFile, codigo, name);
		        });    
	   		}	
		}catch(e){
			if(e.code == 'ENOENT'){
				fs.mkdir(__dirname+dir, function (err) { 
			        fs.readFile(files.foto.path, function (err, data) { 
			            // save file from temp dir to new dir 
			            var fileName = path.join(__dirname, dir, files.foto.name); 
			            //console.log(fileName); 
			            fs.writeFile(fileName, data, function (err) { 
			                if (err) 
			                    throw err; 
			                res.json({success: 'true'}); 
			            });
				            
			            var pathFile = __dirname+dir+files.foto.name;
			            var name = files.foto.name;
			            var codigo = servicioJava.getCodigo();
			            servicioJava.throwJavaProg(pathFile, codigo, name);
			        }); 
			    });   
			}
		}
    }); 
});

server.listen(app.get('port'), function () {
    console.log('App is running on port ', app.get('port'));
});


servidorWS.lanzarSocketSrv(io);