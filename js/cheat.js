var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
	canvas2 = document.createElement('canvas'),
    context2 = canvas2.getContext('2d');   
	canvas2.width = canvas.width;
	canvas2.height = canvas.height;


	
//General configuration	
var centerx = 350;
var centery = 300;
var rod = 100; //100;
var rod1 = rod;
var rod2 = rod;
var alpha = 2.3;
var m1 = 1;
var g = 0.005;
var radius0 = 20;
var tau = 3.0;
var duration = 500000;
   

//CONTROLS CONFIGURATION

var slide1x = 25;
var slide2x = 160;
var slide3x = 295;
var slide4x = 435;
var slide5x = 520;
var slide6x = 605;

var opq = 1.0;

var gradientSlide1 = context.createLinearGradient(slide1x, 40, slide1x, 55);
gradientSlide1.addColorStop(0.0, 'rgba(88,88,88,'+opq+')');
gradientSlide1.addColorStop(0.6, 'rgba(255,255,255,'+opq+')');
gradientSlide1.addColorStop(1.0, 'rgba(89,89,89,'+opq+')');

var gradientSlide2 = context.createLinearGradient(slide2x, 40, slide2x, 55);
gradientSlide2.addColorStop(0.0, 'rgba(88,88,88,'+opq+')');
gradientSlide2.addColorStop(0.6, 'rgba(255,255,255,'+opq+')');
gradientSlide2.addColorStop(1.0, 'rgba(89,89,89,'+opq+')');

var gradientSlide3 = context.createLinearGradient(slide3x, 40, slide3x, 55);
gradientSlide3.addColorStop(0.0, 'rgba(88,88,88,'+opq+')');
gradientSlide3.addColorStop(0.6, 'rgba(255,255,255,'+opq+')');
gradientSlide3.addColorStop(1.0, 'rgba(89,89,89,'+opq+')');

var gradientSlide4 = context.createLinearGradient(slide4x, 20, slide4x, 60);
gradientSlide4.addColorStop(0.0, 'rgba(88,88,88,'+opq+')');
gradientSlide4.addColorStop(0.6, 'rgba(255,255,255,'+opq+')');
gradientSlide4.addColorStop(1.0, 'rgba(89,89,89,'+opq+')');

var gradientSlide5 = context.createLinearGradient(slide5x, 20, slide5x, 60);
gradientSlide5.addColorStop(0.0, 'rgba(88,88,88,'+opq+')');
gradientSlide5.addColorStop(0.6, 'rgba(255,255,255,'+opq+')');
gradientSlide5.addColorStop(1.0, 'rgba(89,89,89,'+opq+')');

var gradientSlide6 = context.createLinearGradient(slide6x, 20, slide6x, 60);
gradientSlide6.addColorStop(0.0, 'rgba(88,88,88,'+opq+')');
gradientSlide6.addColorStop(0.6, 'rgba(255,255,255,'+opq+')');
gradientSlide6.addColorStop(1.0, 'rgba(89,89,89,'+opq+')');


context.fillStyle = gradientSlide1;
context.fillRect(slide1x, 40, 120, 15);
context.fillStyle = gradientSlide2;
context.fillRect(slide2x, 40, 120, 15);
context.fillStyle = gradientSlide3;
context.fillRect(slide3x, 40, 120, 15);
context.fillStyle = gradientSlide4;
context.fillRect(slide4x, 20, 70, 40);
context.fillStyle = gradientSlide5;
context.fillRect(slide5x, 20, 70, 40);
context.fillStyle = gradientSlide6;
context.fillRect(slide6x, 20, 70, 40);


context.fillStyle = 'rgba(89,89,89,1)';

var	sizex = 15;
	sizey = 25;

	
var left1x = 50;
	left1y = 35;
context.fillRect(left1x, left1y, sizex, sizey);
var dragging1 = false;
var slider1 = left1x+sizex/2;


var left2x = slide2x+32;
	left2y = 35;
context.fillRect(left2x, left2y, sizex, sizey);
var dragging2 = false;
var slider2 = left2x+sizex/2;


var left3x = slide3x+40;
	left3y = 35;
context.fillRect(left3x, left3y, sizex, sizey);
var dragging3 = false;
var slider3 = left3x+sizex/2;


context.fillStyle = 'white';
context.font = '13px Arial';
context.fillText ("Mass Ratio: ", slide1x, 30);
mu = Math.log((slider1/30.92308))/Math.log(1.6444);
context.font = '15px Arial';
context.fillText (mu.toFixed(2), 99, 30);

context.font = '13px Arial';
context.fillText ("Initial Angle: ", slide2x, 30);
alphagrad = (slider2-167.50)*24/7;
context.font = '15px Arial';
context.fillText (alphagrad.toFixed(0), 235, 30);
context.font = '11px Arial';
if (alphagrad < 10) {context.fillText ("o", 245, 23);}
if (alphagrad >= 10 && alphagrad < 100) {context.fillText ("o", 253, 23);}
if (alphagrad >= 100) {context.fillText ("o", 261, 23);}
alpha = alphagrad/180*Math.PI;

context.font = '13px Arial';
context.fillText ("Animation Speed", slide3x, 30);
context.fillStyle = 'black';

context.font = 'bold 13px Arial';
context.fillText ("RESET", slide4x+14, 47);
context.fillText ("STOP", slide5x+16, 47);
context.fillText ("START", slide6x+13, 47);


//INITIALIZATION
var anim = false;

canvas.onmousedown = mouseDown;

// Bobs Radiuses and Angles
var mu3 = Math.pow(mu,1/3);
var radius1 = 2*radius0/(1+mu3);
var radius2 = 2*mu3*radius0/(1+mu3);
var p1 = 0;
var p2 = 0;
var angle1=alpha;
var angle2=alpha;
var nplus1 = new Array();
var i=0;

// Position of 1st bob
var x1=centerx+rod1*Math.sin(angle1);
var y1=centery+rod1*Math.cos(angle1);
// Position of 2nd bob
var x2=centerx+rod1*Math.sin(angle1)+rod2*Math.sin(angle2);
var y2=centery+rod1*Math.cos(angle1)+rod2*Math.cos(angle2);

Init ();

function Init (){
	var angle1=alpha;
	var angle2=alpha;
// Initial drawing in canvas
	TrajectoryCircleDraw (x2, y2);
	Bob2Draw (x2, y2, radius2);
	Bob1Draw (x1, y1, radius1);
	CenterDraw (centerx, centery);
	Rod1Draw (x1, y1);
	Rod2Draw (x1, y1, x2, y2);
	context.drawImage(canvas2, 0, 0);
	context.fillStyle = 'grey';
	context.font = '11px Verdana';
	context.fillText ("CopyRight: Math24", 25, canvas.height-10);
}	



//BUTTON FUNCTIONS
canvas.onclick = Click5;

function Click5 (ev5) {
  	var loc5 = windowToCanvas (canvas, ev5.clientX, ev5.clientY);	  	
	var loc5x = loc5.x;
	var loc5y = loc5.y;
	if (loc5x > slide6x && loc5x < slide6x+70 && loc5y > 22 && loc5y < 60) { //RUN Button
		anim = true;
		Animate ();
	}
	if (loc5x > slide5x && loc5x < slide5x+70 && loc5y > 22 && loc5y < 60) { //STOP Button
		i=0;
		anim = false;
		Animate ();
	}
	if (loc5x > slide4x && loc5x < slide4x+70 && loc5y > 22 && loc5y < 60) { //RESET Button
		anim = false;
		Animate ();
		// Bobs Radiuses and Angles
		mu3 = Math.pow(mu,1/3);
		radius1 = 2*radius0/(1+mu3);
		radius2 = 2*mu3*radius0/(1+mu3);
		p1 = 0;
		p2 = 0;
		angle1=alpha;
		angle2=alpha;
		i=0;
		context2.clearRect(0, 60, canvas.width, canvas.height-20);	
		//window.location.reload();
	}
}



function Animate (){
var enough = setInterval(function () {
	if (anim) {
		nplus1 = rk4(angle1, angle2, p1, p2);
		angle1=nplus1[0];
		angle2=nplus1[1];
		p1=nplus1[2];
		p2=nplus1[3];
	}
// Position of 1st bob
   	x1=centerx+rod1*Math.sin(angle1);
	y1=centery+rod1*Math.cos(angle1);
// Position of 2nd bob
	x2=centerx+rod1*Math.sin(angle1)+rod2*Math.sin(angle2);
	y2=centery+rod1*Math.cos(angle1)+rod2*Math.cos(angle2);
// Final drawing in canvas
	TrajectoryCircleDraw (x2, y2);
	Bob2Draw (x2, y2, radius2);
	Bob1Draw (x1, y1, radius1);
	CenterDraw (centerx, centery);
	Rod1Draw (x1, y1);
	Rod2Draw (x1, y1, x2, y2);
	context.drawImage(canvas2, 0, 0);
	context.fillStyle = 'grey';
	context.font = '11px Verdana';
	context.fillText ("CopyRight: Math24", 25, canvas.height-10);
	i++;
	if (i>duration || anim == false) clearInterval(enough);
}, tau);
}	
	

    



// FUNCTIONS ....................................................

function Rod1Draw (posx, posy)  {
  	  context.strokeStyle = '#2B547E';
	  context.lineWidth = 6;
	  context.beginPath();
	  context.moveTo(centerx, centery);
      context.lineTo(posx, posy);
  	  context.stroke();
}

function Bob1Draw (posx, posy, radius1)  {
      context.beginPath();
	  context.strokeStyle = '#2B547E';
      context.arc(posx, posy, radius1, 0, Math.PI*2, false);
	  var gradient1 = context.createRadialGradient(posx+radius1/2, posy+radius1/3, radius1/10, posx, posy, radius1);
	  gradient1.addColorStop(0.0, 'white');
  	  gradient1.addColorStop(1.0, '#585858');
      context.fillStyle = gradient1;
      context.fill();
}

function Rod2Draw (x1, y1, x2, y2)  {
  	  context.strokeStyle = '#2B547E';
	  context.lineWidth = 6;
	  context.beginPath();
	  context.moveTo(x1, y1);
      context.lineTo(x2, y2);
  	  context.stroke();
}

function Bob2Draw (posx, posy, radius2)  {
      context.clearRect(0, 60, canvas.width, canvas.height-20);
   	  context.globalCompositeOperation="destination-over";
	  context.beginPath();
      context.strokeStyle = '#6D7B8D';
      context.arc(posx, posy, radius2, 0, Math.PI*2, false);
	  var gradient2 = context.createRadialGradient(posx+radius2/2, posy+radius2/3, radius2/10, posx, posy, radius2);
	  gradient2.addColorStop(0.0, 'white');
  	  gradient2.addColorStop(1.0, '#585858');
      context.fillStyle = gradient2;
      context.fill();
}

function TrajectoryCircleDraw (posx, posy)  {
	  context2.beginPath();
      context2.strokeStyle = 'white';
	  context2.fillStyle = 'white';
      context2.arc(posx, posy, 1.0, 0, Math.PI*2, false);
      context2.fill();
}

function CenterDraw (posx, posy)  {
  	  context.lineWidth = 2;
	  context.beginPath();
      context.strokeStyle = '#8c7e6c';
	  context.fillStyle = '#8c7e6c';
      context.arc(posx, posy, 5, 0, Math.PI*2, false);
      context.fill();
	  context.stroke();
}

function f1 (alpha1, alpha2, p1, p2)  {
      var num11=p1-p2*Math.cos(alpha1-alpha2);
	  var den11=m1*rod*rod*(1+mu*Math.sin(alpha1-alpha2)*Math.sin(alpha1-alpha2));
	  var res1=num11/den11;
	  return res1;
}

function f2 (alpha1, alpha2, p1, p2)  {
      var num21=p2*(1+mu)-p1*mu*Math.cos(alpha1-alpha2);
	  var den21=m1*rod*rod*(1+mu*Math.sin(alpha1-alpha2)*Math.sin(alpha1-alpha2));
	  var res2=num21/den21;
	  return res2;
}

function f3 (alpha1, alpha2, p1, p2)  {
      var num31=p1*p2*Math.sin(alpha1-alpha2);
	  var den31=m1*rod*rod*(1+mu*Math.pow(Math.sin(alpha1-alpha2),2));
 	  var a1=num31/den31;
	  var num32=(p1*p1*mu-2*p1*p2*mu*Math.cos(alpha1-alpha2)+p2*p2*(1+mu))*Math.sin(2*(alpha1-alpha2));
	  var den32=2*m1*rod*rod*Math.pow((1+mu*Math.sin(alpha1-alpha2)*Math.sin(alpha1-alpha2)),2);
	  var a2=num32/den32;
	  var res3=-m1*(1+mu)*g*rod*Math.sin(alpha1)-a1+a2;
	  return res3;
}

function f4 (alpha1, alpha2, p1, p2)  {
      var num41=p1*p2*Math.sin(alpha1-alpha2);
	  var den41=m1*rod*rod*(1+mu*Math.pow(Math.sin(alpha1-alpha2),2));
 	  var a1=num41/den41;
	  var num42=(p1*p1*mu-2*p1*p2*mu*Math.cos(alpha1-alpha2)+p2*p2*(1+mu))*Math.sin(2*(alpha1-alpha2));
	  var den42=2*m1*rod*rod*Math.pow((1+mu*Math.sin(alpha1-alpha2)*Math.sin(alpha1-alpha2)),2);
	  var a2=num42/den42;
	  var res4=-m1*mu*g*rod*Math.sin(alpha2)+a1-a2;
	  return res4;
}

function rk4 (alpha1, alpha2, p1, p2)  {
	  var y1 = new Array();
	  var y2 = new Array();
  	  var y3 = new Array();
	  var y4 = new Array();
	  var z = new Array();
	  y1[0] = f1 (alpha1, alpha2, p1, p2)*tau;
	  y1[1] = f2 (alpha1, alpha2, p1, p2)*tau;
	  y1[2] = f3 (alpha1, alpha2, p1, p2)*tau;
	  y1[3] = f4 (alpha1, alpha2, p1, p2)*tau;
	  y2[0] = f1 (alpha1+1/2*y1[0], alpha2+1/2*y1[1], p1+1/2*y1[2], p2+1/2*y1[3])*tau;
	  y2[1] = f2 (alpha1+1/2*y1[0], alpha2+1/2*y1[1], p1+1/2*y1[2], p2+1/2*y1[3])*tau;
  	  y2[2] = f3 (alpha1+1/2*y1[0], alpha2+1/2*y1[1], p1+1/2*y1[2], p2+1/2*y1[3])*tau;
   	  y2[3] = f4 (alpha1+1/2*y1[0], alpha2+1/2*y1[1], p1+1/2*y1[2], p2+1/2*y1[3])*tau;
	  y3[0] = f1 (alpha1+1/2*y2[0], alpha2+1/2*y2[1], p1+1/2*y2[2], p2+1/2*y2[3])*tau;
  	  y3[1] = f2 (alpha1+1/2*y2[0], alpha2+1/2*y2[1], p1+1/2*y2[2], p2+1/2*y2[3])*tau;
   	  y3[2] = f3 (alpha1+1/2*y2[0], alpha2+1/2*y2[1], p1+1/2*y2[2], p2+1/2*y2[3])*tau;
   	  y3[3] = f4 (alpha1+1/2*y2[0], alpha2+1/2*y2[1], p1+1/2*y2[2], p2+1/2*y2[3])*tau;
   	  y4[0] = f1 (alpha1+y3[0], alpha2+y3[1], p1+y3[2], p2+y3[3])*tau;
	  y4[1] = f2 (alpha1+y3[0], alpha2+y3[1], p1+y3[2], p2+y3[3])*tau;
	  y4[2] = f3 (alpha1+y3[0], alpha2+y3[1], p1+y3[2], p2+y3[3])*tau;
  	  y4[3] = f4 (alpha1+y3[0], alpha2+y3[1], p1+y3[2], p2+y3[3])*tau;
	  z[0]=alpha1+1/6*(y1[0]+2*y2[0]+2*y3[0]+y4[0]);
	  z[1]=alpha2+1/6*(y1[1]+2*y2[1]+2*y3[1]+y4[1]);
	  z[2]=p1+1/6*(y1[2]+2*y2[2]+2*y3[2]+y4[2]);
	  z[3]=p2+1/6*(y1[3]+2*y2[3]+2*y3[3]+y4[3]);
	  return z;
}


//SLIDER #1
function mouseDown (ev) {
	var loc = windowToCanvas (canvas, ev.clientX, ev.clientY);	  	
	window.locx = loc.x;
	var locy = loc.y;
    dragging1 = false;
	dragging2 = false
	dragging3 = false;
	if (locx > left1x && locx < left1x+sizex && locy > left1y && locy < left1y+sizey) {
		dragging1 = true;
		canvas.onmousemove = mouseMove1;  
	}
	if (locx > left2x && locx < left2x+sizex && locy > left2y && locy < left2y+sizey) {
		dragging2 = true;
		canvas.onmousemove = mouseMove2;  
	}
	if (locx > left3x && locx < left3x+sizex && locy > left3y && locy < left3y+sizey) {
		dragging3 = true;
		canvas.onmousemove = mouseMove3;  
	}
}

function mouseMove1 (ev12) {
  	if (dragging1) {
		var loc12 = windowToCanvas (canvas, ev12.clientX, ev12.clientY);	  	
		var loc12x = loc12.x;
		var loc12y = loc12.y;
		context.clearRect(slide1x-10, 35, 135, 25);	  
		context.fillStyle = gradientSlide1;
		context.fillRect(slide1x, 40, 120, 15);
		context.fillStyle = 'rgba(89,89,89,1)';
		var lefttopx1 = left1x+loc12x-locx;
		if (lefttopx1 < slide1x) {lefttopx1 = slide1x;}
		if (lefttopx1 > slide1x+120-sizex) {lefttopx1 = slide1x+120-sizex;}
		context.globalCompositeOperation="source-over";	
		context.fillRect(lefttopx1, left1y, sizex, sizey);
		//mass ratio change	
		slider1 = lefttopx1+sizex/2;
		context.clearRect(slide1x-5, 10, 130, 25);	  
		context.fillStyle = 'white';
		context.font = '13px Arial';
		context.fillText ("Mass Ratio: ", slide1x, 30);
		mu = Math.log((slider1/30.92308))/Math.log(1.6444);
		mu3 = Math.pow(mu,1/3);
		radius1 = 2*radius0/(1+mu3);
		radius2 = 2*mu3*radius0/(1+mu3);
		context.font = '15px Arial';
		context.fillText (mu.toFixed(2), 99, 30);
		TrajectoryCircleDraw (x2, y2);
		Bob2Draw (x2, y2, radius2);
		Bob1Draw (x1, y1, radius1);
		CenterDraw (centerx, centery);
		Rod1Draw (x1, y1);
		Rod2Draw (x1, y1, x2, y2);
		context.drawImage(canvas2, 0, 0);
		context.fillStyle = 'grey';
		context.font = '11px Verdana';
		context.fillText ("CopyRight: Math24", 25, canvas.height-10);
		canvas.onmouseup = mouseUp1;
	}
}


function mouseUp1 (ev13) {
  	if (dragging1) {
		var loc13 = windowToCanvas (canvas, ev13.clientX, ev13.clientY);	  	
		var loc13x = loc13.x;
		var loc13y = loc13.y;
		context.fillStyle = 'rgba(89,89,89,1)';
		var lefttopx1 = left1x+loc13x-locx;
		if (lefttopx1 < slide1x) {lefttopx1 = slide1x;}
		if (lefttopx1 > slide1x+120-sizex) {lefttopx1 = slide1x+120-sizex;}
		context.globalCompositeOperation="source-over";	
		context.fillRect(lefttopx1, left1y, sizex, sizey);
		dragging1 = false;
		left1x = lefttopx1;
		slider1 = lefttopx1+sizex/2;
	}
}

	
function windowToCanvas(canvas, x, y) {
	var wind = canvas.getBoundingClientRect();
	return { x: x - wind.left*(canvas.width/wind.width),
    y: y - wind.top*(canvas.height/wind.height)
    };
}


//SLIDER #2
function mouseMove2 (ev22) {
	if (dragging2) {
  		var loc22 = windowToCanvas (canvas, ev22.clientX, ev22.clientY);	  	
		var loc22x = loc22.x;
		var loc22y = loc22.y;
		context.clearRect(slide2x-10, 35, 135, 25);	  
		context.fillStyle = gradientSlide2;
		context.fillRect(slide2x, 40, 120, 15);
		context.fillStyle = 'rgba(89,89,89,1)';
		var lefttopx2 = left2x+loc22x-locx;
		if (lefttopx2 < slide2x) {lefttopx2 = slide2x;}
		if (lefttopx2 > slide2x+120-sizex) {lefttopx2 = slide2x+120-sizex;}
		context.globalCompositeOperation="source-over";	
		context.fillRect(lefttopx2, left2y, sizex, sizey);
		slider2 = lefttopx2+sizex/2;
		context.clearRect(slide2x-5, 10, 130, 25);	  
		context.fillStyle = 'white';
		context.font = '13px Arial';
		context.fillText ("Initial Angle: ", slide2x, 30);
		alphagrad = (slider2-167.50)*24/7;
		context.font = '15px Arial';
		context.fillText (alphagrad.toFixed(0) + '', 235, 30);
		context.font = '11px Arial';
		if (alphagrad < 10) {context.fillText ("o", 245, 23);}
		if (alphagrad >= 10 && alphagrad < 100) {context.fillText ("o", 253, 23);}
		if (alphagrad >= 100) {context.fillText ("o", 261, 23);}
		alpha = alphagrad/180*Math.PI;
		if (anim == false) {
			angle1=alpha;
			angle2=alpha;
			mu3 = Math.pow(mu,1/3);
			radius1 = 2*radius0/(1+mu3);
			radius2 = 2*mu3*radius0/(1+mu3);
			// Position of 1st bob
			x1=centerx+rod1*Math.sin(angle1);
			y1=centery+rod1*Math.cos(angle1);
			// Position of 2nd bob
			x2=centerx+rod1*Math.sin(angle1)+rod2*Math.sin(angle2);
			y2=centery+rod1*Math.cos(angle1)+rod2*Math.cos(angle2);
			context.clearRect(0, 60, canvas.width, canvas.height-20);
			context2.clearRect(0, 60, canvas.width, canvas.height-20);
			Bob2Draw (x2, y2, radius2);
			Bob1Draw (x1, y1, radius1);
			CenterDraw (centerx, centery);
			Rod1Draw (x1, y1);
			Rod2Draw (x1, y1, x2, y2);
			context.fillStyle = 'grey';
			context.font = '11px Verdana';
			context.fillText ("CopyRight: Math24", 25, canvas.height-10);
		}
		canvas.onmouseup = mouseUp2;
		}
}

function mouseUp2 (ev23) {
	if (dragging2) {
  		var loc23 = windowToCanvas (canvas, ev23.clientX, ev23.clientY);	  	
		var loc23x = loc23.x;
		var loc23y = loc23.y;
		dragging2 = false;
		context.fillStyle = 'rgba(89,89,89,1)';
		var lefttopx2 = left2x+loc23x-locx;
		if (lefttopx2 < slide2x) {lefttopx2 = slide2x;}
		if (lefttopx2 > slide2x+120-sizex) {lefttopx2 = slide2x+120-sizex;}
		context.globalCompositeOperation="source-over";	
		context.fillRect(lefttopx2, left2y, sizex, sizey);
		left2x = lefttopx2;
		slider2 = lefttopx2+sizex/2;
		alphagrad = (slider2-167.50)*24/7;
		alpha = alphagrad/180*Math.PI;
	}
}

//SLIDER #3
function mouseMove3 (ev32) {
  	if (dragging3) {
		var loc32 = windowToCanvas (canvas, ev32.clientX, ev32.clientY);	  	
		var loc32x = loc32.x;
		var loc32y = loc32.y;
		context.clearRect(slide3x-10, 35, 135, 25);	  
		context.fillStyle = gradientSlide3;
		context.fillRect(slide3x, 40, 120, 15);
		context.fillStyle = 'rgba(89,89,89,1)';
		var lefttopx3 = left3x+loc32x-locx;
		if (lefttopx3 < slide3x) {lefttopx3 = slide3x;}
		if (lefttopx3 > slide3x+120-sizex) {lefttopx3 = slide3x+120-sizex;}
		context.globalCompositeOperation="source-over";	
		context.fillRect(lefttopx3, left3y, sizex, sizey);
		slider3 = lefttopx3+sizex/2;
		tau = 0.5+(slider3-302.5)*19/210;
		canvas.onmouseup = mouseUp3;
	}
}

function mouseUp3 (ev33) {
	if (dragging3) {
  		var loc33 = windowToCanvas (canvas, ev33.clientX, ev33.clientY);	  	
		var loc33x = loc33.x;
		var loc33y = loc33.y;
		dragging3 = false;
		context.fillStyle = 'rgba(89,89,89,1)';
		var lefttopx3 = left3x+loc33x-locx;
		if (lefttopx3 < slide3x) {lefttopx3 = slide3x;}
		if (lefttopx3 > slide3x+120-sizex) {lefttopx3 = slide3x+120-sizex;}
		context.globalCompositeOperation="source-over";	
		context.fillRect(lefttopx3, left3y, sizex, sizey);
		left3x = lefttopx3;
		slider3 = lefttopx3+sizex/2;
	}
}


