
class Highscore {
    constructor(score, pseudo, pays) {
        this.score = score;
        this.pseudo = pseudo;
        this.pays = pays;
    }

    clear() {
        this.score = null;
        this.pseudo = null;
        this.pays = null;
    }
}

class Speedrun {
    constructor(temps, pseudo, pays) {
        this.temps = temps;
        this.pseudo = pseudo;
        this.pays = pays;
    }

    addTemps(temps, pseudo, pays) {
        this.temps.push(temps);
        this.pseudo.push(pseudo);
        this.pays.push(pays);
    }

    clear() {
        this.temps = null;
        this.pseudo = null;
        this.pays = null;
    }
}

class Niveau {
    constructor(name) {
        this.name = name;
        this.highscore = [];
        this.speedrun = [];
    }

    static from(json){
        return Object.assign(new Niveau(), json);
    }
}

class Game {
    constructor(name, image) {
        this.name = name;
        this.image = image;
        this.niveaux = [];
    }

    static from(json){
        return Object.assign(new Game(), json);
    }

    addNiveau (name) {
        this.niveaux.push(new Niveau(name));
    }
}

class Suggestion {
    constructor(name, image) {
        this.name = name;
        this.image = image;
        this.validate = 0;
    }

    setSalidate(validation) {
        this.validate = validation;
    }

    static from(json){
        return Object.assign(new Suggestion(), json);
    }
}

function setup() {
    let games = {
        games : [
            new Game("Gotta Go Fast", "https://github.com/BenjaminLesieux/Gotta-Go-Fast/blob/master/images/GGf.jpg?raw=true"),
            new Game("DOOM Eternal", "https://www.playstationlifestyle.net/assets/uploads/2020/03/Doom-Eternal-Review-2.jpg"),
            new Game("Mariokart 8", "https://cdn.wccftech.com/wp-content/uploads/2017/04/mario_kart_8_deluxe_art.jpg"),
        ]
    }
    let suggestions = {
        suggestions : []
    }

    games.games[0].addNiveau("Niveau 1")
    games.games[0].addNiveau("Niveau 2")
    games.games[0].addNiveau("Niveau 3")
    games.games[0].addNiveau("Niveau 4")
    games.games[1].addNiveau("Hell on Earth")
    games.games[1].addNiveau("Exultia")
    games.games[1].addNiveau("Cultist Base")
    games.games[1].addNiveau("Domm Hunter Base")
    games.games[1].addNiveau("Super Gore Nest")
    games.games[1].addNiveau("Arc Complex")
    games.games[1].addNiveau("Mars Core")
    games.games[1].addNiveau("Sentinel Prime")
    games.games[1].addNiveau("Taras Nabad")
    games.games[1].addNiveau("Nekravol 1")
    games.games[1].addNiveau("Nekravol 2")
    games.games[1].addNiveau("Urdak")
    games.games[1].addNiveau("Final Sin")
    games.games[2].addNiveau("Circuit Arc-en-Ciel")
    games.games[2].addNiveau("Circuit Mario")
    games.games[2].addNiveau("Chateau de Bowser")

    let games_serialized = JSON.stringify(games);
    let suggestions_serialized = JSON.stringify(suggestions)

    localStorage.setItem("games", games_serialized);
    localStorage.setItem("suggestions", suggestions_serialized);

    location.reload()
}

function clearAll() {
    window.localStorage.clear();
}

let games_deserialized = JSON.parse(localStorage.getItem("games"));
let suggestions_deserialized = JSON.parse(localStorage.getItem("suggestions"));

if (games_deserialized === null) {
    console.log("setup")
    setup();
    games_deserialized = JSON.parse(localStorage.getItem("games"));
}

let suggestions = suggestions_deserialized.suggestions;
let games = games_deserialized.games;



function updateGames() {
    const games_serialized = JSON.stringify(games_deserialized);
    localStorage.setItem("games", games_serialized);
    console.log("Games updated : ", games_serialized);
}

function updateSuggestions() {
    const suggestions_serialized = JSON.stringify(suggestions_deserialized)
    localStorage.setItem("suggestions", suggestions_serialized);
    console.log("suggestions updated : ", suggestions_serialized);
}

function printGames() {
    console.log(games_deserialized);
}

function printSuggestions() {
    console.log(suggestions_deserialized)
}

// source : https://geraintluff.github.io/sha256/
function sha256(ascii) {
    function rightRotate(value, amount) {
        return (value>>>amount) | (value<<(32 - amount));
    }

    let mathPow = Math.pow;
    let maxWord = mathPow(2, 32);
    let lengthProperty = 'length'
    let i, j; // Used as a counter across the whole file
    let result = ''

    let words = [];
    let asciiBitLength = ascii[lengthProperty]*8;

    //* caching results is optional - remove/add slash from front of this line to toggle
    // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
    // (we actually calculate the first 64, but extra values are just ignored)
    let hash = sha256.h = sha256.h || [];
    // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
    let k = sha256.k = sha256.k || [];
    let primeCounter = k[lengthProperty];
    /*/
    let hash = [], k = [];
    let primeCounter = 0;
    //*/

    let isComposite = {};
    for (let candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) {
                isComposite[i] = candidate;
            }
            hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
            k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
        }
    }

    ascii += '\x80' // Append Ƈ' bit (plus zero padding)
    while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j>>8) return; // ASCII check: only accept characters in range 0-255
        words[i>>2] |= j << ((3 - i)%4)*8;
    }
    words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
    words[words[lengthProperty]] = (asciiBitLength)

    // process each chunk
    for (j = 0; j < words[lengthProperty];) {
        let w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
        let oldHash = hash;
        // This is now the undefinedworking hash", often labelled as letiables a...g
        // (we have to truncate as well, otherwise extra entries at the end accumulate
        hash = hash.slice(0, 8);

        for (i = 0; i < 64; i++) {
            let i2 = i + j;
            // Expand the message into 64 words
            // Used below if
            let w15 = w[i - 15], w2 = w[i - 2];

            // Iterate
            let a = hash[0], e = hash[4];
            let temp1 = hash[7]
                + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
                + ((e&hash[5])^((~e)&hash[6])) // ch
                + k[i]
                // Expand the message schedule if needed
                + (w[i] = (i < 16) ? w[i] : (
                        w[i - 16]
                        + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
                        + w[i - 7]
                        + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
                    )|0
                );
            // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
            let temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj

            hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
            hash[4] = (hash[4] + temp1)|0;
        }

        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i])|0;
        }
    }

    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            let b = (hash[i]>>(j*8))&255;
            result += ((b < 16) ? 0 : '') + b.toString(16);
        }
    }
    return result;
}

function admin() {
    let pass = prompt("Mot de passe admin : ");
    if (sha256(pass) === "f2d33bfa82a3fe93bb356ccef5d71d1a086dd8d081397f9770420ca085e7797b") {
        alert("Bienvenue admin !");
        return true
    } else {
        alert("Vous n'êtes pas admin !");
        return false
    }
}

function foo(item) {
    return item !== undefined && item !== null;
}

function checkValidity(block) {
    for (let i = 0; i < block.length; i++) {
        if (block[i].value === "") {
            alert("'" + block[i].id + "' n'est pas bien rempli !")
            block[i].focus()
            return false;
        }
    }

    return true
}