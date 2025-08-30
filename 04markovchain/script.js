const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", () => {
    const inputValue = document.getElementById("input").value;
    const outputElement = document.getElementById("output");
    const wordTable = generateTable(inputValue);
    const output = document.createTextNode(createTextFrom(wordTable));
    outputElement.appendChild(output);
});

function generateTable(inputText) {
    const wordTable = Object.create(null);
    const words = inputText.trim().toLowerCase().split(/\s+/);

    for (let i = 0; i < words.length; i++) {
        const current = words[i];
        const next = words[i + 1] || "";
        if (/^\p{L}+$/u.test(current)) {
            if (!wordTable[current]) wordTable[current] = [];
            wordTable[current].push(next);
        }
    }

    return wordTable;
}

function createTextFrom(table) {
    const newText = [];
    const keys = Object.keys(table);
    const randomPick = size => Math.floor(size * Math.random());

    let current = keys[randomPick(keys.length)];

    for (let i = 0; i < keys.length; i++) {
        newText.push(current);
        const nextOptions = table[current];
        if (!nextOptions || nextOptions.length === 0) break;
        current = nextOptions[randomPick(nextOptions.length)];
    }

    newText.push(" ");
    return newText.join(" ");
}
