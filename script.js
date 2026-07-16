const races = [

"Mensch",

"Elf",

"Zwerg",

"Gnom",

"Halbling",

"Tiefling",

"Drow",

"Halbork",

"Githyanki",

"Drachenblütiger"

];

 

const classes = [

"Barbar",

"Barde",

"Kleriker",

"Druide",

"Kämpfer",

"Mönch",

"Paladin",

"Waldläufer",

"Schurke",

"Hexenmeister",

"Zauberer",

"Magier"

];

 

const genders = [

"Männlich",

"Weiblich"

];

 

function random(array){

 

return array[Math.floor(Math.random()*array.length)];

 

}

 

document.getElementById("rollButton").addEventListener("click",function(){

 

document.getElementById("race1").textContent=random(races);

document.getElementById("class1").textContent=random(classes);

document.getElementById("gender1").textContent=random(genders);

 

document.getElementById("race2").textContent=random(races);

document.getElementById("class2").textContent=random(classes);

document.getElementById("gender2").textContent=random(genders);

 

document.getElementById("guardianRace").textContent=random(races);

document.getElementById("guardianGender").textContent=random(genders);

 

});
