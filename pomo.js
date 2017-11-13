var worktimer;
var breaktimer;
var looptimer;

var paused = false;
var looping = true;

var saveEndWork = null;
var saveStartWork = null;
var pauseTime = null;

let tbreak = document.getElementById("breakTime");

function startWork() {
    //console.log("work");
    var dStart = new Date(Date.now());
    if(saveStartWork != null){
        dStart = saveStartWork;
    }
    saveStartWork = dStart;
    //console.log(dStart);
    let timeleft = document.getElementById("timeleft");
    var prog = document.getElementById("progBar");   
    var workspinner = $( "#workTime" ).spinner();
    var tworktime = workspinner.spinner( "value" );
    
    var stoptime = tworktime * 60 * 1000; // milliseconds
    var dEnd = new Date(dStart.getTime() + stoptime);
    if(saveEndWork != null){
        dEnd = saveEndWork;
    }
    saveEndWork = dEnd;
    //console.log(tworktime, stoptime, dEnd);
    startbtn.innerHTML = "Working";
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
        startbtn.innerHTML = "Start Work";
     
        startBreak();
      } else {

        if (width < 30){
            timeleft.style.color = "brown";
            prog.style.backgroundColor = "brown";
        }
        else if (width < 60){
            timeleft.style.color = "orange";
            prog.style.backgroundColor = "orange";
        }
        else if (width < 100){
            timeleft.style.color = "#4DAF55";
            prog.style.backgroundColor = "#4DAF55";
        }
        //timeleft.style.width = width + '%'; 
        prog.style.width = width + '%';
      
      }
      if (seconds < 10){
          seconds = "0" + seconds;
      }
      if (mins < 10){
        mins = "0" + mins;
    }
      timeleft.innerHTML = mins + ":" + seconds;
    }
  }

  function startBreak() {
    //console.log("break");
    var dStart = new Date(Date.now());
    //console.log(dStart);
    let timeleft = document.getElementById("btimeleft");
    var progb = document.getElementById("bprogBar");   
    var breakspinner = $( "#breakTime" ).spinner();
    var tbreaktime = breakspinner.spinner( "value" );
    startbtn.innerHTML = "Break!";
    var stoptime = tbreaktime * 60 * 1000; // milliseconds
    var dEnd = new Date(dStart.getTime() + stoptime);
    //console.log(tbreaktime, stoptime, dEnd);

    breaktimer = setInterval(breaker, 1000);
    function breaker() {
    var dNow = Date.now();
      width = (dNow - dStart)/stoptime * 100;
      tleft = new Date(dEnd - dNow); 
      var mins = Math.floor(tleft / (1000 * 60));
      tleft -= mins * (1000 * 60);
      
      var seconds = Math.floor(tleft / (1000));
      tleft -= seconds * (1000);
      
      if (dNow >= dEnd) {
        clearInterval(breaktimer);
        mins = 0;
        seconds = 0;
        var sound = document.getElementById("doneSound");
        sound.play();
      

      } else {
        progb.style.width = width + '%';
      }
      if (seconds < 10){
          seconds = "0" + seconds;
      }
      if (mins < 10){
        mins = "0" + mins;
    }
      timeleft.innerHTML = mins + ":" + seconds;
    }
  }

  function work(){
    var breaksp = $( "#breakTime" ).spinner();
    var breakt = breaksp.spinner( "value" );
    var worksp = $( "#workTime" ).spinner();
    var workt = worksp.spinner( "value" );
    var totaltime = (breakt + workt) * 60 * 1000;
    console.log("work");
    startWork();
    looptimer = setInterval(function() {
        reset();
        startWork();
      }, totaltime + 2000); // add time for sounds
  }

function pauseWork(){
    if(!paused){
        clearInterval(worktimer);
        paused = true;
    }
    else{
        //use pause time to adjust start & end times
        paused = false;
        startWork();
      
    }
    
}
function reset(){
    clearInterval(worktimer);
    clearInterval(breaktimer);
    document.getElementById("progBar").style.width = "10px";  
    document.getElementById("bprogBar").style.width = "10px"; 
    document.getElementById("timeleft").innerHTML = "";
    document.getElementById("btimeleft").innerHTML = ""; 
    saveEndWork = null;
    saveStartWork = null;
    startbtn.innerHTML = "Start Work";
 
}



