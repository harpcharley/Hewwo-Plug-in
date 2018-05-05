let keyLetters = "l|r|L|R".split('|')   //look at all L's and R's

function makeHewwo(text) {
    var newText = "";
    for (character in text) {
        if (character == 'l' || character == 'r')
            character = 'w';
        if (character == 'L' || character == 'R')
            character = 'W';
        newText = newText.concat(character);
    }
    return newText;
}

let cleanup = word => {
    document.title = document.title.split("").map(word => {
        return keyLetters.indexOf(word.toLowerCase()) != -1 ? 'w' : word
    }).join('');
}

let createObserver = function() {
    let observer = new MutationObserver((mutations) => {
        console.log('Mutations!', mutations);
        observer.disconnect();
        observer = null;
        cleanup();
        createObserver();
    })
    observer.observe(
        document.querySelector('title'),
        { subtree: true, characterData: true, childList: true }
    )
}

createObserver()
cleanup()

