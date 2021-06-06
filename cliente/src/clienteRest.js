function ClienteRest(){
	this.subirImg=function(formData){
		$.ajax({
          type: 'POST',
          url: '/upload',
          data: formData,
          success: function (data) {
            console.log(data);
          },
          contentType: false,
          processData:false
        });
	}

	this.subirArchivo=function(formData){
		$.ajax({
          type: 'POST',
          url: '/uploadFile',
          data: formData,
          success: function (data) {
            console.log(data);
          },
          contentType: false,
          processData:false
        });
	}

	this.obtenerImg=function(){
		$.getJSON("/obtenerImg",function(){    
			//console.log(data);
			//var img = data;
			//mostrar();
		});
	}
}