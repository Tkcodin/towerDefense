//sorry about the names I had big ideas of having Ali and Michael appear as towers
//me and any other students who were ok w it appearing as the bad guys
//but getting the basics prooved difficult enough


const canvas = document.getElementById("main_canvas");
const context = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600; 

document.getElementById("highScores").addEventListener('click', 
function(){
    //show high scores on canvas
    // make a table: name & highscore (med score too?)
    if(document.getElementById("scoreTable").style.display == 'none'){
        document.getElementById("scoreTable").style.display = 'block';
        canvas.style.display = 'none';
        document.getElementById("highScores").textContent = "Return to Game";
    }
    else{
        document.getElementById("scoreTable").style.display= 'none';
        canvas.style.display = 'block';
        document.getElementById("highScores").textContent = "View Scores";
    }
})











document.getElementById("restart").addEventListener('click', 
function(){
    canvas.style.display = 'block';
    document.getElementById("scoreTable").style.display= 'none';
    document.getElementById("highScores").textContent = "View Scores";
    
//Mouse coords on canvas
const mouse = {
    width: 1,
    height: 1,
}


let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function(e){
    mouse.xCo = e.x - canvasPosition.left;
    mouse.yCo = e.y - canvasPosition.top;
});

window.addEventListener("resize", function(){
    canvasPosition = canvas.getBoundingClientRect();
})

canvas.addEventListener('mouseleave', function(){
    mouse.xCo = undefined;
    mouse.yCo = undefined;
})






//GAME GRID
const cellSize = 50;
const myGrid = [];

class Cell{
    constructor(xCo, yCo){
        this.xCo = xCo;
        this.yCo = yCo;
        this.width = cellSize
        this.height = cellSize;
    }
    draw(){
        //highlight cell if mosue is on canvas and in certain cell
        if (mouse.xCo && mouse.yCo && detectCollisions(this, mouse)){
            context.strokeStyle = 'grey';
            context.strokeRect(this.xCo, this.yCo, this.width, this.height);
        }
    }
}

function drawGrid(){
    for (let i = 0; i < canvas.height; i += cellSize){
        for(let j = 0; j < canvas.width; j += cellSize){
            myGrid.push(new Cell(j, i));
        }
    }
}

function drawGridCells(){
    for(let i = 0; i < myGrid.length; i++){
        //draw each cell
        myGrid[i].draw();
    }
}






//TOWERS (logical answers) change all tower references to michael and Ali (lecturers?)
let towers = [];
let logicalArguments = [];
let gold = 400;
let towerTrim = 2;



class Tower{
    constructor(xCo, yCo){
        this.xCo = xCo;
        this.yCo = yCo;
        this.width = cellSize - towerTrim*2;
        this.height = cellSize - towerTrim*2;
        this.range = canvas.width/2;
        this.reloadFreq = 50;
        this.reloadTime = this.reloadFreq -1;
        this.currentHealth = (cellSize - towerTrim*2)*2;
        this.maxHealth = (cellSize - towerTrim*2)*2;
        this.missingHealth = this.maxHealth - this.currentHealth;
    }
    draw(){
        this.missingHealth = this.maxHealth - this.currentHealth; 
        context.fillStyle = 'green';
        context.fillRect(this.xCo, this.yCo, this.width, this.height);
        // context.fillStyle = 'red';
        
        //     context.fillRect(this.xCo, this.yCo, this.width, this.missingHealth/2-towerTrim*2);
        // }
        // else{
            context.fillStyle = 'red';
            context.fillRect(this.xCo, this.yCo, this.width, this.missingHealth/2);
        
    }
    shooting(){
               
        for(let i = 0; i<idiots.length; i++){
            //comparator to pick closest?
            if(idiots[i].yCo == this.yCo && idiots[i].xCo < this.xCo + this.range){
                this.reloadTime++;
                if(this.reloadTime % this.reloadFreq == 0){
                    logicalArguments.push(new logicalArgument(this.xCo+this.width, this.yCo+this.height/2-this.height/10));
                }
                
                return; //dont shoot twice bob dylan song
            }
            
        }
    }
}


canvas.addEventListener('click', function(){

    // finds closest cell to cursor
    const closestCellX = mouse.xCo - (mouse.xCo%cellSize) +towerTrim;
    const closestCellY = mouse.yCo - (mouse.yCo%cellSize)+towerTrim;
    
    //bad to test
    // towers.push(new Tower(400, 100));

    let towerCost = 100;

    let openPosition = true;

    for(let i = 0; i <towers.length; i++){
        if(towers[i].xCo == closestCellX && towers[i].yCo == closestCellY){
            openPosition = false;
        }
    }

    if(gold >= towerCost && openPosition){
       towers.push(new Tower(closestCellX, closestCellY));
        gold = gold - towerCost;
    }
})


function drawTowers(){
    for(let i = 0; i < towers.length; i++){
        //draw each cell and its ammo
        towers[i].draw();
        towers[i].shooting();

    }
}

class logicalArgument{
    constructor(xCo, yCo){
        this.xCo = xCo;
        this.yCo = yCo;
        this.height = cellSize/5;
        this.width = cellSize/5;
        this.speed = 5;
    }
    step(){
        this.xCo = this.xCo+this.speed;
    }
    draw(){
        context.fillStyle = 'yellow';
        context.fillRect(this.xCo, this.yCo, this.width, this.height);
    }
}

function drawLogicalArguments(){
    for(let i = 0; i < logicalArguments.length; i++){
        //draw each cell
        logicalArguments[i].step();
        logicalArguments[i].draw();
        for(let j = 0; j < idiots.length; j++){
            if(idiots[j] && logicalArguments[i] && detectCollisions(logicalArguments[i], idiots[j])){
                if(idiots[j].currentHealth>=1){
                    idiots[j].currentHealth = idiots[j].currentHealth - 30;
                    logicalArguments.splice(i, 1);
                    if(idiots[j].currentHealth <= 0){
                        gold = gold + 75;
                        score = score + Math.floor(idiots[j].maxHealth/10);
                        idiots.splice(j, 1);
                    }
                }
                else{
                    gold = gold + idiots[j].maxHealth/2;
                    score = score + Math.floor(idiots[j].maxHealth);
                    idiots.splice(j, 1);
                    
                }
            }
        }
    }

    

}




//Illogical Students

//find enemies by finding yCo in here


function levelUp(){
    logicalArguments = [];
    idiotSpeed = Math.floor(idiotSpeed * 1.5);
    idiotHealth = Math.floor(idiotHealth * 1.5);
    initialIdiotAmount = Math.floor(initialIdiotAmount *1.5);
    idiotAmount = initialIdiotAmount;
    level++;
}

let idiotTrim = 2;
let idiots = [];
let idiotSpeed = 2;
let idiotHealth = 100;
let idiotTimer = 500;
let idiotTimerReduction = 50;
let idiotAmount = 20;
let initialIdiotAmount = 20;

class Idiot{
    constructor(yCo){
        this.xCo = canvas.width;
        this.yCo = yCo;
        this.width = cellSize - idiotTrim*2;
        this.height = cellSize - idiotTrim*2;
        
        //change this 
        this.currentSpeed = idiotSpeed;

        this.initialSpeed = this.currentSpeed;
        // this.currentHealth = idiotHealth;
        // this.maxHealth = idiotHealth;
        
        this.currentHealth = idiotHealth;
        this.maxHealth = idiotHealth;
        this.missingHealth = this.maxHealth - this.currentHealth;
        // Math.floor((this.currentHealth/this.currentHealth)*100);
    }
    step(){
        this.xCo = this.xCo-this.currentSpeed;
    }
    draw(){
        this.missingHealth = this.maxHealth - this.currentHealth; 
        context.fillStyle = 'orange';
        context.fillRect(this.xCo, this.yCo, this.width, this.height);
        context.fillStyle = 'red';
        context.fillRect(this.xCo, this.yCo, this.width, Math.floor((this.missingHealth/this.maxHealth)*48));
        //context.fillRect(this.xCo, this.yCo, this.width, Math.floor(this.missingHealth/2));
    }






}

function drawIdiots(){
    for(let i = 0; i < idiots.length; i++){
        //draw each cell
        idiots[i].step();
        idiots[i].draw();
        
        for(let j = 0; j < towers.length; j++){
            if(towers[j] && idiots[i] && detectCollisions(idiots[i], towers[j])){
                if(towers[j].currentHealth>=1){
                    towers[j].currentHealth = towers[j].currentHealth - 1;
                    idiots[i].currentSpeed = 0;
                }
                else{
                    idiots[i].currentSpeed = idiots[i].initialSpeed;
                    towers.splice(j, 1);
                }
            }
        }

        if(idiots[i].xCo<0){
            idiots.splice(i, 1);
            playerHealth = playerHealth -1;
        }
    }
    
    

    //add enemies over time at increasing rate (change 100 to higher number at start the decreases? over time)
    
    if(count % idiotTimer == 0 && idiotAmount>0){
        
        //CHANGE REQUIRED HERE IF RESIZING
        idiots.push(new Idiot(Math.floor(Math.random() * 12) * cellSize + idiotTrim));
        if(idiotTimer >= idiotTimerReduction*2){
            idiotTimer = idiotTimer - idiotTimerReduction;
        }

        idiotAmount--;
    }
}


function resetIdiotSpeed(){
    for(let i = 0; i<idiots.length; i++){
        let uninhibited = true;
        for(let j = 0; j<towers.length; j++){
            if(idiots[i] && towers[j] && detectCollisions(idiots[i], towers[j])){
                uninhibited = false;
            }
        }
        if(uninhibited){
            idiots[i].currentSpeed=idiots[i].initialSpeed;
        }
    }
}








//GAME LOGIC
let count = 0;
let playerHealth = 10;
let level = 1;
let score = 0;

//doesnt jsut have to be cell sized
function detectCollisions(c1, c2){
    
    //any or statement being true means no collision
    if (!(c1.xCo > c2.xCo + c2.width || c1.xCo + c1.width < c2.xCo
        || c1.yCo > c2.yCo + c2.height || c1.yCo + c1.height < c2.yCo)){
            return true;
        };
};

function recordCounts(){
    

    
    document.getElementById("gold").innerText= "Gold: " + gold;
    document.getElementById("health").innerText= "Health: " + playerHealth;
    document.getElementById("level").innerText= "Level: " + level;
    document.getElementById("score").innerText= "Score: " + score;
    document.getElementById("formScore").value= score;

    
    if(playerHealth<=0){
        context.strokeStyle = "red";
        context.font = 'bold 90px serif';
        context.fillText('GAME OVER MAN', 30, 300);
    }


    
}










//run this BCH

function animate(){

    //clear canvas so mouse highlight is removed
    context.clearRect(0, 0, canvas.width, canvas.height);

    //draw items
    
    drawGridCells();
    drawTowers();
    resetIdiotSpeed();
    drawIdiots();
    drawLogicalArguments();
    recordCounts();

    count++;
    
    

    

    if(playerHealth <= 0){
    
    }
    else if(idiotAmount<=0 && idiots.length<=0){
        levelUp();
        requestAnimationFrame(animate);
    }
    else{
        requestAnimationFrame(animate);
    }

    

    
}
drawGrid();
animate();
}
)
