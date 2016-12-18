var interval = null;
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
    heartbeat();
}

function heartbeat(){
    var min = 0;
    var hour = 0;
    var sec = 0;
    interval = setInterval(function(){
	    var timer = fakeTimer(hour,min,sec);
	    var output = "" + pad(timer.hour) + ":" + pad(timer.min) + ":" + pad(timer.sec);
	    document.getElementById("clock").innerHTML = output;
	    min = timer.min;
	    hour = timer.hour;
	    sec = timer.sec;
	    updateTasks();
	},1000);
}
function ms_to_hms(ms){
    var news = Math.floor(ms/1000);
    var newm = Math.floor(news/60);
    var newh = Math.floor(newm/60);
    return { "hour":newh, "min":newm, "sec":news};
}

function pad(num){
    if (num < 10){ return "0" + num; }
    else{ return "" + num; }
}

function clearTasks(){
    localStorage.clear();
    initLS();
    clearInterval(interval);
    heartbeat();
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
	var times = ms_to_hms(totaltime);
	var output = "" + pad(times.hour%60) + ":" + pad(times.min%60) + ":" + pad(times.sec%60);
	drawDay(offsetx, offsety, 100, 15, "Elapsed time : "+ output +" hours:minutes:seconds", "ruler");
	offsety = 25;
	for (var i=0; i<arr.length; i++) {
	    if (i == arr.length -1){ pc = (n - arr[i])/totaltime * 100;}
	    else{ pc = (arr[i+1] - arr[i])/totaltime * 100  ;}
	    div = drawDay(offsetx, offsety, pc, 20, "Started at "+(new Date(arr[i]*1)).toLocaleTimeString() +" : "+ localStorage[arr[i]], arr[i]);
	    div.setAttribute("onclick", "reveal(event)");
	    offsetx += pc;
	    offsety += 25;
	}
    }
}


function drawDay(x, y, w, h, text,taskname){
    var canvas = document.getElementById('myCanvas');
    var div = document.createElement('div');
    div.setAttribute("id",taskname);
    var pastel ='hsla('+y%255+', 100%, 80%, 0.81)';
    var dark ='hsla('+y%255+', 100%, 70%, 1)';
    var shtyle = "position:absolute; top:"+y+"; left:"+x+"%; width:"+w+"%; height:"+h+"; background-color:"+pastel+";border:2px solid "+dark+"; font-size:12px; white-space: nowrap;";
    div.setAttribute("style", shtyle);
    div.setAttribute("class", "fonts");
    canvas.appendChild(div);
    document.getElementById(taskname).innerHTML = text;
    return div;
}

function reveal(event){
    var x = event.clientX;
    var y = event.clientY; 
    var edt = document.getElementById("editor");
    var last = document.getElementById("lasttask");
    var shtyle = "display:block; padding:15px; position:absolute; top:"+y+"; left:"+x+";width:300px;height:500px;background-color:#fff;";    
    edt.setAttribute("style",shtyle);
    localStorage.setItem("currentTask", event.target.id);
    var lastval = localStorage.getItem(event.target.id);
    if (lastval){
    	last.value=lastval;
     }
    edt.setAttribute("onmouseleave","hideme(this)");
}

function removeTasks(){
    var current = localStorage.getItem("currentTask");
    localStorage.removeItem(current);
}
function editTasks(){
    var current = localStorage.getItem("currentTask");
    var text = document.getElementById("lasttask");
    localStorage.setItem(current, text.value);
}

function hideme(x){
    x.style.display = 'none';
}
//Runs when Start button is clicked
function myTime(){
    // Put the object into storage
    var n = Date.now();
    vals = document.getElementById('starttask').value;
    localStorage.setItem(n, vals);
    document.getElementById('starttask').value = "";
    document.getElementById("demo").innerHTML = n;
    clearInterval(interval);
    heartbeat();
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

// General running codez
document.getElementById('starttask').onkeypress=function(e){
    if(e.keyCode==13){
        document.getElementById('runtime').click();
    }
}
window.onbeforeunload = function() {
    return 'Do you really want to leave this page?';
};