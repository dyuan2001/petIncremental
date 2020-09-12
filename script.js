var gameData = {
  money: 0,
  moneyPerSecond: 0,
  orbs: 0,
  stageOne: 0,
  stageTwo: 0,
  stageThree: 0,
  stage: 'RoundNoDet',
  currentPet: 'bear'
}

var extraStrengthPets = {
  count: 0,
  cost: 5,
  increment: .25,
  name: "extraStrengthPets"
}

var autopetter = 
{
  count: 0,
  cost: 25,
  increment: .50,
  name: "autopetter"
}

var feeder = 
{
  count: 0,
  cost: 50,
  increment: 1,
  name: "feeder"
}


var field = 
{
  count: 0,
  cost: 200,
  increment: 3,
  name: "field"
}
var treatmaker = 
{
  count: 0,
  cost: 1337,
  increment: 14,
  name: "treatmaker"
}
var frisbeemachine = 
{
  count: 0,
  cost: 3500,
  increment: 50,
  name: "frisbeemachine"
}



var segway = 
{
  count: 0,
  cost: 7420,
  increment: 140,
  name: "segway"
}
var robotcompanion = 
{
  count: 0,
  cost: 30000,
  increment: 420,
  name: "robotcompanion"
}
var spaceship = 
{
  count: 0,
  cost: 69420,
  increment: 1111,
  name: "spaceship"
}

let buildings = [extraStrengthPets, autopetter, feeder, field, treatmaker, frisbeemachine, segway, robotcompanion, spaceship];


function refresh() {
  document.getElementById("moneyEarned").innerHTML = "Money earned: " + (Math.round(gameData.money * 100) / 100).toFixed(2);

  document.getElementById("moneyPerSecond").innerHTML = "Money per second: " + (Math.round(gameData.moneyPerSecond * 100) / 100).toFixed(2);

  //Orbs
    document.getElementById("buyOrbs").innerHTML = "Buy 100 Orbs Cost: " + gameData.moneyPerSecond * 10;

    document.getElementById("orbs").innerHTML = "Orbs: " + gameData.orbs;
    if(gameData.money < gameData.moneyPerSecond * 10 || gameData.moneyPerSecond == 0)
    {
      document.getElementById("buyOrbs").disabled = true;
    }
    else
    {
      document.getElementById("buyOrbs").disabled = false;
    }

  stageChanger();

  buildings.forEach(function(building)
  {
    document.getElementById(building.name + "Max").innerHTML = "Purchase max: " + checkNum(building, -1);

    document.getElementById(building.name + "100B").disabled = checkNum(building, 100);

    document.getElementById(building.name + "10").disabled = checkNum(building, 10);
    
    document.getElementById(building.name + "PerSecond").innerHTML = "Current Earnings: " + building.count * building.increment;

  })

  if(gameData.money  >= 1000000)
	{
		alert("Congratulations! You have beaten the game. If you are a first time player, please complete a very brief survey to participate in a study.")

    const end = document.getElementById("end")
    end.innerHTML = "End Survey Link (Google Forms)";
    
    if(experimental)
    {
      end.href = `https://docs.google.com/forms/d/e/1FAIpQLScXjR2f2NC2fJdQF2rdHqhmvOrYmkSWWc5knJSUcLchACe1Ow/viewform?usp=pp_url&entry.1128201092=${gameData.stageOne}&entry.1184656859=${gameData.stageTwo}&entry.12758751=${gameData.stageThree}`
    }
    else
    {
      end.href = `https://docs.google.com/forms/d/e/1FAIpQLSejwusa2zg0ufqvdtTep8Gir6jBwPSn1Ut_1Dv2wpR1raBlFg/viewform?usp=pp_url&entry.1128201092=${gameData.stageOne}&entry.1184656859=${gameData.stageTwo}&entry.12758751=${gameData.stageThree}`
    }

    clearInterval(interval);
	}

  //console.log(gameData.money);
}

var counter = 0
var interval = setInterval(function() {
  gameData.money += gameData.moneyPerSecond

  refresh()
}, 1000)

function getMoney() {
  gameData.money += (gameData.moneyPerSecond * .25 + .25);
  refresh();
}

function buy(x) {
  if(gameData.money >= x.cost) {
    gameData.money -= x.cost
    x.count += 1

    x.cost = x.cost * 1.07
   
    document.getElementById(x.name).innerHTML = "Earn: " + x.increment + " " + x.count + " Cost: " + (Math.round(x.cost * 100) / 100).toFixed(2);

    gameData.moneyPerClick += x.increment
    refresh()
  }
}

let bonuses = [25, 50, 75, 100];

function buyAuto(x) {
  if(gameData.money >= x.cost) {
    gameData.money -= x.cost
    x.count += 1

    x.cost = x.cost * 1.07
   
    document.getElementById(x.name).innerHTML =  x.count + " Earn: " + x.increment + " Cost: " + (Math.round(x.cost * 100) / 100).toFixed(2);

    gameData.moneyPerSecond += x.increment

    bonuses.forEach(function(bonus)
    {
      if(x.count == bonus){
        document.getElementById(x.name + bonus).style.backgroundColor = "yellow";
      
        gameData.moneyPerSecond += x.increment * x.count;

        x.increment *= 2;
      }
    })
    
    refresh()
  }
}

function buyNum(x, n)
{ 
  console.log(n);

  var i;
  if(n = -1)
  {
    n = checkNum(x, -1);
  }

  for(i = 0; i < n; i++)
  {
    buyAuto(x);
  }
}

function checkNum(x, n)
{
    if(n == -1)
    {
      var count = 0;
      var tempCost = x.cost + 0;
      var tempMoney = gameData.money + 0;
      while(tempMoney >= tempCost)
      {
        tempMoney -= tempCost;
        tempCost *= 1.07;
        count++;
      }
      return count;
    }
    else
    {
      var i;
      var tempCost = x.cost + 0;
      var tempMoney = gameData.money + 0;
      for(i = 0; i < n; i++)
      {
        if(tempMoney >= tempCost)
        {
          tempMoney -= tempCost;
          tempCost *= 1.07;
        }
        else
        {
          return true;
        }
      }
      return false;
    }
}

function buyOrbs()
{
  if(gameData.money >= gameData.moneyPerSecond * 10) { 
    gameData.money -= gameData.moneyPerSecond * 10;

    gameData.orbs += 100;
    
    refresh();
  }
}

var loot = 0;
var petIndex = 0;

//lootboxes
function roll()
{
  if(gameData.orbs >= 225){
    gameData.orbs -= 225;

      if(gameData.stage.localeCompare('RoundNoDet') == 0)
      {
        gameData.stageOne += 225;
      }
      else if(gameData.stage.localeCompare('Round') == 0)
      {
        gameData.stageTwo += 225;
      }
      else if(gameData.stage.localeCompare('SquareDet') == 0)
      {
        gameData.stageThree += 225;
      }

    loot = Math.random();
    console.log("hello");
    if(loot <= .3165537) //epic
    {
      petIndex = Math.floor(Math.random() * 6);
      epic[petIndex].available = false;
      refresh();
      document.getElementById(epic[petIndex].name).style.filter = "sepia(100%)";
      alert("Congratulations! You have unlocked the " + epic[petIndex].name.toUpperCase() + " pet!");
    }
    else if(loot <= 0.36979670861){ //legendary
      petIndex = Math.floor(Math.random() * 3);
      legendary[petIndex].available = false;
      refresh();
      document.getElementById(legendary[petIndex].name).style.filter = "sepia(100%)";
      alert("Congratulations! You have unlocked the " + legendary[petIndex].name.toUpperCase() + " pet!");
    }
    else if(loot <= 0.37463697967){ //ultimate
      parrot.available = false;
      refresh();
      document.getElementById("parrot").style.filter = "sepia(100%)";
      alert("Congratulations! You have unlocked the PARROT pet!");
    }
    else //common
    {
      console.log(petIndex);
      petIndex = Math.floor(Math.random() * 12);
      common[petIndex].available = false;
      refresh();
      document.getElementById(common[petIndex].name).style.filter = "sepia(100%)";
      alert("Congratulations! You have unlocked the " + common[petIndex].name.toUpperCase() + " pet!");
    }
  }
}

function announcement(x){
  
}



var replace = true;

function replaceImg()
{
  document.getElementById("pet").src='Round/bear.png'

  if(replace){
    setTimeout(() => {
        document.getElementById("pet").src='https://i.imgur.com/2Y9623B.gif?noredirect';
        replace = true;
    }, 1 * 1000);

    replace = false;
  }
}

function replacePet(pet)
{
  if(pet.available)
  {
    if(experimental)
    {

    }
    else if(gameData.orbs >= pet.cost)
    {
      pet.available = false;
      gameData.orbs -= pet.cost;

      if(gameData.stage.localeCompare('RoundNoDet') == 0)
      {
        gameData.stageOne += pet.cost;
      }
      else if(gameData.stage.localeCompare('Round') == 0)
      {
        gameData.stageTwo += pet.cost;
      }
      else if(gameData.stage.localeCompare('SquareDet') == 0)
      {
        gameData.stageThree += pet.cost;
      }

      refresh();
      document.getElementById(pet.name).style.filter = "sepia(100%)";
    }
  }
  else
  {
    document.getElementById("pet").src = gameData.stage + "/" + pet.name + ".png";
    gameData.currentPet = pet.name;
  }
}

//Stage tracker, changer, and recorder
var experimental = false;

function randomizeSimulation()
{
  
  
  if(Math.random() < .66)
  {
    experimental = true;
  }

  if(experimental)
  {
    document.getElementById("lootbox").style.visibility = "visible";
    document.getElementById("buyOrbs").style.visibility = "visible";
  }
  else
  {
    document.getElementById("shop").innerHTML = "Shop (Click icon to buy pet!)"
    document.getElementById("buyOrbs").style.visibility = "visible";
    document.getElementById("lootbox").remove();
    document.getElementById("common").innerHTML = "Common Pets (975 Orbs)";
    document.getElementById("epic").innerHTML = "Epic Pets (1350 Orbs)";
    document.getElementById("legendary").innerHTML = "Legendary Pets (1820 Orbs)";
    document.getElementById("ultimate").innerHTML = "Ultimate Pet (3250 Orbs)";
  }

  alert("Welcome to the Pet Incremental! Hit $1 million to win!");

  /*
  const stage1 = 1;
  const stage2 = 2;

  const data = {stage1, stage2}
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  const url = 'https://petIncrementalServer.danielyuan.repl.co/api';
  
  fetch(url, options)
    .then(p => {
      return p.json();
    })
    .then(p => {
      console.log(p);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    */
}

function stageChanger(){
  if(segway.count >= 1 && gameData.stage.localeCompare('SquareDet') != 0)
  {
    gameData.stage = 'SquareDet';
    document.getElementById("gif-holder").style.backgroundImage = "url('https://3.bp.blogspot.com/-uRhIj0ruaJ8/UXXz_xYsc2I/AAAAAAAAIYM/pRdmC-fsxN4/s1600/earth.gif')";
    document.getElementById("pet").src = gameData.stage + "/" + gameData.currentPet + ".png";
  }
  else if(field.count >= 1 && gameData.stage.localeCompare('Round') != 0 && gameData.stage.localeCompare('SquareDet') != 0)
  {
    gameData.stage = 'Round';
    document.getElementById("gif-holder").style.backgroundImage = "url('https://media3.giphy.com/media/l2SpWCaJzAkSk7Mgo/giphy.gif')";
    document.getElementById("pet").src = gameData.stage + "/" + gameData.currentPet + ".png";
  }
}



var bear = {
  name: "bear",
  available: false,
  cost: 975
}
var chicken = {
  name: "chicken",
  available: true,
  cost: 975
}
var pig = {
  name: "pig",
  available: true,
  cost: 975
}
var duck = {
  name: "duck",
  available: true,
  cost: 975
}
var chick = {
  name: "chick",
  available: true,
  cost: 975
}
var cow = {
  name: "cow",
  available: true,
  cost: 975
}
var goat = {
  name: "goat",
  available: true,
  cost: 975
}
var dog = {
  name: "dog",
  available: true,
  cost: 975
}
var horse = {
  name: "horse",
  available: true,
  cost: 975
}
var rabbit = {
  name: "rabbit",
  available: true,
  cost: 975
}
var moose = {
  name: "moose",
  available: true,
  cost: 975
}
var frog = {
  name: "frog",
  available: true,
  cost: 975
}
var crocodile = {
  name: "crocodile",
  available: true,
  cost: 1350
}
var giraffe = {
  name: "giraffe",
  available: true,
  cost: 1350
}
var gorilla = {
  name: "gorilla",
  available: true,
  cost: 1350
}
var hippo = {
  name: "hippo",
  available: true,
  cost: 1350
}
var owl = {
  name: "owl",
  available: true,
  cost: 1350
}
var elephant = {
  name: "elephant",
  available: true,
  cost: 1350
}
var narwhal = {
  name: "narwhal",
  available: true,
  cost: 1820
}
var panda = {
  name: "panda",
  available: true,
  cost: 1820
}
var penguin = {
  name: "penguin",
  available: true,
  cost: 1820
}
var parrot = {
  name: "parrot",
  available: true,
  cost: 3250
}


var pets = [bear, chicken, pig, duck, chick, cow, goat, dog, horse, rabbit, moose, frog, crocodile, giraffe, gorilla, hippo, owl, elephant, narwhal, panda, penguin, parrot];

var common = [bear, chicken, pig, duck, chick, cow, goat, dog, horse, rabbit, moose, frog];

var epic = [crocodile, giraffe, gorilla, hippo, owl, elephant];

var legendary = [narwhal, panda, penguin];

