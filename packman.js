var map =  [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,0,0,0,0,0,0,0,0,0,0,0,2,1],
            [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
            [1,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
            [1,1,0,1,1,1,0,1,0,1,1,1,0,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,0,0,0,1,1,3,1,0,0,1,0,1],
            [3,0,0,0,1,0,1,3,3,1,0,1,1,0,3],
            [1,0,1,0,0,0,1,1,1,1,0,0,1,0,1],
            [1,0,0,0,0,0,0,3,0,0,0,0,0,0,1],
            [1,1,0,1,1,1,0,1,0,1,1,1,0,1,1],
            [1,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
            [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],    
            [1,2,0,0,0,0,0,0,0,0,0,0,0,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
var coin="<div class='coin'></div>";
var wall="<div class='wall'></div>";
var yellowdot="<div class='yellowdot'></div>";
var empty="<div class='empty'></div>";
var drawscreen="";
var mapDiv=document.getElementById("map"); //put this various to control the div on html
var pacmanDiv=document.getElementById("pacman"); //put this var to control the div on html
var pacmanlocation={
    i:9,
    j:7
};
var coinsound= new Audio("assets/pacman_chomp.wav");
var scored=0;
var scoreDiv=document.getElementById("score");
var prelocation=0;
var ghostDiv=document.getElementById("ghost");
var ghostlocation={
    i:7,
    j:7
};
var deathsound= new Audio("assets/pacman_death.wav");

var lifeDiv=document.getElementById("life");
var life = 3;

function score100(){
    scored+= 100;
    scoreDiv.innerHTML=scored;
}
function score50(){
    scored+= 50;
    scoreDiv.innerHTML=scored;
}

function countlife(x){
    var drawlife="";
    for (var l=x;l>0;l--){
        drawlife+= "<img class=pacmanlife src='assets/pacmanlife.gif'>";
        }
    lifeDiv.innerHTML=drawlife;
    }

// drawing the game's background

function draw(){
    drawscreen="";
    for(var i=0; i<map.length;i++){
        for(var j=0; j<map[i].length;j++){
            if (map[i][j]==1){
                drawscreen+=wall;
            } else if (map[i][j]==2){
                drawscreen+=coin;
            } else if(map[i][j]==0){
                drawscreen+=yellowdot;
            } else if(map[i][j]==3){
                drawscreen+=empty;
            }
        }
    }
    // console.log(drawscreen);
    mapDiv.innerHTML=drawscreen;
}
draw();
countlife(life);
// moving character

setTimeout(function movingghost(){
    var preghost= {...ghostlocation};
    ghostlocation.i+= Math.floor(math.random()*3)-1;
    ghostlocation.j+= Math.floor(math.random()*3)-1;
    if (map[ghostmanlocation.i][ghostlocation.j]==1){
        ghostlocation=preghost;
        } 
    else if (ghostlocation.j<0){
            ghostlocation.j=14;
            } 
    else if ([ghostlocation.j]>14){
            ghostlocation.j=0;
            }
    ghostDiv.style.top= 30*ghostlocation.i+'px';
    ghostDiv.style.left= 30*ghostlocation.j+'px';
    console.log ("Here come the ghost");
},1000);


document.onkeydown= function(event){
    var prelocation = {...pacmanlocation};
    switch (event.key){
        case("ArrowUp"):
            pacmanlocation.i--;
            // pacmanDiv.style.backgroundImage= "url(assets/pacmanup.gif)";
            pacmanDiv.style.transform= "rotate(270deg)"; 
        break;
        case("ArrowRight"):
            pacmanlocation.j++;
            // pacmanDiv.style.backgroundImage= "url(assets/pacmanright.gif)";
            pacmanDiv.style.transform= "rotate(0deg)";
        break;
        case("ArrowDown"):
            pacmanlocation.i++;
            // pacmanDiv.style.backgroundImage= "url(assets/pacmandown.gif)";
            pacmanDiv.style.transform= "rotate(90deg)";
        break;
        case("ArrowLeft"):
            pacmanlocation.j--;
            // pacmanDiv.style.backgroundImage= "url(assets/pacmanleft.gif)";
            pacmanDiv.style.transform= "rotate(180deg)";
        break;
    default:
    }
    // moving condition

    if (map[pacmanlocation.i][pacmanlocation.j]==1){
        pacmanlocation=prelocation;
    } 
    else if (pacmanlocation.j<0){
        pacmanlocation.j=14;
    } 
    else if ([pacmanlocation.j]>14){
        pacmanlocation.j=0;
    } 
    else if (map[pacmanlocation.i][pacmanlocation.j]==2){
        coinsound.play();
        map[pacmanlocation.i][pacmanlocation.j]=3;
        draw();
        score100();
    } 
    else if (map[pacmanlocation.i][pacmanlocation.j]==0){
        coinsound.play();
        map[pacmanlocation.i][pacmanlocation.j]=3;
        draw();
        score50();
    }
    else if (pacmanlocation.i==ghostlocation.i&&pacmanlocation.j==ghostlocation.j){
        deathsound.play();
        life--;
        if (life==0){
            mapDiv.innerHTML="<img id='gameover' src= 'assets/gameover.gif'>";
            ghostDiv.style.backgroundImage= "url()";
            pacmanDiv.style.backgroundImage= "url()";
            lifeDiv.innerHTML="";
            document.onkeydown=function(){
                location.reload();
                }
        }
        else 
            countlife(life);
            pacmanlocation={
                i:9,
                j:7
            }
        
        // location.reload();
        // console.log("gameover");
        }
    pacmanDiv.style.top= 30*pacmanlocation.i+'px';
    pacmanDiv.style.left= 30*pacmanlocation.j+'px';
}

