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
        descriptions,
        names
    ] = await Promise.all([

        loadJSON("data/appearance.json"),
        loadJSON("data/backgrounds.json"),
        loadJSON("data/classes.json"),
        loadJSON("data/origins.json"),
        loadJSON("data/races.json"),
        loadJSON("data/romances.json"),
        loadJSON("data/descriptions.json"),
        loadJSON("data/names.json")

    ]);


    data = {

        appearance,
        backgrounds,
        classes,
        origins,
        races,
        romances,
        descriptions,
        names

    };

}



function random(array) {

    if (!array || array.length === 0) {
        return "Keine Auswahl";
    }

    return array[Math.floor(Math.random() * array.length)];
    }
    
function generateName(race, gender) {

    const raceNames = data.names[race];

    if (!raceNames) {
        return "Unbekannt";
    }

    if (gender === "Männlich") {
        return random(raceNames.male);
    }

    return random(raceNames.female);
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


function generateRomance(usedRomances = [], playerName = "") {

    let availableRomances =
        data.romances.romances.filter(
            romance => !usedRomances.includes(romance)
        );

    // Anni darf keinen Astarion bekommen 😉
    if (playerName === "Anni") {
        availableRomances =
            availableRomances.filter(
                romance => romance !== "Astarion"
            );
    }

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


    const gender =
        random(data.appearance.gender);


    const raceFaceData =
        data.appearance.faces[race];


    const genderKey =
        gender === "Männlich"
        ? "male"
        : "female";


    const raceData =
        data.appearance.raceAppearance[race];


    return {

        gender: gender,


     bodyType:
    gender === "Weiblich"
        ? random(["Körpertyp 1", "Körpertyp 3"])
        : random(["Körpertyp 2", "Körpertyp 4"]),


        voice:
            random(data.appearance.voices),


        face:
            raceFaceData
            ?
            random(raceFaceData[genderKey])
            :
            "Beliebig",


        hairstyle:
            random(data.appearance.hairstyles),

horns:
    data.appearance.horns[race]
    ?
    random(data.appearance.horns[race])
    :
    "Keine",
        
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



function generatePlayer(playerName, usedRomances = []) {


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
        generateRomance(usedRomances, playerName),

    appearance:
        generateAppearance(race.race)

};

player.name =
    generateName(
        player.race,
        player.appearance.gender
    );

player.description =
    generateDescription(player);

return player;

}
function renderSummary(player, container) {


    container.innerHTML = `

</div>

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
    
<div class="character-name">

    ${player.name}

</div>

       <div class="character-tags">

    <span class="tag">
        ${player.race}
    </span>

    <span class="tag">
        ${player.class}
    </span>

</div>
<div class="gold-divider">
    <span>✦</span>
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


    const button =
        document.querySelector("#rollButton");


    button.classList.add("rolling");


    status.innerHTML =
        "🎲 Dein Schicksal wird gewürfelt...";


    status.classList.add("active");


setTimeout(() => {

    status.innerHTML =
        "✨ Dein Charakter steht fest";

},1800);


    setTimeout(() => {

        status.classList.remove("active");

        button.classList.remove("rolling");

    },2500);

}


function roll() {


    animateRoll();


    setTimeout(() => {


        const usedRomances = [];


       const playerOne =
    generatePlayer("Anni", usedRomances);
     
        usedRomances.push(playerOne.romance);


       const playerTwo =
    generatePlayer("Jenny", usedRomances);

        renderPlayer(

            playerOne,

            document.querySelector("#playerOne")

        );


        renderPlayer(

            playerTwo,

            document.querySelector("#playerTwo")

        );


        renderSummary(

            playerOne,

            document.querySelector("#summary1")

        );


        renderSummary(

            playerTwo,

            document.querySelector("#summary2")

        );


    }, 1800);


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
