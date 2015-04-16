var mycanves = document.getElementById("maincanvus");
var mycontext = mycanves.getContext('2d');



var W = $("#maincanvus").width(), H = $("#maincanvus").height();

var STAGE = 0;

var totalscore = 0;


//  Add 5 seconds to actual time .... for animation
var STAGES = [
    { "balls": "3", "target": "200", "time": "25000" },
    { "balls": "4", "target": "200", "time": "35000" },
    { "balls": "5", "target": "200", "time": "45000" },
    { "balls": "6", "target": "200", "time": "55000" },
    { "balls": "7", "target": "200", "time": "65000" },
    { "balls": "8", "target": "200", "time": "75000" },
    
]

var countscore = [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; //score up to 12 bubbles


var timertime = (parseInt(STAGES[0].time))/1000;
//var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;
var BLOCK_W = 30, BLOCK_H = 30;
var COLS = Math.round(W / BLOCK_W), ROWS = Math.round(H / BLOCK_H);

/*
var colors = [
    'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];
*/
//dark
var colors = [
        { color: ['#CC99CC', '#AD5CAD', '#993399', '#2E0F2E'] },
    { color: ['#FFC', '#FF0', '#FF0', '#660'] },
    { color: ['#99FF99', '#4DFF4D', '#4DFF4D', '#006600'] },
    { color: ['#9999FF', '#4747FF', '#3333FF', '#1A1A80'] },
    { color: ['#CCCCB2', '#A3A375', '#999966', '#3D3D29'] },

    { color: ['#FFD699', '#FFA319', '#FF9900', '#804C00'] },
    { color: ['#fcc', '#f69', '#f06', '#903'] }
];




var scores = [
    1, 2, 3, 4, 5, 6, 7];

//menu
var MENUBG = ".images/start.png";
var MENUSTATUS = 1;


var startimagex;
var startimagey;

var bubbles = [];
var menububbles = [];

//catches matching bubble
var blastbubble = [];

//index of matching bubble

var bubbleindex = -1;

//reanimate one blasted

var animatedblasted = [];



document.getElementById('theme').play()

function Bubble(x,y) {
    this.x = BLOCK_W * x;
    this.y = BLOCK_H * y;
    this.color = Math.floor((Math.random() * parseInt(STAGES[STAGE].balls)));
    this.xindex = x;
    this.yindex = y;
    this.blast = 0;

}

var srcImg = document.getElementById("img1");
var startImg = document.getElementById("start");
//mycontext.drawImage(srcImg, 0, 0);
//mycontext.drawImage(srcImg, 0, 0, W, H);
//mycontext.drawImage(startImg, W / 2 - 50, H / 2 - 50, 100, 100);


 function menuBubble() {
    this.x = Math.floor((Math.random() * W)) - BLOCK_W;
    this.y = -10;
    this.color = Math.floor((Math.random() * parseInt(STAGES[STAGE].balls)));
    this.speed = Math.round(Math.random() * 7) + 1;
    this.blast = 0;

}

for (var y = 0; y < 8; ++y) {
    // drawBlock(x, y);
    menububbles[y] = new menuBubble();

}

//menuscreen
menutimer = setInterval(menuscreen, 20);

var menusize = 0;
function menuscreen() {
    $("#divgame").hide();
     var dimension;
    if (menusize == H) { menusize = 0 }
    menusize++;
  //  menusize = Math.floor((Math.random() * W));
    dimension = 100 + menusize;
    // mycontext.drawImage(srcImg, 0, 0, W, H);
    mycontext.clearRect(0, 0, W, H);
    startimagey = H - 100 - menusize;
    mycontext.drawImage(startImg, W/2-50, H - 100 - menusize, 100, 100);
    startimagex = W / 2 - 50;
    

    //update the bubble
    for (var i = 0; i < menububbles.length; i++) {
        if (menububbles[i].y < H) {
            menububbles[i].y += menububbles[i].speed;
            if (menububbles[i].y > H - BLOCK_H / 2) {
                menububbles[i].y = -5;
                menububbles[i].x = Math.floor((Math.random() * W));
            }
            if (menububbles[i].x > W)
                menububbles[i].x = 0;
        }
    }
   
   

  
    for (var y = 0; y < menububbles.length; y++) {
        // drawBlock(x, y);
        var radGrd = mycontext.createRadialGradient(menububbles[y].x-5, menububbles[y].y-5, 5, menububbles[y].x-5, menububbles[y].y-5, BLOCK_W / 2);
        radGrd.addColorStop(0, colors[menububbles[y].color].color[0]); // start with red at 0
        radGrd.addColorStop(0.4, colors[menububbles[y].color].color[1]); // finish with green
        radGrd.addColorStop(0.6, colors[menububbles[y].color].color[2]); // finish with green
        radGrd.addColorStop(1, colors[menububbles[y].color].color[3]); // finish with green
        
        mycontext.fillStyle = radGrd;

        mycontext.beginPath();
        mycontext.arc(menububbles[y].x,menububbles[y].y , BLOCK_W / 2, 0, 2 * Math.PI);
        mycontext.stroke();
        mycontext.fill();
}
 //   mycontext.arc(W - BLOCK_W,menusize*3, BLOCK_W / 2, 0, 2 * Math.PI);
    
}



var clearother = Math.round(ROWS) * BLOCK_H;
var dropx = ROWS;
var dropy = 0;

function addbubble() {
    if (MENUSTATUS == 1) { return;}
    //mycontext.strokeStyle = 'black';
    
    y = dropy;
    if (clearother < BLOCK_H) { clearInterval(bubbletimer); $("#divgame").show();return; }
    if (y >= Math.round(clearother / BLOCK_H)) {
        clearother = clearother - BLOCK_H;
        dropy = 0;
        
        return;
    }

   
   // for (var x = 0; x < COLS; ++x) { 
    mycontext.clearRect(0, 0, W, clearother);
  
        for (var x = 0; x < COLS; x++) {
            // sleep(1000);
           // mycontext.fillStyle = colors[bubbles[x][y].color];
           // mycontext.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
           // mycontext.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
            var radGrd = mycontext.createRadialGradient(bubbles[x][y].x, bubbles[x][y].y, 5, bubbles[x][y].x-5, bubbles[x][y].y, BLOCK_W+4);
            radGrd.addColorStop(0, colors[bubbles[x][y].color].color[0]); // start with red at 0
            radGrd.addColorStop(0.4, colors[bubbles[x][y].color].color[1]); // finish with green
            radGrd.addColorStop(0.6, colors[bubbles[x][y].color].color[2]); // finish with green
            radGrd.addColorStop(1, colors[bubbles[x][y].color].color[3]); // finish with green
            mycontext.fillStyle = radGrd;

            mycontext.beginPath();
            mycontext.arc(BLOCK_W * x + BLOCK_W / 2, BLOCK_H * y + BLOCK_W / 2, BLOCK_W / 2, 0, 2 * Math.PI);
            mycontext.stroke();
            mycontext.fill();
        }
    //}
        dropy = dropy + 1;

}




function drawBlock() {

    for (var x = 0; x < COLS; ++x) {
        var bubblerow = [];
        animatedblasted[x] = -1;
        for (var y = 0; y < ROWS; ++y) {
            // drawBlock(x, y);
            bubblerow[y] = new Bubble(x, y);
           
        }
        bubbles[x] = bubblerow;
    }

/*
    mycontext.strokeStyle = 'black';
    for (var x = 0; x < COLS; ++x) {
        for (var y = 0; y < ROWS; ++y) {
           // sleep(1000);
            mycontext.fillStyle = colors[bubbles[x][y].color];
            mycontext.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
            mycontext.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
            var radGrd = mycontext.createRadialGradient(30, 30, 5, 35, 35, BLOCK_W / 2);
            radGrd.addColorStop(0, "#0f5"); // start with red at 0
            radGrd.addColorStop(1, "#0f0"); // finish with green
            mycontext.fillStyle = radGrd;

            mycontext.beginPath();
            mycontext.arc(BLOCK_W * x + BLOCK_W / 2, BLOCK_H * y + BLOCK_W / 2, BLOCK_W / 2, 0, 2 * Math.PI);
            mycontext.stroke();
            mycontext.fill();
        }
    }*/
   // var srcImg = document.getElementById("img1");
   // mycontext.drawImage(srcImg, 0, 0);
    //createRadialGradient(x0, y0, r0, x1, y1, r1)


}

$("#maincanvus").click(function (e) {
    
    bubbleindex = -1;
    blastbubble = [];
    var offset = mycanves.getBoundingClientRect();
    var xindex=Math.floor((e.pageX - offset.left));
    var yindex = Math.floor((e.pageY - offset.top));
    if (MENUSTATUS == 1) {
        if (xindex >= startimagex && xindex <= startimagex + 100 && yindex >= startimagey && yindex <= startimagey + 100) {
            MENUSTATUS = 0;
            clearInterval(menutimer);
            drawBlock();
            bubbletimer = setInterval(addbubble, 40);
            gametimer = setInterval(changetimer, 1000);
            checklevel = setInterval(checkstage, parseInt(STAGES[STAGE].time));
            $("#txtTarget").text("Target: " + STAGES[STAGE].target);
            bubbletimer = setInterval(addbubble, 40);
            return;
        }
        return;
    }
    else {

        
    }

    if (clearother > 0) {

        return;
    }
    for (var x = 0; x < COLS; ++x) 
        animatedblasted[x] = -1;

    var offset=mycanves.getBoundingClientRect();
    var x = Math.floor((e.pageX - offset.left) / BLOCK_W);
    var y = Math.floor((e.pageY - offset.top) / BLOCK_H);
   // mycontext.fillStyle = "rgb(255,255,255)";
   // mycontext.fillRect(x * BLOCK_W, y * BLOCK_H, BLOCK_W, BLOCK_H);
    checkforclickedblock(x, y);
    if (blastbubble.length >=3) {
       // document.getElementById('blast').play();
        blastbubbles(bubbles[x][y].color);
        animateafterblast();
    }
});

function changetimer() {
    timertime--;
    $("#txtTime").text("Time: " + timertime);

}

function checkstage() {

    if (STAGE !=4) {
        if (totalscore >= parseInt(STAGES[STAGE].target)) {
            // next stage
            alert("Congrats  from TekEdge. you cleared this level");
            totalscore = 0;
            STAGE++;
            drawBlock();
            clearother = Math.round(ROWS) * BLOCK_H;
            dropx = ROWS;
            dropy = 0;
            clearInterval(bubbletimer);
            bubbletimer = setInterval(addbubble, 40);
            clearInterval(checklevel);
            timertime = parseInt(STAGES[STAGE].time)/1000;
            checklevel = setInterval(checkstage, parseInt(STAGES[STAGE].time));
            $("#txtLevel").text("Level: " + STAGE);
            $("#txtScore").text("Score: " + totalscore);
            $("#txtTarget").text("Target: " + STAGES[STAGE].target);
            //  checklevel = setInterval(checkstage, 60000);

        } else {

            alert("Game over");
            STAGE = 0;
            clearInterval(checklevel);
            menutimer = setInterval(menuscreen, 20);
            timertime = parseInt(STAGES[STAGE].time) / 1000;
            MENUSTATUS = 1;
            menusize = 0;
            clearInterval(bubbletimer);
            clearother = Math.round(ROWS) * BLOCK_H;
            dropx = ROWS;
            dropy = 0;
        }

    } else {

        alert("Congrats you have completed all the levels");
        STAGE = 0;
        clearInterval(checklevel);
        menutimer = setInterval(menuscreen, 20);
        timertime = parseInt(STAGES[STAGE].time) / 1000;
        MENUSTATUS = 1;
        menusize = 0;
        clearInterval(bubbletimer);
        clearother = Math.round(ROWS) * BLOCK_H;
        dropx = ROWS;
        dropy = 0;
        clearInterval(gametimer);

    }
    totalscore = 0;
   /* if (STAGE == STAGES) {


    }*/
}
//check for the clicked block 

function checkforclickedblock(x, y) {
    if (bubbles[x][y].blast == -1)
        return;

    // alert(JSON.stringify(bubbles[x][y]));
    blastbubble[++bubbleindex] = bubbles[x][y];
   
    var colorcode = bubbles[x][y].color;

    if (animatedblasted[x] < y)
        animatedblasted[x] = y;

    bubbles[x][y].blast = -1;
    x = bubbles[x][y].xindex;
    y = bubbles[x][y].yindex;
    checkifcolormatches(x + 1, y, colorcode);
    checkifcolormatches(x , y+1, colorcode);
    checkifcolormatches(x - 1, y, colorcode);
    checkifcolormatches(x, y - 1, colorcode);

 //   checkifcolormatches(x - 1, y - 1, colors[colorcode]);
   // checkifcolormatches(x - 1, y + 1, colors[colorcode]);
   // checkifcolormatches(x + 1, y - 1, colors[colorcode]);
   // checkifcolormatches(x + 1, y + 1, colors[colorcode]);


}
function checkifcolormatches(x, y, color) {
    
    if (x + 1 >COLS  || y + 1 > ROWS || x<0 ||y<0) {
        return;
    }
    if (bubbles[x][y].blast == -1)
        return;

    if (bubbles[x][y].color == color) {
        blastbubble[++bubbleindex] = bubbles[x][y];
       // mycontext.fillStyle = "rgb(255,255,255)";
       // mycontext.fillRect(x * BLOCK_W, y * BLOCK_H, BLOCK_W, BLOCK_H);
        bubbles[x][y].blast = -1;
        if (animatedblasted[x] < y) 
            animatedblasted[x] = y;
        checkifcolormatches(x + 1, y, color);
        checkifcolormatches(x, y + 1, color);
        checkifcolormatches(x - 1, y, color);
        checkifcolormatches(x, y - 1, color);



       // checkifcolormatches(x - 1, y - 1, color);
       // checkifcolormatches(x - 1, y + 1, color);
       // checkifcolormatches(x + 1, y - 1, color);
       // checkifcolormatches(x + 1, y + 1, color);

        

    } else {
        return;
    }


}

function blastbubbles(colorcode) {
    var count = 0;
    for (var x = 0; x < COLS; ++x) {         
        for (var y = 0; y < ROWS; ++y) {
            // drawBlock(x, y);
            if (bubbles[x][y].blast == -1) {
                count++;
                changecolor(x, y)
                bubbles[x][y].blast = 1;
              
               // bubbles[x][y] == bubbles[x][y]
            }

        }
       
    }
    calculatescore(count, colorcode);

   /*
   
    for (var i = 0; i < blastbubble.length ; i++) {

        changecolor(blastbubble[i].xindex, blastbubble[i].yindex);
      //  mycontext.fillRect(blastbubble[i].xindex * BLOCK_W, blastbubble[i].yindex * BLOCK_H, BLOCK_W, BLOCK_H);
        //mycontext.clearRect(blastbubble[i].xindex * BLOCK_W, 0, BLOCK_W, BLOCK_H * y);
    }*/
}
function calculatescore(count, colorcode) {


    ballscore = scores[colorcode];

    var countblast;
    if (count < countscore.length) {
        countblast=countscore[count];
        }else{
        countblast = countscore[countscore.length-1];
        }

        ;
        totalscore = totalscore + ballscore * count + countblast
    $("#txtScore").text("Score :" + totalscore );


}

function changecolor(x, y) {

    for (var i = y; i != 0; i--) {
        bubbles[x][i].color = bubbles[x][i - 1].color;
    }
    bubbles[x][0].color = Math.floor((Math.random() * parseInt(STAGES[STAGE].balls)));
}

    function animateafterblast() {
        mycontext.fillStyle = "rgb(255,255,255)";
        for (var i=0; i < animatedblasted.length; i++) {
            if (animatedblasted[i] != -1)             
            dropafterblast(bubbles[i][animatedblasted[i]]);
        }
        document.getElementById('blast').pause()
    }

    function dropafterblast(bubble) {
        for (var i = 0; i < BLOCK_H; i++) {
            for (var j = 0; j <= bubble.yindex; j++) {
                mycontext.fillStyle = colors[bubbles[bubble.xindex][j].color];
                var radGrd = mycontext.createRadialGradient(bubbles[bubble.xindex][j].x, bubbles[bubble.xindex][j].y, 5, bubbles[bubble.xindex][j].x, bubbles[bubble.xindex][j].y, BLOCK_W+4);
                radGrd.addColorStop(0, colors[bubbles[bubble.xindex][j].color].color[0]); // start with red at 0
                radGrd.addColorStop(0.4, colors[bubbles[bubble.xindex][j].color].color[1]); // finish with green
                radGrd.addColorStop(0.6, colors[bubbles[bubble.xindex][j].color].color[2]); // finish with green
                radGrd.addColorStop(1, colors[bubbles[bubble.xindex][j].color].color[3]); // finish with green
                mycontext.fillStyle = radGrd;

                mycontext.beginPath();
                mycontext.arc(BLOCK_W * bubble.xindex + BLOCK_W / 2, BLOCK_H * (j) + BLOCK_W / 2, BLOCK_W / 2, 0, 2 * Math.PI);
                mycontext.stroke();
                mycontext.fill();

               // mycontext.fillRect(BLOCK_W * bubble.xindex, BLOCK_H * (j), BLOCK_W - 1, BLOCK_H - 1);
               // mycontext.fillRect(bubbles[i][animatedblasted[i]].xindex * BLOCK_W, 0, BLOCK_W, BLOCK_H * animatedblasted[i]);
            }
        }
      /*  for (var x = 0; x < COLS; x++) {
            // sleep(1000);
            mycontext.fillStyle = colors[bubbles[x][y].color];
            mycontext.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
            mycontext.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
            var radGrd = mycontext.createRadialGradient(30, 30, 5, 35, 35, BLOCK_W / 2);
            radGrd.addColorStop(0, "#0f5"); // start with red at 0
            radGrd.addColorStop(1, "#0f0"); // finish with green
            mycontext.fillStyle = radGrd;

            mycontext.beginPath();
            mycontext.arc(BLOCK_W * x + BLOCK_W / 2, BLOCK_H * y + BLOCK_W / 2, BLOCK_W / 2, 0, 2 * Math.PI);
            mycontext.stroke();
            mycontext.fill();
        }*/

        

    }

    function sleep(milliseconds) {
        var start = new Date().getTime();
        while ((new Date().getTime() - start) < milliseconds){
            // Do nothing
        }

    }
