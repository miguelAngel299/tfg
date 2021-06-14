var _ = require("underscore");
var cad = require("./persistance.js");
var cf=require("./cifrado.js");

function Gestion() {
	this.cad = new cad.Cad();
	this.medicos = [];
	this.pacientes = [];

	this.registrarMedico=function(nombre, apellido, email,clave,callback){
		var ges=this;
		var claveCifrada=cf.encrypt(clave);
		var key=(new Date().valueOf()).toString();
		//this.dao.conectar();
		this.cad.obtenerMedicoCriterio({email:email},function(usr){
			if(!usr){
				ges.cad.insertarMedico({nombre:nombre,apellido:apellido,email:email,clave:claveCifrada},function(usu){
					//moduloEmail.enviarEmail(email,key,"Haz click aqui para confirmar la cuenta");
					//ju.dao.cerrar();
					callback({_id:usu._id});
				});
			}
			else{
				callback({_id:undefined});
			}
		});
	}

	this.iniciarSesion=function(email,clave,callback){
        var ges=this;
        var claveCifrada=cf.encrypt(clave);
        console.log(email+' '+claveCifrada);
        this.cad.obtenerMedicoCriterio({email:email,clave:claveCifrada},function(usr){
            if (!usr){
                callback({'email':''});
            }
            else{
            	console.log(usr);
                ges.medicos[usr._id]=usr;               
                callback(usr);
            }
        });
    }

    this.actualizar=function(id,callback){
        var ges=this;
        console.log(">"+id);
        this.cad.obtenerPacienteCriterio(this.cad.objectID(id),function(usr){
            if (!usr){
                callback({'email':''});
            }
            else{
                ges.pacientes[usr._id]=usr;               
                callback(usr);
            }
        });
    }


    this.registrarPaciente=function(nombre, apellido, tlf,medico,callback){
		var ges=this;
		//var key=(new Date().valueOf()).toString();
		//this.dao.conectar();
		this.cad.obtenerPacienteCriterio({tlf:tlf},function(usr){
			if(!usr){
				ges.cad.insertarPaciente({"nombre":nombre,"apellido":apellido,"tlf":tlf,"medico":medico},function(usu){
					//moduloEmail.enviarEmail(email,key,"Haz click aqui para confirmar la cuenta");
					//ju.dao.cerrar();
					callback({_id:medico});
				});
			}
			else{
				callback({_id:undefined});
			}
		});
	}

	this.registrarAngulo=function(ang,paciente,callback){
		var ges=this;
		//var key=(new Date().valueOf()).toString();
		//this.dao.conectar();
		var hoy = Date.now();
		var fecha = new Date(hoy);

		
				ges.cad.insertarAngulo({"ang":ang,"fecha":fecha.toLocaleDateString(),"paciente":paciente},function(usu){
					//moduloEmail.enviarEmail(email,key,"Haz click aqui para confirmar la cuenta");
					//ju.dao.cerrar();
					callback({_id:paciente});
				});
	}

	this.obtenerListaPacientesMedico=function(medico,callback){
		this.cad.obtenerPacientesMedico(medico,function(result){
			callback(result);
		});
		
	}

	this.obtenerListaPacientes=function(medico,callback){
		console.log("MedicoFuera-->"+medico)
		this.cad.obtenerPacientes(function(result){
			console.log("MedicoDentro-->"+medico)
			var retorno = [];
			for(pat in result){
				console.log(result[pat].medico)
				if(medico == result[pat].medico){
					retorno.push(result[pat]);
				}
			}
			callback({retorno})
			//callback(retorno);
		});	
	}

	this.obtenerListaAngulos=function(paciente,callback){
		console.log("PacienteFuera-->"+paciente)
		this.cad.obtenerAngulos(function(result){
			console.log("PacienteDentro-->"+paciente)
			var retorno = [];
			for(pat in result){
				console.log(result[pat].paciente)
				if(paciente == result[pat].paciente){
					retorno.push(result[pat]);
				}
			}
			callback({retorno})
			//callback(retorno);
		});	
	}

	this.actualizarPaciente=function(nuevo,callback){
		//this.comprobarCambios(nuevo);
		//var usu=this;
		var ges=this;
		var _id = nuevo._id;
		var nombre=nuevo.nombre;
		var apellido=nuevo.apellido;
		var tlf=nuevo.tlf;
		var cad = this.cad;
		ges.cad.obtenerPacienteCriterio(ges.cad.objectID(_id),function(usr){
			console.log("actualizarPacienteModeloUSR-->"+usr);
			if(usr){
				//usr._id=_id;
				usr.nombre=nombre;
				usr.apellido=apellido;
				usr.tlf=tlf;

		        cad.modificarColeccionPacientes(usr,function(nusu){
		               console.log("Usuario modificado");
		               callback(usr);
		        });
		    }
		    else{
		    	callback({email:undefined});	
		    }
		});
	}

	this.eliminarPaciente=function(uid,callback){
		var json={'resultados':-1};
		console.log("UidEliminarPaciente.Modelo-->"+uid);
		if (uid!=undefined){
			console.log("DentroIfEliminarPaciente.Modelo");
			this.cad.eliminarPaciente(this.cad.objectID(uid),function(result){
				console.log("ResultEliminarPaciente.Index-->"+result);
	            if (result.result.n==0){
	                console.log("No se pudo eliminar el paciente");
	            }
	            else{
	                json={"resultados":1};
	                console.log("Paciente eliminado de pacientes");
	                callback(json);
	            }
	        }); 
		}
	    else{
	    	console.log("DentroElseEliminarPaciente.Modelo");
	    	callback(json);
	    }
	}

	this.eliminarAngulo=function(uid,callback){
		var json={'resultados':-1};
		console.log("UidEliminarPaciente.Modelo-->"+uid);
		if (uid!=undefined){
			console.log("DentroIfEliminarPaciente.Modelo");
			this.cad.eliminarAngulo(this.cad.objectID(uid),function(result){
				console.log("ResultEliminarPaciente.Index-->"+result);
	            if (result.result.n==0){
	                console.log("No se pudo eliminar el paciente");
	            }
	            else{
	                json={"resultados":1};
	                console.log("Paciente eliminado de pacientes");
	                callback(json);
	            }
	        }); 
		}
	    else{
	    	console.log("DentroElseEliminarPaciente.Modelo");
	    	callback(json);
	    }
	}

	this.obtenerUsuario=function(id){
		return _.find(this.medicos,function(usu){
			return usu._id==id
		});
	}

	this.cad.connect(function(db){
		console.log("conectado a Atlas");
	});
}

module.exports.Gestion=Gestion;