
//var WIDTH = 1200;
//var HEIGHT = 1200;

var img;
var canv;
var pg;

function preload(){
  //img = loadImage("images.png");
  img = loadImage("salida.png");
  //img = loadImage("https://raw.githubusercontent.com/LingDong-/skeleton-tracing/master/test_images/horse_r.png");
}

function setup() {
  pixelDensity(1); // preventing p5 from automatically switching to 2x resolution for retina screens

  createCanvas(img.width,img.height);

  pg = createGraphics(img.width,img.height);
  pg.background(0);
  pg.image(img,0,0);
}

function draw() {
  /*
  // use mouse to draw
  pg.stroke(255);
  pg.strokeWeight(10);
  pg.line(pmouseX,pmouseY,mouseX,mouseY);
  */
  // trace the skeleton
  var {polylines,rects} = TraceSkeleton.fromCanvas(pg.canvas);
  
  image(pg,0,0);


  // visualize

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
  console.log("p1:"+pendiente1)
  console.log("p2:"+pendiente2)
  console.log("m:"+m)
  console.log("alpha:"+alpha)
  console.log(menor)
  //line(0,0,101, 210)
    line(polylines[0][0][0] //x
            ,polylines[0][0][1], //y
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

}