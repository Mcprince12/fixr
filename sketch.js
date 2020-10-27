//Create variables here
var dog, happyDog, dogImg;
var database;
var foodS, foodStock;
var feedPet, addFood;
var fedTime;
var foodObj;
var stock = 20;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 500);
  database = firebase.database();
  
  dog = createSprite(250, 250, 50, 50);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodObj = new Food();

  feedPet = createButton("Feed The Dog");
  feedPet.position(500, 95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add The Food");
  addFood.position(600, 95);
  addFood.mousePressed(addFoods);

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() { 
  background(color(46, 139, 87));
  fedTime=database.ref('FeedTime');
  
  
  fedTime.on("value", function(data){
    foodObj.lastFed=data.val();
  });

  

  fill(255, 255, 255);
  textSize(15);
  if(foodObj.lastFed>=12){
    text("Last Feed : "+foodObj.lastFed%12+ " PM", 350, 30);
  }else if(foodObj.lastFed===0){
    text("Last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed : "+foodObj.lastFed+" AM", 350, 30);
  }

  foodObj.display();
  

  drawSprites();
  //add styles here

  text("STOCK :"+ foodS, 250, 200);
  
}

function readStock(data){
  
  foodS=data.val();
  foodObj.foodStock = foodS;
}
 
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  });
}

function feedDog(){

  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  });
}


