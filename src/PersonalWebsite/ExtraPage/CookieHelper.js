export function createCookie(name,value,days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
        expires = "; expires=" + date.toGMTString() + "; SameSite=Strict";
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

export function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

export function eraseCookie(name) {
    createCookie(name,"",-1);
}

export function updateGameHighScore(game, score) {
    let highScores = readCookie(`${game}HighScores`);
    if(highScores === null) {
        highScores = [score];
    }
    else {
        highScores = JSON.parse(highScores);
        highScores.push(score);
        highScores = highScores.sort(function (a, b) { return a - b; }).reverse();
    }
    if(highScores.length > 5) {
        highScores = highScores.slice(0, 5);
    }
    else {
        while (highScores.length < 5) {
            highScores.push(0)
        }
    }
    createCookie(`${game}HighScores`, JSON.stringify(highScores), 300);
}

export function getHighScores(game) {
    let highScores = readCookie(`${game}HighScores`);
    if(highScores === null) highScores = [0, 0, 0, 0, 0];
    else highScores = JSON.parse(highScores);
    return highScores;
}

export function setSettingDefaults() {
    if(readCookie('snake-speed') == null) createCookie("snake-speed", "medium", 300);
    if(readCookie('snake-fruit') == null) createCookie("snake-fruit", "1", 300);
    if(readCookie('minesweeper-size') == null) createCookie("minesweeper-size", "medium", 300);
    if(readCookie('minesweeper-difficulty') == null) createCookie("minesweeper-difficulty", "medium", 300);
}