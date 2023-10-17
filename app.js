
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btnReset = document.querySelector('.btn__reset');
const overlayDiv = document.getElementById('overlay');
const ul = document.querySelector('#phrase ul');
const listItems = ul.children;


const arrOfPhrases = [
    'This fall the weather is going to be beautiful',
    'The cat on the roof is scared by the dog looking at her',
    'The trip to Florida last week was an amazing experience',
    'The Appalachian Mountains offer incredible hiking trails',
    'The hotel on the right side of the street is beautiful'
];

//return a random phrase from an array 
const getRandomPhraseAsArray = arr => {
    const randomNumber = Math.floor(Math.random() * arr.length);
    const selectedPhrase = arr[randomNumber];
    const newArrOfCharcs = selectedPhrase.split('');
    return newArrOfCharcs;
}

btnReset.addEventListener('click', (e) => {
    overlayDiv.style.display = 'none';
});

//adds the letters of a string of characters to the display 

const addPhraseToDisplay = arr => {
    for ( let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        const character = arr[i];
        li.textContent = character;
        if (character === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
    ul.appendChild(li);
  }
}

const characs = getRandomPhraseAsArray(arrOfPhrases);
addPhraseToDisplay(characs);

//check if a letter is in the phrase 
const checkLetter = button => { 
    const listItems = ul.children;
    let match = null;

    for (let i = 0; i < listItems.length; i++) {
        if (button.textContent.toLowerCase() === listItems[i].textContent.toLowerCase()) {
            listItems[i].className = 'show';
            match += button.textContent;
        }   
    }
    return match;
}

//check if the game has been won or lost 
const checkWin = () => {
    let liItems = ul.children;
    let liLetter = [];
    let liShow = [];
    for (let i = 0; i < liItems.length; i++) {
        if (liItems[i].className === 'letter') {
        liLetter.push(liItems[i]);
        } else if (liItems[i].className === 'show') {
        liShow.push(liItems[i])
        }   
    }   
    if (liLetter.length === liShow.length) {
        const h2 = overlayDiv.firstElementChild;
        overlayDiv.className = 'win';
        h2.textContent = 'Well done. You won!'
        overlayDiv.style.display = 'flex';
    } 
}


let missed = 0;
const heartElements = document.querySelectorAll('.tries');

//listen for the onscreen keyboard to be clicked
keyboard.addEventListener('click', (e) => {
    const button = e.target;
    if (button.tagName === 'BUTTON' && button.className.indexOf('chosen') === -1) {
        button.className += ' chosen';
        const letterFound = checkLetter(button);
    
    if (letterFound === null) {
        missed ++;
        if (missed <= heartElements.length) {
            heartElements[heartElements.length - missed].innerHTML = '<img src="images/lostHeart.png" height="35px" width="30px">';
        }
    }
  }
  checkWin();
}); 







