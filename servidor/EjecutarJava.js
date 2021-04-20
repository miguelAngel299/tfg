//var path = require('path');

//function EjecutarJava(fileName){

	//this.lanzar = function(fileName){
	//process.argv.push("cascos.jpg");
	//var path=[];
	//process.on('message', (msg) => {
	  	//console.log('Path from parent:', msg.pathName);
		
		//var fileName = process.argv.slice(2);
		//var stringifiedArray = JSON.stringify(fileName[0]);

		//console.log(fileName[0]);
	  	//var name = msg.pathName;
	  	//path.push({path : msg});
	  	//console.log(path)
	  	//process.send({ path: msg });
	  	//var array=['-jar', '-Xmx512M', '-Dfile.encoding=utf8', './BinaryConverter.jar',"C:\\Users\\digip\\Desktop\\prototipo\\cliente\\img\\"+msg.pathName];
		//array.push("C:\\Users\\digip\\Desktop\\prototipo\\cliente\\img\\"+fileName);
		//array.push("cascos.jpg");
		//var fileName = process.argv.slice(2);
		//console.log(fileName[0]);
		//path.normalize("C:\\Users\\digip\\Desktop\\prototipo\\cliente\\img\\"+fileName);
	  	//process.argv.push(msg.pathName);
		var spawn = require('child_process').spawn;
		prc = spawn('java', ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', './BinaryConverter.jar', "C:\\Users\\digip\\Desktop\\prototipo\\cliente\\img\\cascos.jpg"]);
			
		prc.on('error', (error) => {
		  console.error(`error: ${error.message}`);
		});

		prc.stdout.setEncoding('utf8');
		prc.stdout.on('data', function (data) {
			var str = data.toString()
			var lines = str.split(/(\r?\n)/g);
			console.log(lines.join(""));
		});

		prc.on('close', function (code) {
			console.log('process exit code ' + code);
		});

	//});
	//}	
//}

//module.exports.EjecutarJava=EjecutarJava;