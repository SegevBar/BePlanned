//code by sections:

//water code:
let state = false;
let interval;

function waterButton() {
  state = !state;
  
  let tag = document.getElementById("drinkWater");

  if (state) {
    let timealert = Number(prompt("How often do you want to be reminded to drink water? please write your answer in minutes:)"));
    timealert = timealert * 60 * 1000;
    interval = setInterval(alertFunc, timealert);
    
    let indication = document.createElement("span");
    indication.setAttribute("id", "indication");
    let indicationText = document.createElement("p");
    let text = document.createTextNode("Water Alert Active");
    indicationText.appendChild(text);
    indication.appendChild(indicationText);
    tag.appendChild(indication);
  }
  else {
    clearInterval(interval);
    let indication = document.getElementById("indication");
    indication.remove();
  }
}

function alertFunc() {
   alert("Remember to stay hydrated! Go grab a fresh cup of water!:)"); 
}


//reminders code:
function remainder() {
  
  let remainders = document.getElementById("remainders");
  console.log(remainders);
  let text = prompt("what reminder would you like to add");
  remainders.insertAdjacentHTML("beforeend" , "<li>" + text + "</li>");
    
  let  timeremainder = Number(prompt("when would you like to be remainded? please write your answer in minutes:)"));


  timeremainder = timeremainder * 60 * 1000;

let rim
  setTimeout(function(){ alert(remainders.innerHTML.substring(10, remainders.innerHTML.length - 5)); },  timeremainder);
}


//TDL code:
let counter = 0;

function addTask() {
  counter += 1;
  let task = prompt("type your task");
  let div = document.createElement("div");
  div.setAttribute("id", counter);

  let label = document.createElement("label");
  label.setAttribute("class", "container");

  let input = document.createElement("input");
  input.setAttribute("type", "checkbox");

  let del = document.createElement("button");
  let buttonText = document.createTextNode("x");
  del.appendChild(buttonText);
  del.setAttribute("onclick", "deleteTask("+counter+")");
  del.setAttribute("class", "x");

  let span = document.createElement("span");
  let text = document.createTextNode(task);
  span.appendChild(text);
  
  label.appendChild(input);
  label.appendChild(span);
  label.appendChild(del);
  div.appendChild(label);
  document.getElementById("TDL").appendChild(div); 
}

function deleteTask(taskID) {
  let task = document.getElementById(taskID);
  task.remove();
}


//phrases code:
function phrase_lottery(){

  let phrases = ["Never bend your head. Always hold it high. Look the world straight in the eye." , 
  "What you get by achieving your goals is not as important as what you become by achieving your goals." ,
  "When you have a dream, you've got to grab it and never let go." , 
  "Limit your 'always' and your 'nevers.'" , "Be a fruit loop in a world of chreeios."];

  let sentences = document.getElementById("sentences")
  sentences.remove()
  let phrases_2 = document.getElementById("phrases")
  phrases_2.insertAdjacentHTML ("beforeend" , "<div id=" + "sentences" + "></div>");
  index = (Math.floor(Math.random()*phrases.length));
  //console.log(index)
  let sentence = document.getElementById("sentences")
  sentence.insertAdjacentHTML ("beforeend" , "<p>" + phrases[index] + "</p>");
}

//timer code:
console.log("script loaded!")
var running = false;
var paused = false;
var currentSec = 0;
var currentMin = 0;
var currentWidth = 0;
var moveForward = null;
var progress = null;

// מה עושה הכפתור הראשי? האם מתחיל, עוצר או ממשיך
function click1(){
  console.log("button 1 clicked");
  var b = document.getElementById("button1");
  if (running) { // השעון כבר התחיל
    if (paused){ // השעון התחיל אבל נעצר
      continueTimer();
      b.textContent = "Stop";
      paused = false;
    }
    else{ // השעון התחיל ונעצר
      clearInterval(moveForward);
      clearInterval(progress);
      b.textContent = "Continue";
      paused = true;
    }
  }
  else { // השעון לא התחיל
    startTimer();
    b.textContent = "Stop";
    running = true;
  }
}

// תחילת ריצת הטיימר, מבקש מהמשתמשת שניות ודקות, ונתחיל להריץ
function startTimer(){
  var strSeconds = prompt(" How many seconds would you like to set the timer for?");
  var seconds = parseInt(strSeconds);
  var strMinutes = prompt(" How many minutes would you like to set the timer for?");
  var minutes = parseInt(strMinutes);
  
  running = true;
  changeNumbers(minutes, seconds);
  startBar(minutes, seconds);
}

// שינוי המספרים על גבי השעון, וכל שניה נוריד שניה בשעון
function changeNumbers(minutes, seconds){
  var time = document.getElementById("clock");
  currentSec = seconds;
  currentMin = minutes;

  function forward(){
    if ((currentMin == 0) && (currentSec == 0)){
      clearTimer();
      alert("Times up!");
    }
    else{
      time.textContent = currentMin + ":" + currentSec;
      currentSec--;
      if (currentSec == -1) {
        currentSec = 59;
        currentMin--;
      }
    }
  }
  moveForward = setInterval(forward, 1000)
}

// המשכת הטיימר מאיפה שעצרנו
function continueTimer(){
  changeNumbers(currentMin, currentSec);
  startBar(currentMin, currentSec);
}

// איפוס הטיימר
function clearTimer(){
  clearInterval(moveForward);
  running = false;
  var b = document.getElementById("button1");
  b.textContent = "Start";
  var time = document.getElementById("clock");
  time.textContent = "__:__";
  clearBar();
}

// איפוס חלון המראה את ההתקדמות
function clearBar(){
  var elem = document.getElementById("progressBar");
  var ctx = elem.getContext('2d');
  ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
  currentWidth = 0;
}

// תחילת ריצת החלון התקדמות, וכל 100 מילי שניות נתקדם מספר הפעמים שצריך, על פי מספר השניות שהתבקש
function startBar(minutes, seconds) {
  var elem = document.getElementById("progressBar");
  var ctx = elem.getContext('2d');

  var miliseconds = (60*minutes + seconds) * 1000;
  var factor = 500*100 / miliseconds;

  function frame() {
    if (currentWidth > ctx.canvas.width) {
      clearInterval(progress);
    }
    else {
      ctx.fillStyle = "#FABEBD";
      ctx.fillRect(0, 0, currentWidth, ctx.canvas.height);
      currentWidth = (currentWidth + factor);
    }
  }
  
  progress = setInterval(frame, 100); 
} 






