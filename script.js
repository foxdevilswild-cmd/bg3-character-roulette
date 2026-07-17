/*
==========================================================
BG3 CHARACTER ROULETTE
Version 0.3
==========================================================
*/


const DATA = {};



async function loadJSON(file){

    const response = await fetch(file);

    if(!response.ok){

        throw new Error("Datei konnte nicht geladen werden: " + file);

    }

    return await response.json();

}



async function loadAllData(){

    DATA.races = await loadJSON("data/races.json");

    DATA.classes = await loadJSON("data/classes.json");

    DATA.backgrounds = await loadJSON("data/backgrounds.json");

    DATA.appearance = await loadJSON("data/appearance.json");

    DATA.voices = await loadJSON("data/voices.json");

    DATA.faces = await loadJSON("data/faces.json");

    DATA.hairstyles = await loadJSON("data/hairstyles.json");

    DATA.horns = await loadJSON("data/horns.json");

    DATA.tails = await loadJSON("data/tails.json");

    DATA.features = await loadJSON("data/raceFeatures.json");

}
function random(list){

    return list[Math.floor(Math.random()*list.length)];

}
function set(id,value){

    const element=document.getElementById(id);

    if(element){

        element.textContent=value;

    }

}
function getRandomRace(){

    return random(DATA.races.races);

}



function getRandomClass(){

    return random(DATA.classes.classes);

}



function getRandomBackground(){
    function getRaceFeatures(raceName){

    return DATA.features[raceName];

}
    function randomAppearance(race){

    const appearance = {};

    const features = getRaceFeatures(race.name);

    appearance.gender = random(DATA.appearance.appearance.genders);

    appearance.bodyType = random(race.bodyTypes);

    appearance.skin = random(DATA.appearance.appearance.skinTones);

    appearance.eye = random(DATA.appearance.appearance.eyeColors);

    appearance.hairColor = random(DATA.appearance.appearance.hairColors);

    appearance.voice = random(DATA.voices.voices);

    appearance.face = "Zufällig";

    appearance.hair = "Zufällig";

    appearance.tattoo = random(DATA.appearance.appearance.tattoos);

    appearance.scar = random(DATA.appearance.appearance.scars);

    appearance.makeup = random(DATA.appearance.appearance.makeup);

    appearance.piercing = random(DATA.appearance.appearance.piercings);



    if(features.beard){

        appearance.beard="Zufällig";

    }else{

        appearance.beard="-";

    }



    if(features.horns){

        appearance.horns=random(DATA.horns.hornStyles);

    }else{

        appearance.horns="-";

    }



    if(features.tail){

        appearance.tail=random(DATA.tails.dragonbornTails);

    }else{

        appearance.tail="-";

    }



    return appearance;

}

    return random(DATA.backgrounds.backgrounds);

}
function generatePlayer(number){

    const race = getRandomRace();

    const playerClass = getRandomClass();

    const background = getRandomBackground();

    const appearance = randomAppearance(race);



    set("race"+number,race.name);

    set("subrace"+number,random(race.subraces));



    set("class"+number,playerClass.name);

    set("subclass"+number,random(playerClass.subclasses));



    set("background"+number,background.name);



    set("gender"+number,appearance.gender);

    set("bodytype"+number,appearance.bodyType);

    set("voice"+number,appearance.voice);

    set("face"+number,appearance.face);

    set("hair"+number,appearance.hair);

    set("hairColor"+number,appearance.hairColor);

    set("eyeColor"+number,appearance.eye);

    set("skinColor"+number,appearance.skin);

    set("tattoo"+number,appearance.tattoo);

    set("scar"+number,appearance.scar);

}

function generateGuardian(){

    const race=getRandomRace();



    set("guardianRace",race.name);

    set("guardianGender",random(DATA.appearance.appearance.genders));

    set("guardianBody",random(DATA.appearance.appearance.bodyTypes));

}
function roll(){

    generatePlayer(1);

    generatePlayer(2);

    generateGuardian();

}
async function init(){

    await loadAllData();

    roll();

}
document
.getElementById("rollButton")
.addEventListener("click",roll);



init();
