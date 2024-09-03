// 1. Can add Rules with multiple pages
// 2. Can add Fast and slow button , Pause button
// 3. Can create Youtube video for explaining game
// 4. Can add animation guide for starting game

let scoreA=0;
let scoreB=0;
let currentPlayer="";
let ended=false;
let started=false;
let tossed=false;
let playing=false;
let selected=false;
let bunchNo;
let c=new Audio("bgm/click.mp3");
let w=new Audio("bgm/wrong.mp3");
w.volume=0.3;
let p=new Audio("bgm/pick.mp3");
let d=new Audio("bgm/stone-dropping.mp3");
let s=new Audio("bgm/success.mp3");
let e=new Audio("bgm/ping-click.mp3");
let stones=[6,6,6,6,6,6,6,6,6,6];
let speed=0;
function delay(ms,speed=0) {
    return new Promise(resolve => setTimeout(resolve, ms+speed));
}

$(".aPlaying").hide();
$(".bPlaying").hide();
$(".points").hide();
delay(1000);
$(".instruction").text("Click on Start to start the Game.");
$(".start").click(async function(){
    c.play();
    await flash($(this));
    var bg = $('#bgMusic')[0]; 
    bg.volume=0.3;
    $('#bgMusic').on('canplay', function() {
      bg.loop = true;
      bg.play();
    });
  
    if (bg.readyState === 4) {
      bg.loop = true;
      bg.play();
    }
    if(!started){
        $(".points").show();
        $(".aScore").text("0");
        $(".bScore").text("0");
        started=true;
        $(this).text("Toss");
        $(".instruction").text("Toss will decide which player will go first.");    
    }
    else if(!tossed){
        $(this).text("Reset");
        tossed=true;
        await toss();
        $(".instruction").text("Select any blue box in "+currentPlayer.toUpperCase()+"'s side & Click on ⬅️ or ➡️ arrow for movement.");        
    }
    else{
        reset();
        $(this).text("Start");
    } 
});

$(".bunch").click(async function(){
    if(!started || !tossed || playing) await wrong();
    else if($(this).hasClass(currentPlayer)){
        c.play();
        diselect($(".bunch"));  
        select($(this));
        bunchNo=$(this).attr("id");
        selected=true;
    }
    else await wrong();  
});
$(".left").click(async function(){
    await flash($(this));
    if(!selected || !started || !tossed || playing) await wrong();
    else {
        playing=true;
        selected=false;
        c.play();
        if(currentPlayer==="a") await goLeft();
        else await goRight();

        if((scoreA+scoreB)===60){
            ended=true;
            winner();
        }
        else turnChange();
        playing=false;
    } 
});

function winner(){
    if(currentPlayer==="a") $(".aPlaying").hide();
    else $(".bPlaying").hide();
    currentPlayer="c";
    scoreA=parseInt(scoreA);
    scoreB=parseInt(scoreB);
    if(scoreA>scoreB)
    $(".instruction").text("Winner of the Game is A");
    else if(scoreA<scoreB)
    $(".instruction").text("Winner of the Game is B");
    else if(scoreA===scoreB)
    $(".instruction").text("Draw");
    else
    $(".instruction").text("Something went wrong");
}

$(".right").click(async function(){
    await flash($(this));
    if(!selected || !started || !tossed || playing) await wrong();
    else{
        playing=true;
        selected=false;  
        c.play();
        if(currentPlayer==="a") await goRight();
        else await goLeft();
        if((scoreA+scoreB)===60){
            ended=true;
            winner();
        } 
        else turnChange();
        playing=false;
    } 
});

$(".fast").click(function(){
    if(speed===-300) {speed=300; $(this).text("Faster");}
    else speed=(speed-150);
    if(speed===-150) $(this).text("1.5 X");
    else if(speed===-300) $(this).text("2 X"); 
    else if(speed===300) $(this).text("0.25 X");
    else if(speed===150) $(this).text("0.5 X");
    else if(speed===0) $(this).text("Normal Speed"); 
});

async function setScoreA(){
    bigSelect($(".aPoint"));
    $(".aScore").addClass("grBg");
    $(".aScore").text(scoreA);
    await delay(1000,speed);
    $(".aScore").removeClass("grBg");;
    bigDiselect($(".aPoint"));
}
async function setScoreB(){
    bigSelect($(".bPoint"));
    $(".bScore").addClass("grBg");
    $(".bScore").text(scoreB);
    await delay(1000,speed);
    $(".bScore").removeClass("grBg");
    bigDiselect($(".bPoint"));
}
async function turnChange(){
    playing=false;
    if(currentPlayer==="a") {
        $(".instruction").text("B's Turn");
        currentPlayer="b";
        bigDiselect($(".playerA"));
        bigSelect($(".playerB"));
        $(".aPlaying").hide();
        $(".bPlaying").show();
    }
    else {
        $(".instruction").text("A's Turn");
        currentPlayer="a";
        bigDiselect($(".playerB"));
        bigSelect($(".playerA"));
        $(".bPlaying").hide();
        $(".aPlaying").show();
    }        
}
async function addScore(x){
    stones[bunchNo]=0;
    s.play(); 
    await setStones(true);
    if(currentPlayer==="a") {scoreA+=x; await setScoreA();}
    else {scoreB+=x; await setScoreB();}
}
async function add4(){
    stones[bunchNo]=0;
    s.play(); 
    await setStones(true);
    let pl;
    if(bunchNo<5) pl="A's";
    else pl="B's";
    $(".instruction").text(pl+" socre increased by 4");
    if(bunchNo<5) {scoreA+=4; await setScoreA();}
    else {scoreB+=4; await setScoreB();}
}
async function increment(){
    bunchNo=parseInt(bunchNo);
    if(bunchNo===9) bunchNo=0;
    else bunchNo++;
}
async function decrement(){
    bunchNo=parseInt(bunchNo);
    if(bunchNo===0) bunchNo=9;
    else bunchNo--;
}
async function setStones(addingScore){
    if(currentPlayer==="a") $(".playerA").removeClass("bigShadow");
    else $(".playerB").removeClass("bigShadow");
    diselect($(".bunch"));
    let z="#"+bunchNo;
    select($(z));
    if(addingScore) $(z).css("backgroundColor","rgb(2, 255, 2)");
    await delay(500,speed);
    $(z).text(stones[bunchNo]);
    await delay(500,speed);
    if(addingScore) $(z).css("backgroundColor","rgb(0, 192, 245)");
    diselect($(z));
}

async function goLeft(){
    let t=stones[bunchNo];
    stones[bunchNo]=0;
    $(".instruction").text("Picking "+t+" stones");
    diselect($(".bunch"));
    p.play();
    await setStones(false);
    while(t--){
        decrement();
        stones[bunchNo]++;
        $(".instruction").text((t)+" stones in hand");
        d.play();
        await setStones(false);
        if(stones[bunchNo]===4){
            await add4();
            await setStones(false);
        } 
    }
    decrement();
    if(stones[bunchNo]===0) {
        let z="#"+bunchNo;
        select($(z));
        $(".instruction").text("Empty box");
        e.play();
        await delay(1000,speed);
        decrement(); 
        $(".instruction").text(currentPlayer.toUpperCase()+"'s socre increased by "+stones[bunchNo]);
        await addScore(stones[bunchNo]);
        $(".instruction").text("");
    }
    else await goLeft();
}
async function goRight(){
    let t=stones[bunchNo];
    stones[bunchNo]=0;
    $(".instruction").text("Picking "+t+" stones");
    p.play();
    await setStones(false);
    while(t--){
        increment();
        stones[bunchNo]++;
        $(".instruction").text((t)+" stones in hand");
        d.play();
        await setStones(false);
        if(stones[bunchNo]===4){
            await add4();
            await setStones(false);
        } 
    }
    increment();
    if(stones[bunchNo]===0) {
        let z="#"+bunchNo;
        $(".instruction").text("Empty box");
        select($(z));
        e.play();
        await delay(1000,speed);
        increment(); 
        $(".instruction").text(currentPlayer.toUpperCase()+"'s socre increased by "+stones[bunchNo]);
        await addScore(stones[bunchNo]);
        $(".instruction").text("");
    }
    else await goRight();
}
async function select(x){
    x.addClass("shadow");
}
async function diselect(x){
    x.removeClass("shadow");
}
async function bigSelect(x){
    x.addClass("bigShadow");
}
async function bigDiselect(x){
    x.removeClass("bigShadow");
}
async function wrong(){
    w.play();
    $("body").css("background-color","red");
    await delay(100);
    $("body").css("background-color","white");
}
async function flash(x){
    x.css("opacity","0.5");
    await delay(100);
    x.css("opacity","1");
}

async function toss(){
    let t=Math.floor(Math.random()*2);
        if(t===0) {
            $(".aPlaying").show();
            c.play();
            $(".instruction").text("Player A goes first.");
            currentPlayer="a";
            bigSelect($(".playerA"));
        }
        else  {
            $(".bPlaying").show();
            c.play();
            $(".instruction").text("Player B goes first.");
            currentPlayer="b";
            bigSelect($(".playerB"));
        }
        await delay(3000);
        $(".instruction").text("");
}

function reset(){
    window.location.reload();
}