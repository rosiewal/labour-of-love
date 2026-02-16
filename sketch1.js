let w = 1920;
let h = 910;
let N = 40;
let positives = [1,-1,-1,1,1,-1,1,1]
let radii = [];

let c1Rands = [];
let c2Rands = [];

let pageNum = 3;
let totalPageNums = 3;
let heightScale = 1.8;
let answers;

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

let questionNumGlobal;

let shrinking = false;
let shrink_time = 0;
let shrink_time_max = 10000;

let endPageTimer = 0;
let timerChunk = 10;
let timerN = 4;


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
  resetAnswer();
  
}

function resetAnswer(){
  answers = [[],[[[0,0,0,0],[0,0,0,0]],[[""],true]],
                [[[""],true]],
                [[[0,0],[0,0]],[[""],true]]
              ];
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
  pageNumbers();

  noFill();
  stroke(0); 
  rect(w/2,h/2,w,h);
  
  if(pageNum == 0){
    homeScreen();
  }else if(pageNum == 1){
    page1();
  }else if(pageNum == 2){
    page2();
  }else if(pageNum == 3){
    page3();
  }else if(pageNum == 4){
    page4();
  }

  // if(dx>1){
  //   dx -= 0.02;
  // }
  

  first = false;
  
}

function pageNumbers(){
  textSize(20);
  let testH = h-185;
  if(pageNum>0&&pageNum<totalPageNums+1){
      stroke(255);
      fill(0);
      showText("page "+str(pageNum)+"/"+str(totalPageNums),w/2,testH);
  

  }

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
    ellipse(c2.x,c2.y,3);
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

  let yesButton = button("yes",w/2,h/2+100);

  if(yesButton){
    pageNum++;
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
  

  optionSelect(optionsX,optionsY,optionsText,0,false);
  
  showText("what's your favourite thing about the guild?",w/2,330,"question");
  inputTextBox(w/2,520,w/2,280,1);

  let backButton = button("back",w/4,h-200);
  if(backButton){
    pageNum--;
  }

  let nextButton = button("next",3*w/4,h-200);
  if(nextButton){
    pageNum++;
  }

}

function page2(){
  showText("is there anything you think we could improve?",w/2,200,"question")
  inputTextBox(w/2,390,w/2,280,0);

  let nextButton = button("next",3*w/4,h-200);
  if(nextButton){
    pageNum++;
  }


  let backButton = button("back",w/4,h-200);
  if(backButton){
    pageNum--;
  }

}


function page3(){

  showText("which of the following would you be interested in attending?",w/2,100,"question");

  let optionsText = ["workshops", "writing development group"];

  optionSelect(w/2,200,optionsText,0,true);

  showText("are there any other types of events you would",w/2,400,"question");
  showText("like to see from us?",w/2,440,"question");

  

  inputTextBox(w/2,540,w/2,100,1);

  // if(typeof(textInputReturn)=='boolean'){
  //   answers[pageNum][0][1] = textInputReturn;
  // }else if(typeof(textInputReturn)=='string'){
  //   answers[pageNum][0][0] = answers[pageNum][0][0] + textInputReturn;
  // }

  let nextButton = button("next",3*w/4,h-200);
  if(nextButton){
    pageNum++;
    endPageTimer = timerN*timerChunk;
  }

  

  let backButton = button("back",w/4,h-200);
  if(backButton){
    pageNum--;
  }

}

function page4(){
  if(endPageTimer<=(timerN)*timerChunk && endPageTimer>(timerN-1)*timerChunk){
    showText("thank you for your labour",w/2,h/2,"title");
    endPageTimer--;
  }else if(endPageTimer<=(timerN-1)*timerChunk && endPageTimer>(timerN-2)*timerChunk){
    showText("we hope it was for love",w/2,h/2,"title");
    endPageTimer--;
  }else if(endPageTimer<=(timerN-2)*timerChunk && endPageTimer>(timerN-3)*timerChunk){
    endPageTimer--;
  }else{
    saveAnswer();
    resetAnswer();
    pageNum = 0;
  } 
}

function saveAnswer(){
  //let table = new table([3]);
  let answersFlat = answers.flat(Infinity);
  

  answersFlat.splice(4,4);
  answersFlat.splice(10,2);
  answersFlat.splice(5,1);
  answersFlat.splice(6,1);
  answersFlat.splice(9,1);

  save(answersFlat, 'saved.txt');

  // for(let i=0; i<answersFlat.length; i++){
  //   table.set(0,i,answersFlat[i]);
  // }

  // console.log(table);


  console.log(answersFlat);

  


}



function button(buttonText,buttonX,buttonY){
  textSize(50);
  let buttonW = textWidth(buttonText)
  let buttonH = textWidth("O")*heightScale;
  
  textAlign(CENTER,CENTER);
  stroke(255);

  if(hoverOver(buttonX,buttonY,buttonW,buttonH,"word")){
    fill(255,0,0);
    text(buttonText,buttonX,buttonY);
    if(first){   
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

function hoverOver(buttonX,buttonY,buttonW,buttonH,type){
  if(type=="word" && mouseX>buttonX-buttonW/2 && mouseX<buttonX+buttonW/2 && mouseY>buttonY-buttonH/8 && mouseY<buttonY+buttonH/2){
    console.log("hover");
    return true;
  }else if(type=="text box" && mouseX>buttonX-buttonW/2 && mouseX<buttonX+buttonW/2 && mouseY>buttonY-buttonH/2 && mouseY<buttonY+buttonH/2){
    
    return true;
  }else{
    return false;
  }
}




function optionSelect(optionsX,optionsY,optionsText,questionNum,multipleSelect){
  let options = answers[pageNum][questionNum][0];
  let hover = answers[pageNum][questionNum][1];
  textSize(30);
  stroke(255);
  //console.log(hover);

  for(let i=0; i<options.length;i++){
    
    // if(hover[i] == 1){
    //   fill(255,0,0);
    // }else{
    //   fill(0);
    // }
    if(hover[i] && !options[i]){
      fill(200,0,0);
      //stroke(0,0,0);
      // strokeWeight(2);
      // line(optionsX+(i-(optionsText.length-1)/2)*(w/2)/optionsText.length-textWidth(optionsText[i])/2,optionsY+22,optionsX+(i-(optionsText.length-1)/2)*(w/2)/optionsText.length+textWidth(optionsText[i])/2,optionsY+22)
      // //rect(optionsX+(i-(optionsText.length-1)/2)*(w/2)/optionsText.length,optionsY,100,100)
      // strokeWeight(1);
    }else{
      fill(255*int(options[i]),0,0);
    }

    stroke(255);
    //fill(0);
    text(optionsText[i],optionsX+(i-(optionsText.length-1)/2)*(w/2)/optionsText.length,optionsY);

    let buttonX = optionsX+(i-(optionsText.length-1)/2)*(w/2)/optionsText.length;
    let buttonW = textWidth(optionsText[i])+10;
    let buttonH = textWidth("O")*heightScale;
    if(hoverOver(buttonX,optionsY,buttonW,buttonH,"word")){
      hover[i] = 1;
      if(mouseIsPressed && first){
        //console.log(first);
        if(multipleSelect){
          options[i] = !options[i];

        }else{
          options[i] = 1;
          for(let j=0; j<options.length; j++){
            if(j != i){
              options[j] = false;
            }
          }
        }
      }  
    }else{
      hover[i] = 0;
    }
  }

}





function inputTextBox(boxX,boxY,boxW,boxH,questionNum){
  let words = answers[pageNum][questionNum][0];
  let selected = answers[pageNum][questionNum][1];
  
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

  if(hoverOver(boxX,boxY,boxW,boxH,"text box") && mouseIsPressed){
    questionNumGlobal = questionNum;
    console.log("click");
    answers[pageNum][questionNum][1] = true;
    //return true;
  }else if(!hoverOver(boxX,boxY,boxW,boxH,"text box") && mouseIsPressed){
    
    answers[pageNum][questionNum][1] = false;
  }else if(selected){
    drawCursor(boxX,boxY,boxW,boxH,words,boxTextSize,boxLineHeight);
  }
}

function drawCursor(boxX,boxY,boxW,boxH,words,boxTextSize,boxLineHeight){
  textSize(boxTextSize);
  fill(0);
  stroke(0);
  strokeWeight(2);

  let lineHeight = textWidth("O")*1.75
  let cursorX = boxX-boxW/2+textWidth(words[words.length-1])+1;
  let cursorY = boxY-boxH/2+5+(words.length-1)*boxLineHeight;
  let timing = 1000;
  if(millis()%timing<timing/2){
    line(cursorX,cursorY,cursorX,cursorY+boxLineHeight);
  }
  
  strokeWeight(1);
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
  //if(pageNum == 1){
    let line = answers[pageNum][questionNumGlobal][0][answers[pageNum][questionNumGlobal][0].length-1];
    if(answers[pageNum][questionNumGlobal][1] && key.length==1){
      answers[pageNum][questionNumGlobal][0][answers[pageNum][questionNumGlobal][0].length-1] = line + key;
    }else if(key=="Backspace"){
      if(line == "" && answers[pageNum][questionNumGlobal][0].length>1){
        answers[pageNum][questionNumGlobal][0].pop();
      }else{
        answers[pageNum][questionNumGlobal][0][answers[pageNum][questionNumGlobal][0].length-1] = line.substring(0,line.length-1);
      }
      
    }else if(key=="Enter"){
      newLine(line,answers[pageNum][questionNumGlobal][0],0);
    }
//   }else if(pageNum == 2){
//     let line = answers[1][0][0][answers[1][0][0].length-1];
//     if(answers[1][0][1] && key.length==1){
//       answers[1][0][0][answers[1][0][0].length-1] = line + key;
//     }else if(key=="Backspace"){
//       if(line == "" && answers[1][0][0].length>1){
//         answers[1][0][0].pop();
//       }else{
//         answers[1][0][0][answers[1][0][0].length-1] = line.substring(0,line.length-1);
//       }
      
//     }else if(key=="Enter"){
//       newLine(line,answers[1][0][0],0);
//     }
//   }

}

