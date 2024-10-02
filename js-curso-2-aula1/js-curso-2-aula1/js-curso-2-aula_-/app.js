let arraySortedNumbers = [];
let maximumNumber = 100;
let tries = 1;
let secretNumber = generateRandomNumber();

displayHomeMessage();

function displayTextOnScreen(tag,text) {
    let campo = document.querySelector(tag);
    campo.innerHTML = text;
    responsiveVoice.speak(text,'US English Female',{rate:1.2});
}

function displayHomeMessage() {
    displayTextOnScreen('h1','Secret number game');
    let numberMessage = `Choose a number from 1 to ${maximumNumber}.`;
    displayTextOnScreen('p',numberMessage);
}

function checkGuess() {
    let guess = document.querySelector('input').value;
    
    if (guess == secretNumber) {
        displayTextOnScreen('h1','Correct!');
        let wordTries = tries > 1 ? 'tries' : 'try';
        let messageTries = `You discovered the secret number with ${tries} ${wordTries}.`;
        displayTextOnScreen('p',messageTries);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if (guess > secretNumber) {
            displayTextOnScreen('p','The secret number is lower.');
        } else {
            displayTextOnScreen('p','The secret number is higher.');
        }
        tries++;
        cleanField();
    }
}

function generateRandomNumber() {
    let choosenNumber = parseInt(Math.random() * maximumNumber + 1);
    let quantityElementsInArray = arraySortedNumbers.length;

    if (quantityElementsInArray == maximumNumber) {
        arraySortedNumbers = [];
    }

    if (arraySortedNumbers.includes(choosenNumber)) {
        return generateRandomNumber();
    } else {
        arraySortedNumbers.push(choosenNumber);
        return choosenNumber;
    }
}

function cleanField() {
    guess = document.querySelector('input');
    guess.value = ''
}

function restartGame() {
    secretNumber = generateRandomNumber();
    cleanField();
    tries = 1;
    displayHomeMessage();
    document.getElementById('restart').setAttribute('disabled',true);
}