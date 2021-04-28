//var WIDTH = 1200;
//var HEIGHT = 1200;

var img;
var canv;
var pg;
var ang;

function preload(){
  //img = loadImage("images.png");
  //img = loadImage('cliente/img/salidaTemporal.png');
  //img = loadImage("https://raw.githubusercontent.com/LingDong-/skeleton-tracing/master/test_images/horse_r.png");
}

function setup() {

}

function mostrar(){
  img = loadImage('cliente/img/salidaTemporal.png', function(){
    dibujar();
  });
  

  // trace the skeleton
  
}

function dibujar() {
  /*
  // use mouse to draw
  pg.stroke(255);
  pg.strokeWeight(10);
  pg.line(pmouseX,pmouseY,mouseX,mouseY);
  */
  // visualize

  //var w = cw.getWidth();
  //var h = cw.getHeight();
  //console.log("WWWWWWW++++++++"+w);
  //console.log("HHHHHHHH++++++++"+h);

  var w = Math.round(cw.getWidth());
  //var h = Math.round(cw.getHeight());
  var width = w - w * 0.2;
  
  factorEscala = Math.abs(img.width/img.height);

  if(img.width > w){
    img.width = width;
    img.height = width - width * 0.2;
    if(img.width > img.height){
      var height = width - width / (factorEscala);
      height=height - height * 0.4;
    }else{
      height = width - width * 0.4;
      width=width - width / (factorEscala);
    }
  }else{
    width = img.width;
    height = img.height;
  }

  //width = Math.round(Math.abs(width));
  //height = Math.round(Math.abs(height));

  console.log("WWWWWWW++++++++"+width);
  console.log("HHHHHHHH++++++++"+height);

  pixelDensity(1); // preventing p5 from automatically switching to 2x resolution for retina screens
  canv = createCanvas(width,height);

  //canv.canvas.hidden=true;
  pg = createGraphics(width,height);
  pg.background(0);
  pg.image(img,0,0,width,height);
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