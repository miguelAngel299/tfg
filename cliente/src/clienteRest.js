function ClienteRest(){
	var clir = this;
	var uid = undefined;
	var ang = undefined;
	var email = undefined;
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

	this.registroMedico=function(nombre, apellido, email, clave){
      $.ajax({
        type:'POST',
        url:'/registrarMedico',
        data:JSON.stringify({nombre:nombre,apellido:apellido,email:email,clave:clave}),
        success:function(data){
          if (data._id==undefined){
            cw.mostrarModal("Advertencia!","No se ha podido registrar", "#F6FF81");
          }
          else{
          	//modal 
          	cw.mostrarModal("Bienvenido!!", "Se ha registrado con éxito", "#39DF1E");
          	$.cookie("usr",JSON.stringify(data));
          	//Lo mando a login
          	var uid = clir.obtenerUid();
          	$.getJSON("/obtenerListaPacientes/"+uid,function(data){           
	        	//cw.logeado=true;cw.toLogOut=true;
	        	cw.mostrarLogin();
	    	});               
             //mostrarAviso("Te hemos enviado un email para confirmar tu cuenta");
          }
          },
        contentType:'application/json',
        dataType:'json'
      });
  	}

  	this.eliminarCookies= function(){
	  $.removeCookie("usr");
	  window.localStorage.clear();
	}

  	this.registroPaciente=function(nombre, apellido, tlf){
      $.ajax({
        type:'POST',
        url:'/registrarPaciente',
        data:JSON.stringify({nombre:nombre,apellido:apellido,tlf:tlf,medico:clir.obtenerUid()}),
        success:function(data){
          if (data._id==undefined){
            cw.mostrarModal("Advertencia!","No se ha podido registrar", "#F6FF81");
            cw.mostrarRegistroPaciente();
          }
          else{
          	//modal 
          	cw.mostrarModal("Registro realizado!!", "Se ha registrado con éxito", "#39DF1E");
          	$.cookie("usr",JSON.stringify(data));
          	var uid = clir.obtenerUid();
          	$.getJSON("/obtenerListaPacientes/"+uid,function(data){           
	        	cw.mostrarMenuP(data);
	    	});
             //mostrarAviso("Te hemos enviado un email para confirmar tu cuenta");
          }
          },
        contentType:'application/json',
        dataType:'json'
      });
  	}

  	this.registroAngulo=function(ang){
  		console.log("REST-->"+clir.obtenerUidPaciente());
      $.ajax({
        type:'POST',
        url:'/registrarAngulo',
        data:JSON.stringify({ang:ang,paciente:clir.obtenerUidPaciente()}),
        success:function(data){
          if (data._id==undefined){
            cw.mostrarModal("Advertencia!","No se ha podido registrar", "#F6FF81");
          }
          else{
          	//modal 
          	cw.mostrarModal("Registro realizado!!", "Se ha registrado con éxito", "#39DF1E");
          	$.cookie("usr",JSON.stringify(data));
          	var uid = clir.obtenerUidPaciente();
          	$.getJSON("/obtenerListaAngulos/"+uid,function(data){           
	        	cw.menuAngulo(data);
	    	});
             //mostrarAviso("Te hemos enviado un email para confirmar tu cuenta");
          }
          },
        contentType:'application/json',
        dataType:'json'
      });
  	}

  	this.guardarUid = function (){
	  		if ($.cookie("usr")!=undefined){
	    		var usr=JSON.parse($.cookie("usr"));
		  		if(usr._id && (!this.uid || this.uid!=usr._id)){
			    		this.uid=usr._id;
			    		this.email=usr.email;
			  		}
			  	}
	  	return this.uid;	
  	}

  	this.obtenerUid = function(){
  		return this.uid;
  	}

  	this.obtenerUidPaciente = function (){
		//this.eliminarCookies();
  		if ($.cookie("usr")!=undefined){
    		var usr=JSON.parse($.cookie("usr"));
    		return usr._id;
  		}
	  	return undefined;	
  	}
  	this.obtenerPaciente = function (){
  		if ($.cookie("usr")!=undefined){
	    		var usr=JSON.parse($.cookie("usr"));
  				return "Paciente:" +  usr.nombre + " "+ usr.apellido;
	    	}
	    return "";
  	}
  	this.obtenerMedico = function (){
	  	return "Doctor: "+this.email;	
  	}

	this.obtenerListaPacientes=function(){
      var uid;
	  	if ($.cookie("usr")!=undefined){
	    	var usr=JSON.parse($.cookie("usr"));
	    	uid=usr._id;
	  	}
	  	if (uid!=undefined){
	  		//$.cookie("usr",JSON.stringify(data));
	  		var uid = clir.obtenerUid();
	    	$.getJSON("/obtenerListaPacientes/"+uid,function(data){           
	        	cw.mostrarMenuP(data);
	    	});
	  	}else
	    	cw.mostrarModal("Advertencia!","Debes iniciar sesión","yellow");
  	}

  	this.cookieUpdate=function(id){
  		this.eliminarCookies();
  		//id.id
  		$.ajax({
	    type:'POST',
	    url:'/actualizar',
	    data:JSON.stringify({_id:id}),
	    success:function(data){
	      if (data.email==""){
	        //mostrarLogin();
	        console.log("Paciente no existe")
	      }
	      else{
	        console.log('estamos en el paciente');
	        $.cookie("usr",JSON.stringify(data));
	        //cw.mostrarMenuP();
	        var uid = clir.obtenerUidPaciente();
	        console.log("ID COOKIE-->"+uid);
	        $.getJSON("/obtenerListaAngulos/"+uid,function(data){           
	        	cw.menuAngulo(data);
	    	});
	       }
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
  	}

  	this.close=function(){
  		$('#modalGeneral').modal('hide');
  		$('#modalGeneral').remove();
  	}

  	this.confirmar=function(id, tipo){
  		cw.dialogoConfirmacion("¿Esta seguro?","Asegurese de que desea eliminar el ese registro", id, tipo);
  	}

  	this.confirmLO=function(){
  		cw.dialogoLogOut("¿Esta seguro?","Asegurese de que desea cerrar sesión", "logout");
  	}

  	this.confirmarActu=function(id,nombre,apellido,tlf,tipo){
  		cw.dialogoActu("¿Esta seguro?","Asegurese de que desea actualizar el paciente", id, nombre, apellido,tlf,tipo);	
  	}

  	this.mostrarLO=function(){
  		cw.mostrarLogin();	
  	}

  	this.eliminarPaciente=function(id){
	  //var usr=JSON.parse($.cookie("usr"));
	  	$('#modalGeneral').modal('hide');
  		$('#modalGeneral').remove();
	  $.ajax({
	    type:'DELETE',
	    url:'/eliminarPaciente/'+id,//$.cookie("uid"),
	    data:'{}',
	    success:function(data){
	      if (data.resultados==1)
	      {
	      		cw.mostrarModal("Paciente Eliminado!!", "Se ha eliminado el paciente", "#39DF1E");
	        	var uid = clir.obtenerUid();
		    	$.getJSON("/obtenerListaPacientes/"+uid,function(data){           
		        	cw.mostrarMenuP(data);
		    	});
	  	  }else
		    	cw.mostrarModal("Advertencia!","Debes iniciar sesión","yellow");
		      
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}

	this.eliminarAngulo=function(id){
	  //var usr=JSON.parse($.cookie("usr"));
	  	$('#modalGeneral').modal('hide');
  		$('#modalGeneral').remove();
  		console.log("ELIMINARANGULO--->"+id);
	  $.ajax({
	    type:'DELETE',
	    url:'/eliminarAngulo/'+id,//$.cookie("uid"),
	    data:'{}',
	    success:function(data){
	      if (data.resultados==1)
	      {
	      		cw.mostrarModal("Angulo Eliminado!!", "Se ha eliminado el paciente", "#39DF1E");
	        	var uid = clir.obtenerUidPaciente();
		    	$.getJSON("/obtenerListaAngulos/"+uid,function(data){           
		        	cw.menuAngulo(data);
		    	});
	  	  }else
		    	cw.mostrarModal("Advertencia!","Debes iniciar sesión","yellow");
		      
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}

  	this.mostrarAngulos=function(){
  		var uid;
	  	if ($.cookie("usr")!=undefined){
	    	var usr=JSON.parse($.cookie("usr"));
	    	uid=usr._id;
	  	}
	  	if (uid!=undefined){
	  		//$.cookie("usr",JSON.stringify(data));
	  		//var uid = clir.obtenerUidPaciente();
	    	$.getJSON("/obtenerListaAngulos/"+uid,function(data){           
	        	cw.menuAngulo(data);
	    	});
	  	}else
	    	cw.mostrarModal("Advertencia!","Debes iniciar sesión","yellow");
  	}  	  	

	this.loginUsuario=function(nombre,clave){
	  $.ajax({
	    type:'POST',
	    url:'/login',
	    data:JSON.stringify({email:nombre,password:clave}),
	    success:function(data){
	      if (data.email==""){
	        //mostrarLogin();
	        cw.mostrarModal("Advertencia!", "Usuario o contraseña incorrecta", "yellow");
	        console.log("Medico no existe")
	      }
	      else{
	        console.log('el usuario ha iniciado la sesión');
	        $.cookie("usr",JSON.stringify(data));
	        //cw.mostrarMenuP();
	        console.log(data);
	        clir.guardarUid();
	        var uid = clir.obtenerUid();
	        $.getJSON("/obtenerListaPacientes/"+uid,function(data){           
	        	cw.mostrarMenuP(data);

	        	cw.logeado=true;
	    	});
	       }
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}

	this.actualizarPaciente=function(id,nombre,apellido,tlf){
	 	$.ajax({
	    	type:'PUT',
	    	url:'/actualizarPaciente',
	    	data:JSON.stringify({_id:id,nombre:nombre,apellido:apellido,tlf:tlf}),
	    	success:function(data){
	      		if (data._id==undefined){
	        		cw.mostrarMenuActualizar(data);
	      		}
	      		else{
	      			//cw.comprobarBackdrop();
	      			cw.mostrarModal("Paciente Actualizado!!", "Se ha actualizado el paciente", "#39DF1E");
	        		var uid = clir.obtenerUid();
			    	$.getJSON("/obtenerListaPacientes/"+uid,function(data){           
			        	cw.mostrarMenuP(data);
			    	});
	      		}
      		},
	    	contentType:'application/json',
	    	dataType:'json'
	  	});
	}

	this.visualizarAngulo=function(ang){
		cw.ponerResultado(ang+"º");
		this.ang=ang;
	}
}
