/*
=========================================================
BG3 CHARACTER ROULETTE
Version 0.2 Alpha
=========================================================
*/



/* =====================================================
   DATEN
===================================================== */

const races = [

"Mensch",
"Elf",
"Hochelf",
"Waldelf",
"Drow",
"Tiefling",
"Halbelf",
"Zwerg",
"Goldzwerg",
"Schildzwerg",
"Gnom",
"Felsengnom",
"Waldgnom",
"Halbling",
"Leichtfuß",
"Kräftiger Halbling",
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



const backgrounds = [

"Akolyth",
"Adliger",
"Charlatan",
"Krimineller",
"Volksheld",
"Soldat",
"Weiser",
"Seemann",
"Einsiedler",
"Unterhalter"

];



const genders = [

"Männlich",
"Weiblich"

];



const bodyTypes = [

"Schlank",
"Kräftig"

];



const voices = [

"Stimme 1",
"Stimme 2",
"Stimme 3",
"Stimme 4",
"Stimme 5",
"Stimme 6",
"Stimme 7",
"Stimme 8"

];



const faces = [

"Zufällig"

];



const hairstyles = [

"Zufällig"

];



const hairColors = [

"Schwarz",
"Braun",
"Dunkelbraun",
"Hellbraun",
"Blond",
"Platinblond",
"Rot",
"Weiß",
"Grau",
"Silber"

];



const eyeColors = [

"Braun",
"Blau",
"Grün",
"Grau",
"Gold",
"Bernstein",
"Rot",
"Lila"

];



const skinColors = [

"Hell",
"Gebräunt",
"Oliv",
"Dunkel"

];



const tattoos = [

"Keine",
"Zufällig"

];



const scars = [

"Keine",
"Zufällig"

];



/* =====================================================
   HILFSFUNKTIONEN
===================================================== */

function random(array){

return array[Math.floor(Math.random()*array.length)];

}



function setValue(id,value){

const element=document.getElementById(id);

if(!element) return;

element.textContent=value;

element.classList.remove("changed");

void element.offsetWidth;

element.classList.add("changed");

}
/* =====================================================
   CHARAKTER GENERIEREN
===================================================== */

function generateCharacter(prefix){

setValue(prefix + "Race", random(races));

setValue(prefix + "Subrace", "Zufällig");

setValue(prefix + "Class", random(classes));

setValue(prefix + "Subclass", "Zufällig");

setValue(prefix + "Background", random(backgrounds));

setValue(prefix + "Gender", random(genders));

setValue(prefix + "Bodytype", random(bodyTypes));

setValue(prefix + "Voice", random(voices));

setValue(prefix + "Face", random(faces));

setValue(prefix + "Hair", random(hairstyles));

setValue(prefix + "HairColor", random(hairColors));

setValue(prefix + "EyeColor", random(eyeColors));

setValue(prefix + "SkinColor", random(skinColors));

setValue(prefix + "Tattoo", random(tattoos));

setValue(prefix + "Scar", random(scars));

}



/* =====================================================
   GUARDIAN
===================================================== */

function generateGuardian(){

setValue("guardianRace", random(races));

setValue("guardianGender", random(genders));

setValue("guardianBody", random(bodyTypes));

setValue("guardianVoice", random(voices));

setValue("guardianFace", random(faces));

setValue("guardianHair", random(hairstyles));

setValue("guardianHairColor", random(hairColors));

setValue("guardianEyeColor", random(eyeColors));

setValue("guardianSkinColor", random(skinColors));

}



/* =====================================================
   GESAMTES ROULLETTE
===================================================== */

function rollCharacters(){

generateCharacter("");

// Spieler 1
setValue("race1", random(races));
setValue("subrace1", "Zufällig");
setValue("class1", random(classes));
setValue("subclass1", "Zufällig");
setValue("background1", random(backgrounds));
setValue("gender1", random(genders));
setValue("bodytype1", random(bodyTypes));
setValue("voice1", random(voices));
setValue("face1", random(faces));
setValue("hair1", random(hairstyles));
setValue("hairColor1", random(hairColors));
setValue("eyeColor1", random(eyeColors));
setValue("skinColor1", random(skinColors));
setValue("tattoo1", random(tattoos));
setValue("scar1", random(scars));


// Spieler 2
setValue("race2", random(races));
setValue("subrace2", "Zufällig");
setValue("class2", random(classes));
setValue("subclass2", "Zufällig");
setValue("background2", random(backgrounds));
setValue("gender2", random(genders));
setValue("bodytype2", random(bodyTypes));
setValue("voice2", random(voices));
setValue("face2", random(faces));
setValue("hair2", random(hairstyles));
setValue("hairColor2", random(hairColors));
setValue("eyeColor2", random(eyeColors));
setValue("skinColor2", random(skinColors));
setValue("tattoo2", random(tattoos));
setValue("scar2", random(scars));

generateGuardian();

}
/* =====================================================
   BUTTONS
===================================================== */

const rollButton = document.getElementById("rollButton");

if (rollButton) {

    rollButton.addEventListener("click", () => {

        rollButton.disabled = true;

        rollButton.textContent = "🎲 Würfeln...";

        document.querySelectorAll(".value").forEach(element => {

            element.classList.remove("changed");

        });

        setTimeout(() => {

            rollCharacters();

            rollButton.disabled = false;

            rollButton.textContent = "🎲 Charakter würfeln";

        }, 350);

    });

}



/* =====================================================
   ANIMATIONEN
===================================================== */

function animateValues() {

    document.querySelectorAll(".value").forEach(element => {

        element.classList.remove("changed");

        void element.offsetWidth;

        element.classList.add("changed");

    });

}



/* =====================================================
   SEITE GELADEN
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    rollCharacters();

    animateValues();

});



/* =====================================================
   HILFSFUNKTIONEN FÜR SPÄTERE VERSIONEN
===================================================== */

function randomBoolean() {

    return Math.random() >= 0.5;

}



function randomNumber(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}



/*
=========================================================

Ab Version 0.3 werden hier JSON-Dateien geladen:

- races.json
- classes.json
- appearance.json
- voices.json
- backgrounds.json

Dadurch können später alle BG3-Daten gepflegt werden,
ohne den JavaScript-Code anzupassen.

=========================================================
*/
/* =====================================================
   VERSION
===================================================== */

const APP = {

    version: "0.2 Alpha",

    game: "Baldur's Gate III Character Roulette"

};



console.log(APP.game);

console.log(APP.version);



/* =====================================================
   ZUKÜNFTIGE MODULE
===================================================== */

const modules = {

    races: true,

    classes: true,

    appearance: false,

    guardian: true,

    romance: false,

    diceAnimation: false,

    challenges: false,

    honourMode: false,

    darkUrge: false,

    exportPDF: false

};



/* =====================================================
   PLATZHALTER FÜR VERSION 0.3+
===================================================== */

async function loadData(){

    // data/races.json
    // data/classes.json
    // data/backgrounds.json
    // data/appearance.json

}



async function loadAppearance(){

}



async function loadClasses(){

}



async function loadBackgrounds(){

}



async function loadVoices(){

}



async function loadFaces(){

}



async function loadHair(){

}



async function loadGuardian(){

}



async function saveCharacter(){

}



async function exportPDF(){

}



/* =====================================================
   DEBUG
===================================================== */

console.table({

    Version:APP.version,

    Rassen:races.length,

    Klassen:classes.length,

    Hintergründe:backgrounds.length,

    Stimmen:voices.length,

    Haarfarben:hairColors.length,

    Augenfarben:eyeColors.length,

    Hautfarben:skinColors.length

});



/* =====================================================
   ENDE
===================================================== */
