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