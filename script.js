var st = 0;
var rw = 0; // run worker id
var bw = 0; // background worker id
var jw = 0; // jump worker id
var mt = 540; // margin top for jump
var sw = 0; // upscore worker id
var blw = 0; // flame-block worker id
var moveBlockWorkerId = 0;
function start(event){
    if(event.which == 13) {
        if(rw == 0){
            rw = setInterval(run, 100);
            runSound.play();
            st = 1;
            bw = setInterval(background, 100);
            sw = setInterval(upscore,20);
            blw = setInterval(createBlock,100);
            moveBlockWorkerId = setInterval(moveBlocks,100);
        }
    }
    if(event.which == 32) {
        if(st == 1){
        if(jw == 0){
            clearInterval(rw);
            runSound.pause();
            rw = -1;
            jw = setInterval(jump,100);
            jumpSound.play();
            

        }
    }
    }
}
var r = 1; // run image number
var p = document.getElementById("player");

function run(){
    r = r+1;
    if(r == 9){
        r = 1;
    }
    p.src = "png/Run ("+r+").png";
    
}
var x = 0;
function background(){
    x = x-20;
    document.getElementById("background").style.backgroundPositionX= x+"px";
}
var j = 1; // jump image number

function jump(){
    if(j<=6){
        mt = mt-40;
    }

    if(j>=7){
        mt = mt+40;
    }
    p.style.marginTop = mt+"px";
    j = j+1;
    if(j==13){
        j=1;
        clearInterval(jw);
        jumpSound.pause();
        rw = setInterval(run,100);
        runSound.play();
        jw = 0;
    }
    p.src ="png/Jump ("+j+").png";
}
 
var scoreValue = 0;
var score = document.getElementById("score");
function upscore(){
    scoreValue = scoreValue+1;
    score.innerHTML = scoreValue;
}

var bml = 500;
var blockId = 1;
function createBlock(){
    var block = document.createElement("div");
    block.className = "block";

    block.id = "block"+blockId;
    blockId++;

    var gap = Math.random()*(1000-400)+400;
    bml = bml+gap;
    block.style.marginLeft = bml+"px";
    
    document.getElementById("background").appendChild(block);
    
}

function moveBlocks(){
    for(var i=1;i<=blockId;i++){
        var currentBlock = document.getElementById("block"+i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft)-20;
        currentBlock.style.marginLeft = newMarginLeft+"px";
        
        if(newMarginLeft<173){
            if(newMarginLeft>38){
                if(mt<=540){
                    if(mt>460){
                        clearInterval(rw);
                        runSound.pause();
                        clearInterval(jw);
                        jumpSound.pause();
                        clearInterval(bw);
                        clearInterval(blw);
                        clearInterval(sw);
                        clearInterval(moveBlockWorkerId);
                        dw = setInterval(dead,100);
                        deadSound.play();
                    }
                }
            }
        }

    }
}
var runSound = new Audio("png/run.mp3");
runSound.loop = true;

var jumpSound = new Audio("png/jump.mp3");
var deadSound = new Audio("png/dead.mp3");

var dw = 0; //dead worker
var di = 1; //dead images numbers
function dead(){
    di++;
    if(di==11){
        di = 10;
        document.getElementById("endScore").innerHTML = scoreValue;
        document.getElementById("gameOver").style.visibility="visible";
        p.style.marginTop = "540px";
    }
p.src = "png/Dead ("+di+").png"
}

function re(){
    location.reload();
}