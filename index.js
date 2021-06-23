var fs = require("fs");
const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var formidable = require('formidable');
var path = require('path');

//var { fork } = require('child_process');
//var spawn = require('child_process').spawn;
//var forked = fork('./servidor/servicio.js');
//const { exec } = require('child_process');

var traceSkeleton = require("./servidor/traceSkeleton.js");
var wss = require("./servidor/servidorWS.js");
var servicio = require("./servidor/servicio.js");
var modelo = require("./servidor/modelo.js");
var bodyParser=require("body-parser");

var ges = new modelo.Gestion();
var servidorWS = new wss.ServidorWS();
var service = new servicio.Servicio(servidorWS);

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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

app.get('/obtenerImg', function(request, response){
	var dir = __dirname.split('\\').join('/');
	console.log(dir+"/cliente/img/salidaTemporal.png");
	response.sendFile(dir+"/cliente/img/salidaTemporal.png");
})

app.post('/upload', function (req, res) { 
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) { 
        var dir = "\\cliente\\img\\subidas\\";
        //var servicioJava = new servicio.Servicio();
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
		            var codigo = service.getCodigo();
		           	service.throwJavaProg(pathFile, codigo, name);
		        });    
	   		}	
		}catch(e){
			if(e.code == 'ENOENT'){
				fs.mkdir(__dirname+dir, function (err) { 
			        fs.readFile(files.foto.path, function (err, data) { 
			            // save file from temp dir to new dir
			            var fileName = path.join(__dirname, dir, files.foto.name); 
			             
			            // save file from temp dir to new dir 
			            //var fileName = path.join(__dirname, dir, files.foto.name); 
			            //console.log(fileName);
			            fs.writeFile(fileName, data, function (err) { 
			                if (err) 
			                    throw err; 
			                res.json({success: 'true'}); 
			            });
				            
			            var pathFile = __dirname+dir+files.foto.name;
			            var name = files.foto.name;
			            var codigo = service.getCodigo();
			            service.throwJavaProg(pathFile, codigo, name);
			        }); 
			    });   
			}
		}
    }); 
});

app.post('/uploadFile', function (req, res) { 
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) { 
        var dir = "\\cliente\\img\\subidas\\";
        //var servicioJava = new servicio.Servicio();
        console.log(files);
        //console.log(files.select.path);
        files=files.select;
	   	try{
			if (fs.lstatSync(dir).isDirectory()){
		    	fs.readFile(files.path, function (err, data) { 
		            // save file from temp dir to new dir 
		            var fileName = path.join(__dirname, dir, files.name); 
		            //console.log(fileName); 
		            fs.writeFile(fileName, data, function (err) { 
		                if (err) 
		                    throw err; 
		                res.json({success: 'true'});

		            });
		            var pathFile = __dirname+dir+files.name;
		            var name = files.name;
		            var codigo = service.getCodigo();
		           	service.throwJavaProg(pathFile, codigo, name);
		        });    
	   		}	
		}catch(e){
			if(e.code == 'ENOENT'){
				fs.mkdir(__dirname+dir, function (err) { 
			        fs.readFile(files.path, function (err, data) { 
			            // save file from temp dir to new dir
			            var fileName = path.join(__dirname, dir, files.name); 
			             
			            // save file from temp dir to new dir 
			            //var fileName = path.join(__dirname, dir, files.foto.name); 
			            //console.log(fileName);
			            fs.writeFile(fileName, data, function (err) { 
			                if (err) 
			                    throw err; 
			                res.json({success: 'true'}); 
			            });
				            
			            var pathFile = __dirname+dir+files.name;
			            var name = files.name;
			            var codigo = service.getCodigo();
			            service.throwJavaProg(pathFile, codigo, name);
			        }); 
			    });   
			}
		}
    }); 
});


app.post('/download', function (request, response) {
    var post='';
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });

        request.on('end', function () {
//-------------parsing data from json to string-------------------------
            post = JSON.parse(body);
            var data = post.replace(/^data:image\/\w+;base64,/, "");
            var buf = Buffer.from(data, 'base64');
            var name = "angulo_"+service.getName()+".png";
            var newName = name.replace(/^.*[\\\/]/, '');
            var dir="\\cliente\\img\\angulos\\";
            fs.mkdir(__dirname+dir, function (err) {
	            fs.writeFile(__dirname+dir+newName, buf, function(err) {
	            	console.log("The file was saved!");
	        	});
	        });
        });
    }
});


//PEticiones BDD
app.post('/registrarMedico',function(request,response){
	var nombre=request.body.nombre;
	var apellido=request.body.apellido;
	var email=request.body.email;
	var clave=request.body.clave;
	//Mirar contraseña en cliente
	ges.registrarMedico(nombre,apellido,email,clave,function(data){
		response.send(data);
	});
});

app.post('/registrarPaciente',function(request,response){
	var nombre=request.body.nombre;
	var apellido=request.body.apellido;
	var tlf=request.body.tlf;
	var medico=request.body.medico;
	//Mirar contraseña en cliente
	ges.registrarPaciente(nombre,apellido,tlf,medico,function(data){
		response.send(data);
	});
});

app.post('/registrarAngulo',function(request,response){
	var ang=request.body.ang;
	var paciente=request.body.paciente;
	console.log("REGISTRAR ANGULO-->"+	ang);
	console.log("REGISTRAR PACIENTE-->"+	paciente);
	//Mirar contraseña en cliente
	ges.registrarAngulo(ang,paciente,function(data){
		response.send(data);
	});
});

app.post("/login",function(request,response){
    var email=request.body.email;
    var pass=request.body.password;
    //Mirar contraseña en cliente   
    ges.iniciarSesion(email,pass,function(usr){
        response.send(usr);
    });       
});

app.post("/actualizar",function(request,response){
    var _id=request.body._id;
    ges.actualizar(_id,function(usr){
        response.send(usr);
    });       
});

app.delete("/eliminarPaciente/:uid",function(request,response){
    var uid=request.params.uid;
    console.log("UidEliminarPaciente.Index-->"+uid);
    ges.eliminarPaciente(uid,function(usr){
        response.send(usr);
    });       
});

app.put("/actualizarPaciente",function(request,response){
    ges.actualizarPaciente(request.body,function(result){
            response.send(result);
    });
});

app.delete("/eliminarAngulo/:uid",function(request,response){
    var uid=request.params.uid;
    console.log("UidEliminarAngulo.Index-->"+uid);
    ges.eliminarAngulo(uid,function(usr){
        response.send(usr);
    });       
});

app.get('/obtenerListaPacientes/:uid',function(request,response){
	//Mirar contraseña en client
	console.log("0")
	var medico= request.params.uid;
	//var medico=ges.obtenerUsuario(request.params.uid);
	if(medico){
		//medico = "0";
		ges.obtenerListaPacientes(medico,function(data){
			response.send(data);
		});

	}else{
        response.send({'resultados':[]});
    }
});

app.get('/obtenerListaAngulos/:uid',function(request,response){
	//Mirar contraseña en client
	console.log("0")
	var paciente= request.params.uid;
	//var medico=ges.obtenerUsuario(request.params.uid);
	if(paciente){
		//medico = "0";
		ges.obtenerListaAngulos(paciente,function(data){
			response.send(data);
		});

	}else{
        response.send({'resultados':[]});
    }
});
//PORT SERVER
server.listen(app.get('port'), function () {
    console.log('App is running on port ', app.get('port'));
});


servidorWS.lanzarSocketSrv(io, service);