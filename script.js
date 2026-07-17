/*
==========================================================
BG3 CHARACTER ROULETTE
Version 1.0
Teil 1
NICHT EINFÜGEN
Warten bis ich "ENDE SCRIPT.JS" schreibe.
==========================================================
*/

const DATA = {};

const CONFIG = {

    players:2,

    animationSpeed:60,

    animationSteps:10

};

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

    DATA.features = await loadJSON("data/raceFeatures.json");

    DATA.origins = await loadJSON("data/origins.json");

    DATA.romances = await loadJSON("data/romances.json");

    DATA.deities = await loadJSON("data/deities.json");

}

function random(array){

    return array[Math.floor(Math.random()*array.length)];

}

function set(id,value){

    const element=document.getElementById(id);

    if(element){

        element.textContent=value;

    }

}

function getRaceFeatures(raceName){

    return DATA.features[raceName] || {};

}

function getRandomRace(){

    return random(DATA.races.races);

}

function getRandomClass(){

    return random(DATA.classes.classes);

}

function getRandomBackground(){

    return random(DATA.backgrounds.backgrounds);

}

function getRandomOrigin(){

    return random(DATA.origins.origins);

}

function getRandomRomance(){

    return random(DATA.romances.romances);

}

function getRandomDeity(){

    return random(DATA.deities.deities);

}function randomAppearance(race){

    const features = getRaceFeatures(race.name);

    return{

        gender:random(DATA.appearance.appearance.genders),

        bodyType:random(race.bodyTypes),

        voice:random(DATA.voices.voices),

        face:random(DATA.faces.faces),

        hair:random(DATA.hairstyles.hairstyles),

        hairColor:random(DATA.appearance.appearance.hairColors),

        eyeColor:random(DATA.appearance.appearance.eyeColors),

        skinColor:random(DATA.appearance.appearance.skinTones),

        tattoo:random(DATA.appearance.appearance.tattoos),

        scar:random(DATA.appearance.appearance.scars),

        piercing:random(DATA.appearance.appearance.piercings),

        makeup:random(DATA.appearance.appearance.makeup),

        horns:features.horns
            ? random(DATA.appearance.horns)
            : "—",

        tail:features.tail
            ? random(DATA.appearance.tails)
            : "—"

    };

}

function createCharacter(){

    return{

        origin:null,

        race:null,

        subrace:null,

        playerClass:null,

        subclass:null,

        background:null,

        deity:"—",

        romance:null,

        appearance:null

    };

}

function generatePlayer(number){

    const character=createCharacter();

    character.origin=getRandomOrigin();

    character.race=getRandomRace();

    character.subrace=random(character.race.subraces);

    character.playerClass=getRandomClass();

    character.subclass=random(character.playerClass.subclasses);

    character.background=getRandomBackground();

    character.romance=getRandomRomance();

    character.appearance=randomAppearance(character.race);

    if(character.playerClass.name==="Kleriker"){

        character.deity=getRandomDeity();

    }

    set("origin"+number,character.origin.name);

    set("race"+number,character.race.name);

    set("subrace"+number,character.subrace);

    set("class"+number,character.playerClass.name);

    set("subclass"+number,character.subclass);

    set("background"+number,character.background.name);

    set("deity"+number,character.deity);

    set("gender"+number,character.appearance.gender);

    set("bodytype"+number,character.appearance.bodyType);

    set("voice"+number,character.appearance.voice);

    set("face"+number,character.appearance.face);

    set("hair"+number,character.appearance.hair);

    set("hairColor"+number,character.appearance.hairColor);

    set("eyeColor"+number,character.appearance.eyeColor);

    set("skinColor"+number,character.appearance.skinColor);

    set("tattoo"+number,character.appearance.tattoo);

    set("scar"+number,character.appearance.scar);

    set("piercing"+number,character.appearance.piercing);

    set("makeup"+number,character.appearance.makeup);

    set("romance"+number,character.romance);

}function roll(){

    for(let i=1;i<=CONFIG.players;i++){

        generatePlayer(i);

    }

}

function animateRoll(){

    const values=document.querySelectorAll(".value");

    let counter=0;

    const interval=setInterval(()=>{

        values.forEach(value=>{

            value.textContent="🎲";

        });

        counter++;

        if(counter>=CONFIG.animationSteps){

            clearInterval(interval);

            roll();

        }

    },CONFIG.animationSpeed);

}

function bindEvents(){

    const button=document.getElementById("rollButton");

    button.addEventListener("click",()=>{

        button.disabled=true;

        animateRoll();

        setTimeout(()=>{

            button.disabled=false;

        },CONFIG.animationSteps*CONFIG.animationSpeed+100);

    });

}

function validateData(){

    console.log("===== BG3 Character Roulette =====");

    console.log(DATA);

    if(!DATA.races){

        throw new Error("races.json wurde nicht geladen.");

    }

    if(!DATA.classes){

        throw new Error("classes.json wurde nicht geladen.");

    }

    if(!DATA.backgrounds){

        throw new Error("backgrounds.json wurde nicht geladen.");

    }

    if(!DATA.appearance){

        throw new Error("appearance.json wurde nicht geladen.");

    }

    if(!DATA.origins){

        throw new Error("origins.json wurde nicht geladen.");

    }

    if(!DATA.romances){

        throw new Error("romances.json wurde nicht geladen.");

    }

}

async function init(){

    try{

        await loadAllData();

        validateData();

        bindEvents();

        roll();

        console.log("Generator erfolgreich gestartet.");

    }

    catch(error){

        console.error(error);

        alert(
            "Beim Laden der Daten ist ein Fehler aufgetreten.\n\n"+
            "Öffne die Konsole (F12), um die genaue Ursache zu sehen."
        );

    }

}

document.addEventListener("DOMContentLoaded",init);
