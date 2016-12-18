function initLS(){
   document.getElementById("tasks").innerHTML = "No recently completed tasks - new session.";
    localStorage.setItem("begun", true);
    var n = Date.now();
    localStorage.setItem("currentTask", n);
    localStorage.setItem("paused", false);
}
function myFunction() {
if (!(localStorage.getItem("begun"))){
    // init variable/set default variable for item
    initLS();
}
else{
updateTasks();
}
var min = 0;
var hour = 0;
var sec = 0;
var timeinterval = setInterval(function(){
var timer = fakeTimer(hour,min,sec);
var output = "" + pad(timer.hour) + ":" + pad(timer.min) + ":" + pad(timer.sec);
document.getElementById("clock").innerHTML = output;
min = timer.min;
hour = timer.hour;
sec = timer.sec;
},1000);
}

function pad(num){
if (num < 10){ return "0" + num; }
else{ return "" + num; }
}

function clearTasks(){
    localStorage.clear();
    initLS();
    updateTasks();
}
function updateTasks(){
    var output = "";
    arr = []
    for (key in localStorage) {
        if (localStorage.hasOwnProperty(key) && !isNaN(key)) {
            arr.push(key);
        }
    }
   output = ""
   if (arr.length < 1){
    output = "No recently completed tasks.";
   }
   else{
    var canvas = document.getElementById('myCanvas');
    canvas.setAttribute("height", 25*arr.length);
    arr.sort();
    var padding = (arr.length -1) * 5
//    var totalw = (document.getElementById('myCanvas').width) - padding;
    var totalw = (getComputedStyle(canvas).width;) - padding;
    var n =  Date.now();
    var totaltime = (n - arr[0]);
    var offsetx = 5;
    var offsety = 5;
    for (var i=0; i<arr.length; i++) {
	if (i == arr.length -1){ 
	pc = Math.floor(((n - arr[i])/totaltime) * totalw);	}
	else{ pc = Math.floor(((arr[i+1] - arr[i])/totaltime) * totalw);}
	alert("pc is "+pc+".");
	drawDay(offsetx, offsety, pc, 20, arr[i] + " : " + localStorage[arr[i]],arr[i]);
       offsetx += pc + 5;
	offsety += 25;
       output += arr[i] + " :  " + localStorage[arr[i]] + "<br>";
    }
   }
   //document.getElementById("tasks").innerHTML = output;
}

function drawDay(x, y, w, h, text,taskname){
      var canvas = document.getElementById('myCanvas');
      var div = document.createElement('div');
      div.setAttribute("id",taskname);
      var r = colr();
      var pastel ='hsla('+r+', 100%, 80%, 0.81)';
      var dark ='hsla('+r+', 100%, 70%, 1)';
      var shtyle = "position:absolute; top:"+x+"; left:"+y+"; width:"+w+"; height:"+h+"; background-color:"+pastel+"; outline-color:"+dark+";outline-width:3px";
      div.setAttribute("style", shtyle);
      canvas.appendChild(div);
//      document.getElementById(taskname).innerHTML = text;
}
function colr(){
return Math.floor(Math.random() * 255); 
}
function myTime(){
// Put the object into storage
var n = Date.now();
vals = document.getElementById('starttask').value;
localStorage.setItem(n, vals);
document.getElementById("demo").innerHTML = n;
updateTasks();
}

function fakeTimer(hour, min, sec){
  var news = sec + 1;
  var newm = min;	
  var newh = hour;			
  if (news > 59){
    news = 0;
    newm ++;
    if (newm > 59){
        newm = 0;
        newh ++;
    }
  }
  return { "hour":newh, "min":newm, "sec":news};
}

function clockDiff(){
var c = localStorage.getItem("currentTask");
var n = Date.now();
var t = n - c;
var seconds = Math.floor( (t/1000) % 60 );
document.getElementById("demo").innerHTML = seconds;
}

function addelement(){
    var starttext = document.createElement("INPUT");
    starttext.setAttribute("type", "text");
    starttext.setAttribute("id", "starttext");
    starttext.setAttribute("value", "Email");
    document.getElementById("myform").appendChild(starttext);
}

window.onbeforeunload = function() {
   return 'Do you really want to leave this page?';
};