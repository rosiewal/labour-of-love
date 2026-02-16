let w = 1900;
let h = 900;
let N = 40;
let positives = [1,-1,-1,1,1,-1,1,1]
let radii = [];

let c1Rands = [];
let c2Rands = [];

let questionNum = 1;
let heightScale = 1.2;
let answers = [[[0,0,0,0],[[""],true]],
                [[[""],false]],
                [[[""],false]]
              ];

let input;

let click = false;
let first = false;

let radiiRandMin = 0;
let radiiRandMax = 0;

let cRandMin = -500;
let cRandMax = 500;

let angleRandMax;

let dx = 1;
let dy = 1;

let r_val = 20;
let R_val = 200;

let r = 20;
let R = 200;

let shrinking = false;
let shrink_time = 0;
let shrink_time_max = 10000;


function preload() {
  //font = loadFont('assets/game-paused-demo.regular.otf');
  //font = loadFont('assets/hydrogen-whiskey.regular.otf');
  font = loadFont('assets/videophreak.regular.ttf');
}

function setup() {
  createCanvas(w,h);
  console.log(displayWidth);
  console.log(displayHeight);

  background(255);
  angleRandMax = PI/2;

  textFont(font, 300);
  rectMode(CENTER);
  textAlign(CENTER,CENTER);

  //input = createInput('');
  randomise();
  frameRate(30);
  
}



function draw(){
  //background(255);

  //console.log(click);
  

  let rand = random();

  // if(mouseIsPressed){
  //   console.log("*")
  //   for(let i=0; i<8; i++){
  //     randInt = floor(random()*2);
  //     if(randInt == 0){
  //       positives[i] = -1;
  //     }else{
  //       positives[i] = 1;
  //     }
      
  //   }
  //   background(255);
  //   drawBlob(r,R);
  // }
  dx = map(mouseX,0,w,0,2*PI);
  dy = map(mouseY,0,h,0,2*PI);

  radiiRandMin = map(mouseY,0,h,0,10);
  radiiRandMax = map(mouseX,0,w,0,10);

  
  


  
  background(255);
  drawBlob(r,R);
  
  if(questionNum == 0){
    homeScreen();
  }else if(questionNum == 1){
    page1();
  }else if(questionNum == 2){
    page2();
  }else if(questionNum == 3){
    page3();
  }
  // if(dx>1){
  //   dx -= 0.02;
  // }
  

  first = false;
}

function drawBlob(r,R){
  stroke(0);
  
  let x = w/2;
  let y = h/2;
  let midR = r+(R-r)/2;

  
  
  randomSeed(millis());
  
  for(let i=0; i<N; i++){
    let a = i*(2*PI/N)+dx+map(((millis()/100)%300),0,300,0,2*PI);
    let b = i*(2*PI/N)+dy+map(((millis()/100)%300),0,300,0,2*PI);
    //console.log(a/(2*PI));
    let c1;
    let c2;
    let midR1 = midR*radii[i];
    let midR2 = midR*radii[(i+1)%N];
    
    
    // let p1 = createVector(x+midR1*sin(a+radii[i]%angleRandMax),y+midR1*cos(a+radii[i]%angleRandMax));
    // let p2 = createVector(x+midR2*sin(a+2*PI/N+radii[(i+1)%N]%angleRandMax),y+midR2*cos(a+2*PI/N+radii[(i+1)%N]%angleRandMax));

    let p1 = createVector(x+midR1*sin(a),y+midR1*cos(a));
    let p2 = createVector(x+midR2*sin(a+2*PI/N),y+midR2*cos(a+2*PI/N));    
    
   
    if((i%2)==0){
      rad = R;
    }else{
      rad = r;
    }

    
    //c1Rand = random(cRandMin,cRandMax);
    //c2Rand = random(cRandMin,cRandMax);
    //console.log(c1Rand);

    c1 = createVector(x-rad*sin(a)-c1Rands[i],y+rad*cos(b)-c1Rands[i]);
    c2 = createVector(x-rad*sin(b+2*PI/N)+c2Rands[i],y+rad*cos(a+2*PI/N)-c2Rands[i]);


    //c2 = createVector(x+positives[2]*(1+c2Rand)*r2*sin(a+2*PI/N+random(0,angleRandMax)),y+positives[3]*c2Rand*r2*cos(a+2*PI/N));
    //   c1 = createVector(x+positives[0]*(1+c1Rand)*r1*sin(a+random(0,angleRandMax)),y+positives[1]*c1Rand*r1*cos(a+angleRandMax));
    //   c2 = createVector(x+positives[2]*(1+c2Rand)*r2*sin(a+2*PI/N+random(0,angleRandMax)),y+positives[3]*c2Rand*r2*cos(a+2*PI/N));
    // }else{
    //   c1Rand = random(cRandMin,cRandMax);
    //   c2Rand = random(cRandMin,cRandMax);
    //   c1 = createVector(x+positives[4]*c1Rand*R1*sin(a+random(0,PI/6)),y+positives[5]*c1Rand*R1*cos(a));
    //   c2 = createVector(x+positives[6]*c2Rand*R2*sin(a+2*PI/N+random(0,PI/6)),y+positives[7]*c2Rand*R2*cos(a+2*PI/N));
    // }
    
    fill(0);
    ellipse(c1.x,c1.y,5);
    ellipse(c2.x,c2.y,5);
    noFill();

    

    

    bezier(p1.x,p1.y,c1.x,c1.y,c2.x,c2.y,p2.x,p2.y);
    // console.log("p1");
    // console.log(p1.x);
    // console.log(p1.y);
    // console.log("p2");
    // console.log(p2.x);
    // console.log(p2.y);
    
    
  }
  
}



function randomise(){
    //radiiRandMax += 0.1;
    randomSeed(millis());
    

    console.log("SPace")
    for(let i=0; i<N; i++){
      radii[i] = random(radiiRandMin,radiiRandMax);
      c1Rands[i] = random(cRandMin,cRandMax);
      c2Rands[i] = random(cRandMin,cRandMax);
     }
    for(let i=0; i<8; i++){
      randInt = floor(random()*2);
      if(randInt == 0){
        positives[i] = -1;
      }else{
        positives[i] = 1;
      }
      
    }
    background(255);
    drawBlob(r,R);
}

function showText(textText,textX,textY,type){
  fill(0);
  stroke(255);
  
  if(type == "title"){
    textSize(70);
    strokeWeight(2);
  }else if(type == "question"){
    strokeWeight(5);
    textSize(40);
  }
  text(textText,textX,textY);
  strokeWeight(1);
  
}


function homeScreen(){
  
  
  showText("will you labour for our love?",w/2,h/2,"title");
  
  // let buttonText = "yes";
  // let buttonX = w/2;
  // let buttonY = h/2+100;
  // let buttonW = textWidth(buttonText)
  // let buttonH = textWidth("O")*heightScale;

  let yesButton = button("yes",w/2,h/2+100);

  if(yesButton){
    questionNum++;
  }
  

  // if(hoverOver(buttonX,buttonY,buttonW,buttonH)){
  //   fill(255,0,0);
  //   if(mouseIsPressed){
      
  //   }
  // }else{
  //     fill(0);
  // }
  // textSize(50);
  // text(buttonText,buttonX,buttonY);
}





function page1(){
  
  showText("how many guild meetings have you attended?",w/2,100,"question");
  let optionsText = ["1","2","3","4+"];
  let optionsX = w/2;
  let optionsY = 200;
  textSize(30);

  optionSelect(optionsX,optionsY,answers[0][0],optionsText);
  
  showText("what's your favourite thing about the guild?",w/2,400,"question");
  textInputReturn = inputTextBox(w/2,520,w/2,100,answers[0][1][0],answers[0][1][1]);

  if(typeof(textInputReturn)=='boolean'){
    answers[0][1][1] = textInputReturn;
  }else if(typeof(textInputReturn)=='string'){
    console.log("hello")
    answers[0][1][0] = answers[0][1][0] + textInputReturn;
  }



  let nextButton = button("next",3*w/4,h-200);
  if(nextButton){
    questionNum++;
  }


  

}

function page2(){
  showText("is there anything we could improve?")

  let nextButton = button("next",3*w/4,h-200);
  if(nextButton){
    questionNum++;
  }

  

  let backButton = button("back",w/4,h-200);
  if(backButton){
    questionNum--;
  }

}


function page3(){

  showText("what else would you be interested in seeing from us?",w/2,100,"question");
  textInputReturn = inputTextBox(w/2,520,w/2,100,answers[1][0][0],answers[1][0][1]);

  if(typeof(textInputReturn)=='boolean'){
    answers[questionNum][0][1] = textInputReturn;
  }else if(typeof(textInputReturn)=='string'){

    answers[questionNum][0][0] = answers[1][0][0] + textInputReturn;
  }

  let nextButton = button("next",3*w/4,h-200);
  if(nextButton){
    questionNum++;
  }

  

  let backButton = button("back",w/4,h-200);
  if(backButton){
    questionNum--;
  }

}



function button(buttonText,buttonX,buttonY){
  textSize(50);
  let buttonW = textWidth(buttonText)
  let buttonH = textWidth("O")*2;
  
  textAlign(CENTER,CENTER);
  stroke(255);

  if(hoverOver(buttonX,buttonY,buttonW,buttonH)){
    fill(255,0,0);
    text(buttonText,buttonX,buttonY);
    if(first){
      console.log(first)
    
      if(mouseIsPressed){
        return true;
      }
    }
  }else{
      fill(0);
      text(buttonText,buttonX,buttonY);
      return false;
  }


}

function hoverOver(buttonX,buttonY,buttonW,buttonH){
  if(mouseX>buttonX-buttonW/2 && mouseX<buttonX+buttonW/2 && mouseY>buttonY-buttonH/8 && mouseY<buttonY+buttonH/2){
    return true;
  }else{
    return false;
  }
}

function optionSelect(optionsX,optionsY,options,optionsText){
  fill(255);
  stroke(0);
  //rect(optionsX,optionsY,w/2,100)
  for(let i=0; i<options.length;i++){
    fill(255*answers[0][0][i],0,0);
    text(optionsText[i],optionsX+(i-(optionsText.length-1)/2)*(w/2)/optionsText.length,optionsY);
    let buttonX = optionsX+(i-(optionsText.length-1)/2)*(w/2)/optionsText.length;
    let buttonW = textWidth(optionsText[i])+10;
    let buttonH = textWidth(optionsText[i])*heightScale;
    if(hoverOver(buttonX,optionsY,buttonW,buttonH)){
      console.log(optionsText[i]);
      if(mouseIsPressed){
        options[i] = 1;
        for(let j=0; j<options.length; j++){
          if(j != i){
            options[j] = 0;
          }
        }
      }
    }
  }

}





function inputTextBox(boxX,boxY,boxW,boxH,words,selected){
  
  
  fill(255);
  stroke(0);
  textAlign(LEFT,TOP);
  strokeWeight(2);
  rect(boxX,boxY,boxW+20,boxH);
  strokeWeight(1);
  
  fill(0);
  stroke(255);
  let boxTextSize = 25;
  let boxLineHeight = 30; 
  textSize(boxTextSize);

  wrapText(words,boxW);
  for(let i=0; i<words.length; i++){
    text(words[i],boxX-boxW/2,boxY-boxH/2+5+boxLineHeight*i);
  }
  textAlign(CENTER,CENTER);

  if(hoverOver(boxX,boxY,boxW,boxH) && mouseIsPressed){
    return true;
  }else if(!hoverOver(boxX,boxY,boxW,boxH) && mouseIsPressed){
    return false;
  }else if(selected){
    drawCursor(boxX,boxY,boxW,boxH,words,boxTextSize,boxLineHeight);
  }
  console.log(selected);
  return selected;
}

function drawCursor(boxX,boxY,boxW,boxH,words,boxTextSize,boxLineHeight){
  textSize(boxTextSize);
  fill(0);
  stroke(0);
  //strokeWeight(1);

  let lineHeight = textWidth("O")*1.75
  let cursorX = boxX-boxW/2+textWidth(words[words.length-1])+1;
  let cursorY = boxY-boxH/2+5+(words.length-1)*boxLineHeight;
  let timing = 1000;
  if(millis()%timing<timing/2){
    line(cursorX,cursorY,cursorX,cursorY+boxLineHeight);
  }
  
  //strokeWeight(1);
}

function homeScreenHover(){
  fill(0);
  stroke(255);
  textSize(70);
  text("will you labour for our love?",w/2,h/2);
  fill(255,0,0);
  stroke(255);
  textSize(50);
  text("yes",w/2,h/2+100);
  
}

function wrapText(words,boxW){  
  let step = 0;
  let line = words[words.length-1];
  if(textWidth(line)>boxW){
    while(line[line.length-step] != " " && step<10){
      step+=1;
    }

    newLine(line,words,step);
  }

}

function newLine(line,words,step){
    let lineSplit1 = line.substring(0,line.length-step+1);
    let lineSplit2 = line.substring(line.length-step+1 ,line.length);

    words[words.length-1] = lineSplit1;
    words.push(lineSplit2);
}



function newUser(){
  let myWriter = createWriter('mauna_loa_co2', 'csv');

}
// function askQuestions(){

// }

function repaint() {
  background(255);
  let msg = input.value();
  text(msg, 500, 500);
  console.log(keyCode);
  if(keyIsPressed && keyCode == ENTER){
    saveAnswer(msg);
  }

}

function saveAnswer(msg){
  //myWriter.print(msg);
  console.log(msg);
}

// Save the file when the user double-clicks.
function doubleClicked() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    // Create a p5.PrintWriter object.
    // Use the file format .csv.
    

    // Add some lines to the print stream.
    myWriter.print('date,ppm_co2');
    myWriter.print('1960-01-01,316.43');
    myWriter.print('1970-01-01,325.06');
    myWriter.print('1980-01-01,337.9');
    myWriter.print('1990-01-01,353.86');
    myWriter.print('2000-01-01,369.45');
    myWriter.print('2020-01-01,413.61');

    // Save the file and close the print stream.
    myWriter.close();
  }
}

function mousePressed(){
  if(!click){
    first = true;
  }else{
    first = false;
  }
  
  click = true;
}

function mouseReleased(){
  click = false;
  first = false;
}



function keyPressed(){
  if(questionNum == 1){
    let line = answers[0][1][0][answers[0][1][0].length-1];
    if(answers[0][1][1] && key.length==1){
      answers[0][1][0][answers[0][1][0].length-1] = line + key;
    }else if(key=="Backspace"){
      if(line == "" && answers[0][1][0].length>1){
        answers[0][1][0].pop();
      }else{
        answers[0][1][0][answers[0][1][0].length-1] = line.substring(0,line.length-1);
      }
      
    }else if(key=="Enter"){
      newLine(line,answers[0][1][0],0);
    }
  }else if(questionNum == 2){
    let line = answers[1][0][0][answers[1][0][0].length-1];
    if(answers[1][0][1] && key.length==1){
      answers[1][0][0][answers[1][0][0].length-1] = line + key;
    }else if(key=="Backspace"){
      if(line == "" && answers[1][0][0].length>1){
        answers[1][0][0].pop();
      }else{
        answers[1][0][0][answers[1][0][0].length-1] = line.substring(0,line.length-1);
      }
      
    }else if(key=="Enter"){
      newLine(line,answers[1][0][0],0);
    }
  }

}

