const fs = require('node:fs')
const maxAmount = {
    red: 12,
    green: 13,
    blue: 14,
}

fs.readFile("./sample.txt", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    parseData(data)
})

function parseData(data) {
    const games = splitGames(data)
    let sum = 0
    games.forEach(game => {
        sum += parseGame(game)
    });
    console.log(sum);
}

function parseGame(game) {
    const gameId = getGameId(game)
    const sets = getSets(game)
    const pulls = getPulls(sets)
    const parsedPulls = parsePulls(pulls)
    const minimumPossibleValues = getMinimumPossibleValues(parsedPulls)
    let power = 1;
    minimumPossibleValues.forEach(value => {
        power *= value.number
    });
    return power
}

function getMinimumPossibleValues(parsedPulls) {
    let maxRed = 0
    let maxGreen = 0
    let maxBlue = 0
    parsedPulls.forEach(pull => {
        let pullNum = parseInt(pull.number)
        switch (pull.colour) {
            case "red":
                    if (pullNum > maxRed) {
                        maxRed = pullNum
                    }
                break;

            case "green":
                    if (pullNum > maxGreen) {
                        maxGreen = pullNum
                    }
                break;
        
            case "blue":
                    if (pullNum > maxBlue) {
                        maxBlue = pullNum
                    }
                break;

            default:
                break;
        }
    });
    return [{number: maxRed, colour: "red"}, {number: maxGreen, colour: "green"}, {number: maxBlue, colour: "blue"}]
}

function parsePulls(pulls) {
    let arr = []
    pulls.forEach(pull => {
        let space = pull.indexOf(" ")
        const num = pull.substring(0, space)
        const colour = pull.substring(space + 1, pull.length)
        arr.push({number: num, colour: colour})
    });
    return arr
}

function getPulls(sets) {
    let arr = []
    sets.forEach(set => {
        let startIndex = 1
        while (set.indexOf(",", startIndex) > 0) {
            let endIndex = set.indexOf(",", startIndex)
            let substring = set.substring(startIndex, endIndex)
            startIndex = endIndex + 2
            arr.push(substring)
        }
        let substring = set.substring(startIndex, set.length)
        arr.push(substring)
    });

    return arr
}

function getSets(game) {
    let arr = []
    let indexOfColon = game.indexOf(":")
    let startIndex = game.indexOf(" ", indexOfColon)

    while (game.indexOf(";", startIndex) > 0) {
        let endIndex = game.indexOf(";", startIndex)
        let substring = game.substring(startIndex, endIndex)
        startIndex = endIndex + 1
        arr.push(substring)
    }
    let substring = game.substring(startIndex, game.length)
    arr.push(substring)
    return arr
}

function getGameId(game) {
    let id = ""
    let startIndex = game.indexOf(" ")    
    let endIndex = game.indexOf(":")
    
    id = game.substring(startIndex, endIndex) 
    return id
}

function splitGames(data) {
    let arr = []
    let startingIndex = 0
    let endIndex = 0
    while (data.indexOf("\n", startingIndex) > 0) {
        let indexNewLine = data.indexOf("\n", startingIndex)
        endIndex = indexNewLine
        let substring = data.substring(startingIndex, endIndex)
        startingIndex = endIndex + 1
        arr.push(substring)
    }
    let substring = data.substring(startingIndex, data.length)
    arr.push(substring)
    return arr
}