
let timerTotal = 0;
let nowtime = document.getElementById("nowtime");
var worktimer;



let tbreak = document.getElementById("breakTime");

function startWork() {
    console.log("work");
    var dStart = new Date(Date.now());
    console.log(dStart);
    let timeleft = document.getElementById("timeleft");

    var workspinner = $( "#workTime" ).spinner();
    var tworktime = workspinner.spinner( "value" );
    
    var stoptime = tworktime * 60 * 1000; // milliseconds
    var dEnd = new Date(dStart.getTime() + stoptime);
    console.log(tworktime, stoptime, dEnd);

    worktimer = setInterval(worker, 1000);
    function worker() {
    var dNow = Date.now();
      width = (dNow - dStart)/stoptime * 100;
      tleft = new Date(dEnd - dNow); 
      var mins = Math.floor(tleft / (1000 * 60));
      tleft -= mins * (1000 * 60);
      
      var seconds = Math.floor(tleft / (1000));
      tleft -= seconds * (1000);
      
      if (dNow >= dEnd) {
        clearInterval(worktimer);
        mins = 0;
        seconds = 0;
     
      
            var sound = document.getElementById("doneSound");
            sound.play();
    

      } else {

        if (width < 30){
            timeleft.style.color = "red";
        }
        else if (width < 60){
            timeleft.style.color = "orange";
        }
        else if (width < 100){
            timeleft.style.color = "#4DAF55";
        }
        timeleft.style.width = width + '%'; 
      }
      timeleft.innerHTML = mins + ":" + seconds;
    }
  }

function pauseWork(){
    clearInterval(worktimer);
}


function runWork() {
    console.log("move");
    var elem = document.getElementById("myBar");   
    var width = 0;
    var id = setInterval(frame, 1000);
    function frame() {
      if (width == 100) {
        clearInterval(id);
      } else {
        width++; 
        if (width < 30){
            elem.style.backgroundColor = "red";
        }
        else if (width < 60){
            elem.style.backgroundColor = "yellow";
        }
        else if (width < 100){
            elem.style.backgroundColor = "#4DAF55";
        }
        elem.style.width = width + '%'; 
      }
    }
  }

function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById("demo").innerHTML = t;
}

setInterval(myTimer, 1000);