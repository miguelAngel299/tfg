var mongo=require("mongodb").MongoClient;
var ObjectID=require("mongodb").ObjectID;

function Cad(){
    this._mongo =mongo;
    this.pacientes=undefined;
    this.medicos=undefined;
    this.angulos=undefined;
    this.objectID=function(id){
        return {_id:ObjectID(id)};
    }
    //// pacientes
    this.insertarPaciente=function(paciente,callback){
        insertar(this.pacientes,paciente,callback);
    }

    this.obtenerPacientes=function(callback){
        obtenerTodos(this.pacientes,callback);
    }
    this.obtenerPacientesMedico=function(medico,callback){
        obtenerTodosCriterio(this.pacientes,medico,callback);
    }

    this.obtenerPacienteCriterio=function(criterio,callback){
        obtener(this.pacientes,criterio,callback);
    }
    this.obtenerTodosPacientesCriterio=function(criterio,callback){
        obtenerTodosCriterio(this.paciente,criterio,callback);s
    }
    this.modificarColeccionPacientes=function(paciente,callback){
        modificarColeccion(this.pacientes,paciente,callback);
    }

    this.eliminarPaciente=function(uid,callback){
       eliminar(this.pacientes,uid,callback);
    }

    //medicos
    this.insertarMedico=function(medico,callback){
        insertar(this.medicos,medico,callback);
    }

    this.obtenerMedicos=function(callback){
        obtenerTodos(this.medicos,callback);
    }

    this.obtenerMedicoCriterio=function(criterio,callback){
        obtener(this.medicos,criterio,callback);
    }

    this.modificarColeccionMedicos=function(medico,callback){
        modificarColeccion(this.medicos,medico,callback);
    }

    this.eliminarMedico=function(uid,callback){
       eliminar(this.medicos,{_id:ObjectID(uid)},callback);
    }

    //angulos
    this.insertarAngulo=function(angulo,callback){
        insertar(this.angulos,angulo,callback);
    }

    this.obtenerAngulos=function(callback){
        obtenerTodos(this.angulos,callback);
    }

    this.obtenerAnguloCriterio=function(criterio,callback){
        obtener(this.angulos,criterio.ang,callback);
    }

    this.modificarColeccionAngulos=function(angulo,callback){
        modificarColeccion(this.angulos,angulo,callback);
    }

    this.eliminarAngulo=function(uid,callback){
        console.log(uid);
       eliminar(this.angulos,uid,callback);
    }

    //// funciones genÃ©ricas
    function obtenerTodos(coleccion,callback){
        //console.log(coleccion)
        coleccion.find().toArray(function(error,col){
            callback(col);
        });
    };
 
    function obtener(coleccion,criterio,callback){

        console.log("OBTENER --> "+this.angulos);
        console.log("OBTENER--> "+criterio);
        coleccion.find(criterio).toArray(function(error,partida){
            console.log(partida);
            if (partida.length==0){
                callback(undefined);
            }
            else{

                callback(partida[0]);
            }
        });
    };
    function obtenerTodosCriterio(coleccion,criterio,callback){
        console.log(coleccion)
        coleccion.find().toArray(function(error,partida){
            console.log(partida);
            if (partida.length==0){
                callback(undefined);
            }
            else{
                var result =  [];
                for (element in partida){
                    if(partida[element].medico == criterio){
                        result.push(partida[element]);
                    }
                }
                if(result.length == 0) callback(undefined);
                callback(result);
            }
        });
    };
    function insertar(coleccion,elemento,callback){
        coleccion.insertOne(elemento,function(err,result){
            if(err){
                console.log("error");
            }
            else{
                console.log("Nuevo elemento creado");
                callback(elemento);
            }
        });
    }
 
    function modificarColeccion(coleccion,paciente,callback){
        coleccion.updateOne({_id:paciente._id},{$set:paciente},{upsert:true},function(err,result){
            if(err)
                console.log("No se pudo actualizar la colección (método genérico)");
            else
                console.log("Elemento actualizado");
            callback(result);
        });
    };
     
    function eliminar(coleccion,criterio,callback){
        console.log("PersistanceCriterio-->"+criterio);
        coleccion.remove(criterio,function(err,result){
            if(!err){
                callback(result);
            }
        });
    }

    this.cerrar=function(){
        this.dbase.close();
    }

    this.connect=function(callback){
        var cad=this;       
        //mongodb+srv://miguelan99:<password>@cluster0.sry8b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
        mongo.connect("mongodb+srv://miguelan99:j123@cluster0.sry8b.mongodb.net/RecoveryHub?retryWrites=true&w=majority",{useUnifiedTopology: true },function(err, database){
            if (err){
                console.log("No pudo conectar a la base de datos");
            }
            else{                
                console.log("conectado a Mongo: pacientes");                             
                database.db("RecoveryHub").collection("pacientes",function(err,col){
                    if (err){
                        console.log("No se puede obtener la coleccion")
                    }
                    else{       
                        console.log("tenemos la coleccion pacientes");                                 
                        cad.pacientes=col;                                                  
                    }
                });

                database.db("RecoveryHub").collection("medicos",function(err,col){
                    if (err){
                        console.log("No se puede obtener la coleccion")
                    }
                    else{       
                        console.log("tenemos la coleccion medicos");                                 
                        cad.medicos=col;    
                    }
                });

                database.db("RecoveryHub").collection("angulos",function(err,col){
                    if (err){
                        console.log("No se puede obtener la coleccion")
                    }
                    else{       
                        console.log("tenemos la coleccion angulos");                                 
                        cad.angulos=col;    
                    }
                });
                callback(database);
            }
        });
    }
}

module.exports.Cad=Cad;