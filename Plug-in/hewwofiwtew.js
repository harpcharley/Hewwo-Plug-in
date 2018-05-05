

var pointy_bracket_count = 0;
var curly_bracket_count = 0;
var square_bracket_count = 0;
var total_bracket_count = 0
var scriptTally = 0;
var isScript = false;
var hewwo = false;


function checkHewwo(character){
    switch(character){
        case '<':
            hewwo = false;
            pointy_bracket_count++;
            total_bracket_count++;
            break;
        case '{':
            hewwo = false;
            curly_bracket_count++;
            total_bracket_count++;
            break;
        case '[':
            hewwo = false;
            square_bracket_count++;
            total_bracket_count++;
            break;
        case '>':
            hewwo = false;
            pointy_bracket_count--;
            total_bracket_count--; 
            if (!pointy_bracket_count && !total_bracket_count)  //if pointy_bracket_count == 0
                hewwo = true;
            break;
        case '}':
            hewwo = false;
            curly_bracket_count--;
            total_bracket_count--;
            if (!curly_bracket_count && !total_bracket_count)  //if pointy_bracket_count == 0
                hewwo = true;
            break;
        case ']':
            hewwo = false;
            square_bracket_count--;
            total_bracket_count--;
            if (!square_bracket_count && !total_bracket_count)  //if pointy_bracket_count == 0
                hewwo = true;
            break;
        //default:
           // hewwo = true;
    }
    return hewwo;
}

function scriptCount(character){
    if (character == 's')
        scriptTally++;
    else if (character == 'c' && scriptTally == 1)
        scriptTally++;
    else if (character == 'r' && scriptTally == 2)
        scriptTally++;
    else if (character == 'i' && scriptTally == 3)
        scriptTally++;
    else if (character == 'p' && scriptTally == 4)
        scriptTally++;
    else if (character == 't' && scriptTally == 5){
        scriptTally++;      //scriptTally == 6 
        isScript = !isScript;
    }
}

function makeHewwo(character) {
    var hewwo = checkHewwo(character);
    scriptCount(character);
    
    if ((character == 'l' || character == 'r') && hewwo && !isScript)
        character = 'w';
    if ((character == 'L' || character == 'R') && hewwo && !isScript)
        character = 'W';
    return character;
}

let cleanup = word => {
    document.title = document.title.split("").map(word => {
        return makeHewwo(word)
    }).join('');
}

let cleanupcontent = word => {
    var newContent = document.body.innerHTML.split("").map(word => {
        return makeHewwo(word)
    }).join('');

    var search = document.body.innerHTML;

    document.body.innerHTML = document.body.innerHTML.split(search).join(newContent);
}

let createObserver = function() {
    let observer = new MutationObserver((mutations) => {
        console.log('Mutations!', mutations);
        observer.disconnect();
        observer = null;
        cleanup();
        cleanupcontent();
        createObserver();
    })
    observer.observe(
        document.querySelector('title'),
        { subtree: true, characterData: true, childList: true }
    )   
}

createObserver()
cleanupcontent()
cleanup()
