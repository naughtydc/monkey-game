var ground;
var monkey , monkey_running,monkey_collide;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collide = loadImage("sprite_7.png");
}



function setup() {
  // createCanvas(600,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("monkey collided",monkey_collide);
  monkey.scale=0.15;
  
  ground = createSprite(450,360,900,10);
  ground.velocityX=-4;
  console.log(ground.x);
  
  obstacleGroup = createGroup(); 
  FoodGroup = createGroup();
}


function draw() {
  background("lightblue");
  
  score = score + Math.round(getFrameRate()/60);
  
  /*stroke("white");
  textSize(20);
  fill("white")
  text("score:  "+score,400,50)*/
  
  stroke("black");
  textSize(20);
  fill("black")
  survivalTime=Math.ceil(frameCount/getFrameRate());
  text("Survival Time:"+survivalTime,50,50);      
  
  
  
  
  if(keyDown("space")&& monkey.y >= 290) {
        monkey.velocityY = -16;
         
    }
  monkey.velocityY =  monkey.velocityY + 0.8;
  monkey.collide(ground);
  //monkey.collide(obstacleGroup);
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  spawnObstacles();
  spawnBananas();
  
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.velocityX = 0;
    ground.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkey.changeAnimation("monkey collided",monkey_collide);
  }
  
  drawSprites();
}
function spawnObstacles(){
 if(frameCount % 200 === 0){
   var obstacle = createSprite(600,310,10,40);
   //obstacle.debug = true;
   obstacle.setCollider("rectangle",-10,0,330 ,310);
   obstacle.velocityX =-6;
   //obstacle.velocityY =  obstacle.velocityY + 0.8;
   obstacle.addAnimation("obst",obstacleImage);
   obstacle.scale = 0.275;
   obstacle.lifetime = 120;
   obstacle.collide(ground);
   obstacleGroup.add(obstacle);
   
 }
}
function spawnBananas(){
 if(frameCount % 60 === 0){
   var banana = createSprite(600,Math.round(random(120,200)),10,40)
   banana.velocityX =-6;
   banana.addAnimation("banna",bananaImage);
   banana.scale = 0.1;
   banana.lifetime = 120;
   FoodGroup.add(banana);
   
 }
}




