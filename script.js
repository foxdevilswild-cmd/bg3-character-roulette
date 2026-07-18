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
        romances
    ] = await Promise.all([
        loadJSON("data/appearance.json"),
        loadJSON("data/backgrounds.json"),
        loadJSON("data/classes.json"),
        loadJSON("data/origins.json"),
        loadJSON("data/races.json"),
        loadJSON("data/romances.json")
    ]);

    data = {
        appearance,
        backgrounds,
        classes,
        origins,
        races,
        romances
    };
}


function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}


function randomRace() {
    const race = random(data.races.races);

    let subrace = null;

    if (race.subraces.length > 0) {
        subrace = random(race.subraces);
    }

    return {
        race: race.name,
        subrace
    };
}


function randomClass() {
    const characterClass = random(data.classes.classes);

    return {
        class: characterClass.name,
        subclass: random(characterClass.subclasses)
    };
}


function generateAppearance() {

    return {
        gender: random(data.appearance.gender),
        bodyType: random(data.appearance.bodyTypes),
        voice: random(data.appearance.voices),
        face: random(data.appearance.faces),
        hairstyle: random(data.appearance.hairstyles),
        hairColor: random(data.appearance.hairColors),
        eyeColor: random(data.appearance.eyeColors),
        skinColor: random(data.appearance.skinColors),
        tattoo: random(data.appearance.tattoos),
        scars: random(data.appearance.scars),
        piercing: random(data.appearance.piercings),
        makeup: random(data.appearance.makeup)
    };

}


function generatePlayer() {

    const origin = random(data.origins.origins);

    let race;
    let characterClass;


    if (origin.fixed) {

        race = {
            race: origin.race,
            subrace: origin.subrace
        };

        characterClass = {
            class: origin.class,
            subclass: "Zufällig"
        };

    } else {

        race = randomRace();
        characterClass = randomClass();

    }


    return {

        origin: origin.name,

        race: race.race,
        subrace: race.subrace,

        class: characterClass.class,
        subclass: characterClass.subclass,

        background: random(data.backgrounds.backgrounds),

        romance: random(data.romances.romances),

        appearance: generateAppearance()

    };

}


function renderPlayer(player, container) {

    container.innerHTML = `

        <div class="origin-badge">
            ${player.origin}
        </div>

        <h2>${player.origin}</h2>

        <p><strong>Rasse:</strong> ${player.race}</p>

        ${
            player.subrace
            ? `<p><strong>Unterrasse:</strong> ${player.subrace}</p>`
            : ""
        }

        <p><strong>Klasse:</strong> ${player.class}</p>

        <p><strong>Unterklasse:</strong> ${player.subclass}</p>

        <p><strong>Hintergrund:</strong> ${player.background}</p>

        <p><strong>Romanze:</strong> ${player.romance}</p>


        <hr>


        <p><strong>Geschlecht:</strong> ${player.appearance.gender}</p>

        <p><strong>Körper:</strong> ${player.appearance.bodyType}</p>

        <p><strong>Stimme:</strong> ${player.appearance.voice}</p>

        <p><strong>Gesicht:</strong> ${player.appearance.face}</p>

        <p><strong>Frisur:</strong> ${player.appearance.hairstyle}</p>

        <p><strong>Haarfarbe:</strong> ${player.appearance.hairColor}</p>

        <p><strong>Augenfarbe:</strong> ${player.appearance.eyeColor}</p>

        <p><strong>Hautfarbe:</strong> ${player.appearance.skinColor}</p>

        <p><strong>Tattoo:</strong> ${player.appearance.tattoo}</p>

        <p><strong>Narben:</strong> ${player.appearance.scars}</p>

        <p><strong>Piercing:</strong> ${player.appearance.piercing}</p>

        <p><strong>Make-up:</strong> ${player.appearance.makeup}</p>

    `;
}


function animateRoll() {

    const button = document.querySelector("#rollButton");

    button.classList.add("rolling");

    setTimeout(() => {
        button.classList.remove("rolling");
    }, 700);

}


function roll() {

    animateRoll();


    const playerOne = generatePlayer();
    const playerTwo = generatePlayer();


    renderPlayer(
        playerOne,
        document.querySelector("#playerOne")
    );


    renderPlayer(
        playerTwo,
        document.querySelector("#playerTwo")
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
