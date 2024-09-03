let bunchNo,scoreA=0,scoreB=0,currentPlayer="",ended=!1,started=!1,tossed=!1,playing=!1,selected=!1,c=new Audio("bgm/click.mp3"),w=new Audio("bgm/wrong.mp3");w.volume=.3;let p=new Audio("bgm/pick.mp3"),d=new Audio("bgm/stone-dropping.mp3"),s=new Audio("bgm/success.mp3"),e=new Audio("bgm/ping-click.mp3"),stones=[6,6,6,6,6,6,6,6,6,6];function delay(e){return new Promise((t=>setTimeout(t,e)))}function winner(){"a"===currentPlayer?$(".aPlaying").hide():$(".bPlaying").hide(),currentPlayer="c",scoreA=parseInt(scoreA),scoreB=parseInt(scoreB),scoreA>scoreB?$(".instruction").text("Winner of the Game is A"):scoreA<scoreB?$(".instruction").text("Winner of the Game is B"):scoreA===scoreB?$(".instruction").text("Draw"):$(".instruction").text("Something went wrong")}async function setScoreA(){bigSelect($(".aPoint")),$(".aScore").addClass("grBg"),$(".aScore").text(scoreA),await delay(1e3),$(".aScore").removeClass("grBg"),bigDiselect($(".aPoint"))}async function setScoreB(){bigSelect($(".bPoint")),$(".bScore").addClass("grBg"),$(".bScore").text(scoreB),await delay(1e3),$(".bScore").removeClass("grBg"),bigDiselect($(".bPoint"))}async function turnChange(){playing=!1,"a"===currentPlayer?($(".instruction").text("B's Turn"),currentPlayer="b",bigDiselect($(".playerA")),bigSelect($(".playerB")),$(".aPlaying").hide(),$(".bPlaying").show()):($(".instruction").text("A's Turn"),currentPlayer="a",bigDiselect($(".playerB")),bigSelect($(".playerA")),$(".bPlaying").hide(),$(".aPlaying").show())}async function addScore(e){stones[bunchNo]=0,s.play(),await setStones(!0),"a"===currentPlayer?(scoreA+=e,await setScoreA()):(scoreB+=e,await setScoreB())}async function add4(){let e;stones[bunchNo]=0,s.play(),await setStones(!0),e=bunchNo<5?"A's":"B's",$(".instruction").text(e+" socre increased by 4"),bunchNo<5?(scoreA+=4,await setScoreA()):(scoreB+=4,await setScoreB())}async function increment(){bunchNo=parseInt(bunchNo),9===bunchNo?bunchNo=0:bunchNo++}async function decrement(){bunchNo=parseInt(bunchNo),0===bunchNo?bunchNo=9:bunchNo--}async function setStones(e){"a"===currentPlayer?$(".playerA").removeClass("bigShadow"):$(".playerB").removeClass("bigShadow"),diselect($(".bunch"));let t="#"+bunchNo;select($(t)),e&&$(t).css("backgroundColor","rgb(2, 255, 2)"),await delay(500),$(t).text(stones[bunchNo]),await delay(500),e&&$(t).css("backgroundColor","rgb(0, 192, 245)"),diselect($(t))}async function goLeft(){let t=stones[bunchNo];for(stones[bunchNo]=0,$(".instruction").text("Picking "+t+" stones"),diselect($(".bunch")),p.play(),await setStones(!1);t--;)decrement(),stones[bunchNo]++,$(".instruction").text(t+" stones in hand"),d.play(),await setStones(!1),4===stones[bunchNo]&&(await add4(),await setStones(!1));if(decrement(),0===stones[bunchNo]){select($("#"+bunchNo)),$(".instruction").text("Empty box"),e.play(),await delay(1e3),decrement(),$(".instruction").text(currentPlayer.toUpperCase()+"'s socre increased by "+stones[bunchNo]),await addScore(stones[bunchNo]),$(".instruction").text("")}else await goLeft()}async function goRight(){let t=stones[bunchNo];for(stones[bunchNo]=0,$(".instruction").text("Picking "+t+" stones"),p.play(),await setStones(!1);t--;)increment(),stones[bunchNo]++,$(".instruction").text(t+" stones in hand"),d.play(),await setStones(!1),4===stones[bunchNo]&&(await add4(),await setStones(!1));if(increment(),0===stones[bunchNo]){let t="#"+bunchNo;$(".instruction").text("Empty box"),select($(t)),e.play(),await delay(1e3),increment(),$(".instruction").text(currentPlayer.toUpperCase()+"'s socre increased by "+stones[bunchNo]),await addScore(stones[bunchNo]),$(".instruction").text("")}else await goRight()}async function select(e){e.addClass("shadow")}async function diselect(e){e.removeClass("shadow")}async function bigSelect(e){e.addClass("bigShadow")}async function bigDiselect(e){e.removeClass("bigShadow")}async function wrong(){w.play(),$("body").css("background-color","red"),await delay(100),$("body").css("background-color","white")}async function flash(e){e.css("opacity","0.5"),await delay(100),e.css("opacity","1")}async function toss(){0===Math.floor(2*Math.random())?($(".aPlaying").show(),c.play(),$(".instruction").text("Player A goes first."),currentPlayer="a",bigSelect($(".playerA"))):($(".bPlaying").show(),c.play(),$(".instruction").text("Player B goes first."),currentPlayer="b",bigSelect($(".playerB"))),await delay(3e3),$(".instruction").text("")}function reset(){window.location.reload()}$(".aPlaying").hide(),$(".bPlaying").hide(),$(".points").hide(),$(".start").click((async function(){c.play(),await flash($(this));var e=$("#bgMusic")[0];e.volume=.3,$("#bgMusic").on("canplay",(function(){e.loop=!0,e.play()})),4===e.readyState&&(e.loop=!0,e.play()),started?tossed?(reset(),$(this).text("Start")):($(this).text("Reset"),tossed=!0,await toss()):($(".points").show(),$(".aScore").text("0"),$(".bScore").text("0"),started=!0,$(this).text("Toss"))})),$(".bunch").click((async function(){started&&tossed&&!playing&&$(this).hasClass(currentPlayer)?(c.play(),diselect($(".bunch")),select($(this)),bunchNo=$(this).attr("id"),selected=!0):await wrong()})),$(".left").click((async function(){await flash($(this)),selected&&started&&tossed&&!playing?(playing=!0,selected=!1,c.play(),"a"===currentPlayer?await goLeft():await goRight(),scoreA+scoreB===60?(ended=!0,winner()):turnChange(),playing=!1):await wrong()})),$(".right").click((async function(){await flash($(this)),selected&&started&&tossed&&!playing?(playing=!0,selected=!1,c.play(),"a"===currentPlayer?await goRight():await goLeft(),scoreA+scoreB===60?(ended=!0,winner()):turnChange(),playing=!1):await wrong()}));