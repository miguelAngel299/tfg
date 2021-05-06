//var WIDTH = 1200;
//var HEIGHT = 1200;

var img;
var canv;
var pg;
var ang;

function preload(){
}

function setup() {

}

function mostrar(){
  img = loadImage('cliente/img/salidaTemporal.png', function(){
    dibujar();
  });
}

function dibujar() {
  var width = Math.round(cw.getWidth());
  var height;
  if(img.width > img.height)
    height=Math.round(width*0.4);
  else
    width=Math.round(width*0.4);
  

  pixelDensity(1); // preventing p5 from automatically switching to 2x resolution for retina screens
  canv = createCanvas(width, height);
  canv.id("myCanvas");

  img.resize(0,0);
  //canv.canvas.hidden=true;
  pg = createGraphics(width, height);
  pg.background(0);
  //REESCALAR --> MIRAR PG
  pg.image(img,0,0,img.resize(0,height), img.resize(width,0));

  //resize()
  
  //pg.image(img,0,0/*,img.width/2, img.height/2*/);



  var {polylines,rects} = TraceSkeleton.fromCanvas(pg.canvas);
  image(pg,0,0);

  noFill();
  // draw the rects
  stroke(128,20);
  for (var i = 0; i < rects.length; i++){
    rect(rects[i][0],rects[i][1],rects[i][2],rects[i][3])
  }
  // draw the polylines
  stroke(255,0,0);
  

  dibujarAngulo(polylines);
  
  /*for (var i = 0; i < polylines.length; i++){
    for (var j = 1; j < polylines[i].length; j++){
      console.log((polylines[i][j-1][0]+" - "+ //x
          polylines[i][j-1][1]+" - "+ //y
           polylines[i][j][0]+" - "+ //x1
           polylines[i][j][1])) //y1
    }
  }*/
}

function dibujarAngulo(polylines){
  let menor = polylines[0][0];
  let xm = 999;
  let ym = -1;
  for (var i = 0; i < polylines.length; i++){
    for (var j = 0; j < polylines[i].length; j++){
        if(xm > polylines[i][j][0])
          xm = polylines[i][j][0];

        if(ym < polylines[i][j][1]){
          ym= polylines[i][j][1];
          medio = polylines[i][j];
        }

  }}

  xm = int((medio[0] + xm)/2);
  pendiente1 = (ym - polylines[0][polylines[0].length-1][1])/(xm - polylines[0][polylines[0].length-1][0])
  pendiente2 = (ym - polylines[0][0][1])/(xm - polylines[0][0][0])


  m = (pendiente2-pendiente1)/(1+pendiente1*pendiente2);
  radianes = Math.atan(m);
  alpha = radianes * 180 / Math.PI;

  ang = getAngulo(alpha);

  console.log("p1:"+pendiente1)
  console.log("p2:"+pendiente2)
  console.log("m:"+m)
  console.log("alpha:"+ang)
  console.log(menor)
  
  
	line(polylines[0][0][0], //x
   		polylines[0][0][1], //y
        xm,
        ym)
    line(xm,
         ym,
         polylines[0][polylines[0].length-1][0], //x1
             polylines[0][polylines[0].length-1][1])
  



    //Medio real - MAXIMA Y
    //  line(polylines[0][0][0] //x
    //         ,polylines[0][0][1], //y
    //          medio[0],
    //          medio[1])
    // line(medio[0],
    //          medio[1],
    //      polylines[0][polylines[0].length-1][0], //x1
    //          polylines[0][polylines[0].length-1][1])

    cw.ponerResultado(ang);
    //canv.canvas.style.width=img.width;
    //canv.canvas.style.height=img.height;
    //canv.canvas.hidden=false;
}

function getAngulo(angulo){
  console.log("ANGULO ANTES "+angulo);
  var redond = Math.round(angulo * 100)/100;
  console.log("getAngulo++++"+redond);
  return redond+"º";
}