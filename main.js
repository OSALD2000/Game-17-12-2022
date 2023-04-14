let FireAnzahl=[];
let fg;
let enemyF;
let enemyFTow;
let enemyFThree;
let enemyFFour;
let enemySpeed=10;
let fireOn=false;
let enemyMoveInterval;
let enemySpeedInterval;
let scour=0;
let button = document.getElementById("Restart");
var audioFire = new Audio('/sound/fire.wav');
var audiohet = new Audio('/sound/het.wav');
var audioGO = new Audio('/sound/gameOver.wav');
const myGameArea={
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width=1400;
        this.canvas.height=650;
        this.canvas.id="MyCan";
        this.context=this.canvas.getContext("2d"),
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);   
        this.interval=setInterval(update, 30);
        myGameArea.keys = (myGameArea.keys || []);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear : function(){
        this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
    } 
}
class GamaFigure{
    xKoo;
    yKoo;
    width;
    height;
    color;
    xSpeed=10;
    ySpeed=10;

    constructor(xKoo, yKoo, color, width, height){
        this.xKoo=xKoo;
        this.yKoo=yKoo;
        this.color=color;
        this.width=width;
        this.height=height;
    }sdw
    
    addToCanvas(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xKoo, this.yKoo, this.width, this.height);
    }

    moveFigure(fg1) {
        if(testYKoo(fg1) && testXKoo(fg)){
            if (myGameArea.keys && myGameArea.keys[65]) { fg1.xKoo -=20; }
            if (myGameArea.keys && myGameArea.keys[68]) {fg1.xKoo +=20; }
            if (myGameArea.keys && myGameArea.keys[87]) {fg1.yKoo -=20; }
            if (myGameArea.keys && myGameArea.keys[83]) {fg1.yKoo +=20; }  
        }
    }
} 
function fire(){
    if (myGameArea.keys && myGameArea.keys[32] && fireOn==false) {    
        rightFire= new GamaFigure(fg.xKoo,fg.yKoo+20,"red",50,10);
        fireOn=true; 
    }if(fireOn){
        rightFire.addToCanvas();
        audioFire.play();
        moveFire(rightFire);
        if(fireA(rightFire, enemyF)){
            audiohet.play();
            y = Math.floor(Math.random() * 600)-40;
            enemyF = new GamaFigure(1300, y,"red",50,300);
        }
        if(scour > 200){
            if(fireA(rightFire, enemyFTow)){
                audiohet.play();
                y = Math.floor(Math.random() * 600)-40;
                enemyFTow = new GamaFigure(1300, y ,"#3ec419",50,300);
            } 
        } if(scour>500){
            if(fireA(rightFire, enemyFThree)){
                audiohet.play();
                y = Math.floor(Math.random() * 600)-40;
                enemyFThree = new GamaFigure(1300, y ,"#1921c4",50,300);;
            }
        }if(scour>1500){
            if(fireA(rightFire, enemyFFour)){
                audiohet.play();
                y = Math.floor(Math.random() * 600)-40;
                enemyFFour = new GamaFigure(1300, y ,"#e99815",50,300);
            }
        }
       
    }
}
function moveFire(rightFire){
    rightFire.xKoo+=30;
    if(rightFire.xKoo>1400){
        rightFire = new GamaFigure(fg.xKoo,fg.yKoo+20,"red",50,10); 
        fireOn=false;
    }
}
function testYKoo(fg){
    if(fg.yKoo > 10){
        if(fg.yKoo <590){
            return true;
        }else{
            fg.yKoo-=10;
        }
    }else{
        fg.yKoo+=10;
    }
}
function testXKoo(fg){
    if(fg.xKoo > 10){
        if(fg.xKoo <1340){
            return true;
        }else{
            fg.xKoo-=10;
        }
    }else{
        fg.xKoo+=10;
    }
}
function start(){
    fg = new GamaFigure(20,20,"red",50,50);
    myGameArea.start();
    enemy();
    enemyMoveInterval = setInterval(moveEnemy, 15);
    enemySpeedInterval = setInterval(scwerigkeit, 50000);
}
function gameEnd(enemy1){
    if(-50< fg.xKoo-enemy1.xKoo && fg.xKoo-enemy1.xKoo <50){
        if( -40 <=fg.yKoo-enemy1.yKoo && fg.yKoo-enemy1.yKoo<300){
            audioGO.play();
            clearInterval(myGameArea.interval);
            clearInterval(enemyMoveInterval);
            clearInterval(enemySpeedInterval);
            }
        }   
}
function update(){
    myGameArea.clear();
    scourAnzeige();
    fg.addToCanvas();
    fg.moveFigure(fg);
    fire();
    gameEnd(enemyF);
    scour++;  
    enemyF.addToCanvas();
    if(scour > 200){
        enemyFTow.addToCanvas();
        gameEnd(enemyFTow);
    } if(scour>500){
        enemyFThree.addToCanvas();
        gameEnd(enemyFThree);
    }
    if(scour>1500){
        enemyFFour.addToCanvas();
        gameEnd(enemyFFour);
    }
}
function enemy(){
    enemyF = new GamaFigure(1300, 50,"red",50,300);
    enemyFTow = new GamaFigure(1300, 50,"#3ec419",50,300);
    enemyFThree = new GamaFigure(1300, 50,"#1921c4",50,300);
    enemyFFour = new GamaFigure(1300, 50,"#e99815",50,300);
    
}
function moveEnemy(){
    enemyF.xKoo-=enemySpeed;
    if(enemyF.xKoo<0){
        y = Math.floor(Math.random() * 600)-40;
        enemyF = new GamaFigure(1300, y,"red",50,300);
    } if(scour > 200){
        enemyFTow.xKoo-=enemySpeed;
        if(enemyFTow.xKoo<0){
            y = Math.floor(Math.random() * 600)-40;
            enemyFTow = new GamaFigure(1300, y,"#3ec419",50,300);
        }
    }if(scour > 500){
        enemyFThree.xKoo-=enemySpeed;
        if(enemyFThree.xKoo<0){
            y = Math.floor(Math.random() * 600)-40;
            enemyFThree = new GamaFigure(1300, y,"#1921c4",50,300);
        }
    }if(scour > 1500){
        enemyFFour.xKoo-=enemySpeed;
        if(enemyFFour.xKoo<0){
            y = Math.floor(Math.random() * 600)-40;
            enemyFFour = new GamaFigure(1300, y,"#e99815",50,300);
        }
    }
    console.log(enemySpeed);
}
function fireA(rightFire, enemyFigure){
    if(-50 < rightFire.xKoo  - enemyFigure.xKoo &&  rightFire.xKoo  - enemyFigure.xKoo < 50){
        if(-10< rightFire.yKoo - enemyFigure.yKoo &&  rightFire.yKoo - enemyFigure.yKoo <300 ){
            rightFire.xKoo=2000;
            return true;
        }
    }
}
function scourAnzeige(){
    document.getElementById("Scoure").innerText= scour;
}
function scwerigkeit(){
    enemySpeed+=2;
    console.log(scour);
    console.log(enemySpeed);
}
let ctx = myGameArea.canvas.getContext("2d");
start();
button.addEventListener("click", function(){
    FireAnzahl=[];
    clearInterval(myGameArea.interval);
    clearInterval(enemyMoveInterval);
    clearInterval(enemySpeedInterval);
    scour=0;
    fg=null;
    enemyF=null;
    enemyFTow=null;
    enemyFThree=null; 
    console.log("RESTART");
    location.replace('index.html')
});

