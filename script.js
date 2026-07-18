console.log("script geladen");

let data = {};


async function loadJSON(file) {

    const response = await fetch(file);

    return await response.json();

}



async function loadAllData() {

    const [
        appearance,
        backgrounds,
        classes,
        origins,
        races,
        romances,
        descriptions
    ] = await Promise.all([

        loadJSON("data/appearance.json"),
        loadJSON("data/backgrounds.json"),
        loadJSON("data/classes.json"),
        loadJSON("data/origins.json"),
        loadJSON("data/races.json"),
        loadJSON("data/romances.json"),
        loadJSON("data/descriptions.json")

    ]);


    data = {

        appearance,
        backgrounds,
        classes,
        origins,
        races,
        romances,
        descriptions

    };

}




function random(array) {

    if (!array || array.length === 0) {
        return "Keine Auswahl";
    }

    return array[Math.floor(Math.random() * array.length)];

}




function generateRace() {

    const race = random(data.races.races);


    let subrace = null;


    if (race.subraces.length > 0) {

        subrace = random(race.subraces);

    }


    return {

        race: race.name,
        subrace: subrace

    };

}


function generateRomance(usedRomances = []) {

    const availableRomances =
        data.romances.romances.filter(
            romance => !usedRomances.includes(romance)
        );


    return random(availableRomances);

}

function generateClass() {

    const characterClass =
        random(data.classes.classes);


    return {

        class: characterClass.name,

        subclass:
            random(characterClass.subclasses)

    };

}




function generateAppearance(race) {

    const raceData =
        data.appearance.raceAppearance[race];


    return {

        gender:
            random(data.appearance.gender),


        bodyType:
            random(data.appearance.bodyTypes),


        voice:
            random(data.appearance.voices),


        face:
            random(data.appearance.faces),


        hairstyle:
            random(data.appearance.hairstyles),


        hairColor:
            raceData
            ?
            random(raceData.hairColors)
            :
            "Beliebig",


        eyeColor:
            raceData
            ?
            random(raceData.eyeColors)
            :
            "Beliebig",


        skinColor:
            raceData
            ?
            random(raceData.skinColors)
            :
            "Beliebig",


        tattoo:
            random(data.appearance.tattoos),


        scars:
            random(data.appearance.scars),


        piercing:
            random(data.appearance.piercings),


        makeup:
            random(data.appearance.makeup)

    };

}
function generateDescription(player) {

    const raceDescriptions =
        data.descriptions.races[player.race];


    const classDescriptions =
        data.descriptions.classes[player.class];


    const raceText =
        random(raceDescriptions);


    const classText =
        random(classDescriptions);


    return `${raceText} ${classText}`;

}



function generatePlayer(usedRomances = []) {


    const origin =
        random(data.origins.origins);


    const race =
        generateRace();


    const characterClass =
        generateClass();



   const player = {

    origin:
        origin.name,


    race:
        race.race,


    subrace:
        race.subrace,


    class:
        characterClass.class,


    subclass:
        characterClass.subclass,


    background:
        random(data.backgrounds.backgrounds),


    romance:
        generateRomance(usedRomances),


    appearance:
        generateAppearance(race.race)

};



player.description =
    generateDescription(player);

    return player;

}

function renderSummary(player, container) {


    container.innerHTML = `


        <h3>
            ${player.name || "Abenteurer"}
        </h3>


        <p>
            ${player.race}
            ·
            ${player.class}
        </p>


        <p>
            Romanze:
            <strong>${player.romance}</strong>
        </p>


    `;


}

function renderPlayer(player, container) {
container.parentElement.classList.remove("reveal");

setTimeout(() => {

    container.parentElement.classList.add("reveal");

},50);

    container.innerHTML = `


       <div class="character-tags">

    <span class="tag">
        ${player.race}
    </span>

    <span class="tag">
        ${player.class}
    </span>

</div>


        ${
            player.subrace
            ?
            `
            <div class="attribute">
                <span class="label">Unterrasse</span>
                <span class="value">${player.subrace}</span>
            </div>
            `
            :
            ""
        }


        <div class="subclass-title">

${player.subclass}

</div>



        <div class="attribute">
            <span class="label">Hintergrund</span>
            <span class="value">${player.background}</span>
        </div>



        <div class="attribute romance-box">

    <span class="label">
        ♥ Romanze
    </span>

    <span class="value">
        ${player.romance}
    </span>

</div>



        <div class="description">

    <p>
        ${player.description}
    </p>

</div>



               <hr>


        <div class="attribute">
            <span class="label">Geschlecht</span>
            <span class="value">${player.appearance.gender}</span>
        </div>


        <div class="attribute">
            <span class="label">Körpertyp</span>
            <span class="value">${player.appearance.bodyType}</span>
        </div>


        <div class="attribute">
            <span class="label">Stimme</span>
            <span class="value">${player.appearance.voice}</span>
        </div>


        <div class="attribute">
            <span class="label">Gesicht</span>
            <span class="value">${player.appearance.face}</span>
        </div>


        <div class="attribute">
            <span class="label">Frisur</span>
            <span class="value">${player.appearance.hairstyle}</span>
        </div>


        <div class="attribute">
            <span class="label">Haarfarbe</span>
            <span class="value">${player.appearance.hairColor}</span>
        </div>


        <div class="attribute">
            <span class="label">Augenfarbe</span>
            <span class="value">${player.appearance.eyeColor}</span>
        </div>


        <div class="attribute">
            <span class="label">Hautfarbe</span>
            <span class="value">${player.appearance.skinColor}</span>
        </div>


        <div class="attribute">
            <span class="label">Tattoo</span>
            <span class="value">${player.appearance.tattoo}</span>
        </div>


        <div class="attribute">
            <span class="label">Narben</span>
            <span class="value">${player.appearance.scars}</span>
        </div>


        <div class="attribute">
            <span class="label">Piercing</span>
            <span class="value">${player.appearance.piercing}</span>
        </div>


        <div class="attribute">
            <span class="label">Make-up</span>
            <span class="value">${player.appearance.makeup}</span>
        </div>


    `;

}





function animateRoll() {

    const status =
        document.querySelector("#rollStatus");


    status.innerHTML =
        "🎲 Dein Schicksal wird gewürfelt...";


    status.classList.add("active");


    setTimeout(() => {

        status.innerHTML =
            "✨ Dein Charakter steht fest";

    },1200);


    setTimeout(() => {

        status.classList.remove("active");

    },2500);

}


function roll() {


    animateRoll();


const usedRomances = [];


const playerOne =
    generatePlayer(usedRomances);

playerOne.name = "Anni";


usedRomances.push(playerOne.romance);


const playerTwo =
    generatePlayer(usedRomances);

playerTwo.name = "Jenny";


    renderPlayer(

        playerOne,

        document.querySelector("#playerOne")

    );



    renderPlayer(

        playerTwo,

        document.querySelector("#playerTwo")

    );
console.log(document.querySelector("#summary1"));
    
    renderSummary(
    playerOne,
    document.querySelector("#summary1")
);


renderSummary(
    playerTwo,
    document.querySelector("#summary2")
);


}




async function init() {


    await loadAllData();



    document

        .querySelector("#rollButton")

        .addEventListener(

            "click",

            roll

        );


}



init();
