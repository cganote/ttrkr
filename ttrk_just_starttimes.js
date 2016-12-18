function initLS(){
    document.getElementById("tasks").innerHTML = "No recently completed tasks - this is a new session.";
    localStorage.setItem("begun", true);
    var n = Date.now();
    localStorage.setItem("currentTask", n);
    localStorage.setItem("paused", false);
    var canvas = document.getElementById('myCanvas');
    canvas.innerHTML= "";
}

function myFunction() {
    if (!(localStorage.getItem("begun"))){
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
	    updateTasks();
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
// Re-render the time blocks
function updateTasks(){
    arr = []
	for (key in localStorage) {
	    if (localStorage.hasOwnProperty(key) && !isNaN(key)) {
		arr.push(key);
	    }
	}
    if (arr.length >= 1){
	var canvas = document.getElementById('myCanvas');
	canvas.innerHTML= "";
	canvas.setAttribute("style", "position:absolute; overflow:hidden;  width:90%; height:"+(25+(26*arr.length))+";");
	var n =  Date.now();
	var totaltime = (n - arr[0]);
	var offsetx = 0;
	var offsety = 5;
	drawDay(offsetx, offsety, 100, 15, "Elapsed time : "+ totaltime/1000 +" seconds", "ruler");
	offsety = 25;
	for (var i=0; i<arr.length; i++) {
	    if (i == arr.length -1){ pc = (n - arr[i])/totaltime * 100;}
	    else{ pc = (arr[i+1] - arr[i])/totaltime * 100  ;}
	    drawDay(offsetx, offsety, pc, 20, localStorage[arr[i]], arr[i]);
	    offsetx += pc;
	    offsety += 25;
	}
    }
}

function drawDay(x, y, w, h, text,taskname){
    var canvas = document.getElementById('myCanvas');
    var div = document.createElement('div');
    div.setAttribute("id",taskname);
    var r = colr();
    var pastel ='hsla('+r+', 100%, 80%, 0.81)';
    var dark ='hsla('+r+', 100%, 70%, 1)';
    var shtyle = "position:absolute; top:"+y+"; left:"+x+"%; width:"+w+"%; height:"+h+"; background-color:"+pastel+";border:2px solid "+dark+"; font-size:12px; white-space: nowrap;";
    div.setAttribute("style", shtyle);
    div.setAttribute("class", "fonts");
    canvas.appendChild(div);
    document.getElementById(taskname).innerHTML = text;
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

window.onbeforeunload = function() {
    return 'Do you really want to leave this page?';
};