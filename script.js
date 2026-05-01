// Load crossword puzzles from the JSON file
const puzzlesUrl = 'crossword_puzzles.json';

fetch(puzzlesUrl)
    .then(response => response.json())
    .then(data => {
        const randomPuzzle = getRandomPuzzle(data);
        displayHints(randomPuzzle);
        displayPuzzle(randomPuzzle);
        displayWordsForTesting(randomPuzzle);
    });

// Get a random crossword puzzle
function getRandomPuzzle(puzzles) {
    const randomIndex = Math.floor(Math.random() * puzzles.length);
    return puzzles[randomIndex];
}

// Display across and down hints
function displayHints(puzzle) {
    const acrossHintList = document.getElementById('across-hint-list');
    const downHintList = document.getElementById('down-hint-list');

    puzzle.across.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `Word ${index + 1}: ${entry.hints.join(' / ')}`;
        acrossHintList.appendChild(li);
    });

    puzzle.down.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `Word ${index + 1}: ${entry.hints.join(' / ')}`;
        downHintList.appendChild(li);
    });
}

// Display the crossword puzzle grid
function displayPuzzle(puzzle) {
    const crosswordTable = document.getElementById('crossword');

    // Create 5x5 grid (assuming fixed size for now)
    for (let row = 0; row < 5; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 5; col++) {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.maxLength = 1;

            // Determine if this cell is part of a word or a black square
            const acrossWord = puzzle.across[row]?.word[col];
            const downWord = puzzle.down[col]?.word[row];

            if (acrossWord === '_' || downWord === '_') {
                td.classList.add('black');
            } else {
                td.appendChild(input);
            }

            tr.appendChild(td);
        }
        crosswordTable.appendChild(tr);
    }
}

// Display across and down words (for testing)
function displayWordsForTesting(puzzle) {
    const acrossWords = document.getElementById('across-words');
    const downWords = document.getElementById('down-words');

    acrossWords.textContent = `Across Words: ${puzzle.across.map(entry => entry.word).join(', ')}`;
    downWords.textContent = `Down Words: ${puzzle.down.map(entry => entry.word).join(', ')}`;
}
