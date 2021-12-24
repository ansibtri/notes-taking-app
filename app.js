console.log('Rebuilding Notes App');
// further features to implement here 
// 1. Add Title===done
// 2. Mark a note as important ===done 
// 3. Delete multiple note at single times===done 
// 4. Make a color circular to distinguish importance of notes === done 
// 5. seperate notes by user 
// 6. Sync with server and host 
// 7. Delete all notes with single click === done



showNotes(); // loads the data while page load
// function to add notes to localstorage 
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let noteTitle = document.getElementById('title');
    let notePriotize = document.getElementById('priotize');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    Title = noteTitle.value;
    Txt = addTxt.value;
    priotize = notePriotize.value;
    notesObj.push({Title, Txt, priotize });
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
    addTxt.value = '';
    noteTitle.value = '';
});

// function to display notes 

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    let priotizeArr = ['Important, Normal, NotImportant'];
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard col-md-3 m-1 card">
        <div class="card-body">
            <h5 class="card-title"><input class="display form-check-input" type="checkbox" id="${index}">&nbsp;${index + 1}. ${element.Title} <span class="priotize ${element.priotize}">${element.priotize}</span></h5>
            <p class="card-text">${element.Txt}</p>
            <button class="btn btn-primary" id="${index}" onclick="delNote(this.id)">Delete Notes</button>
        </div>
    </div>`;
    // console.log(priotizeArr[element.notePriotize])
    });
    let noteElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        noteElem.innerHTML = html;
    } else {
        noteElem.innerHTML = `
        <div class="noteCard col-md m-1 card">
        <div class="card-body">
            <h5 class="card-title">Empty</h5>
            <p class="card-text">Add Notes to show here.</p>
        </div>
    </div>`;
    }
}

// error in notePriotize section check again 


// function to delete the notes 
function delNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

// searching for content 
const searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input', function () {
    let inputValue = searchTxt.value;
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function (element) {
        let paraText = element.getElementsByTagName('p')[0].innerText;
        if (paraText.includes(inputValue)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
});




// Function about deleting 
// selecting and unselecting items 
let inputCheck = document.querySelectorAll('.display');
const itemObj = [];
Array.from(inputCheck).forEach(function (item) {
    item.addEventListener('input', function () {
        if (item.checked == true) {
            if (itemObj.includes(this.id) != true) {
                itemObj.push(this.id);
            }
        } else {
            if (itemObj.includes(this.id)) {
                itemObj.splice(this.id, 1);
            }
        }
    });
});

// function to delete multiple notes at a single Time
const delMultiNotes = document.querySelector('#delMultiNotes');
delMultiNotes.addEventListener('click', function (e) {
    e.preventDefault();
    for (let i = 0; i < itemObj.length; i++) {
        delNote(i);
    }
});

//function to delete all notes at a single time
const delAllNotes = document.querySelector('#delAllNotes');
delAllNotes.addEventListener('click', function (e) {
    e.preventDefault();
    let result = confirm('Do you want to Delete all Notes');
    if (result === true) {
        localStorage.clear();
        showNotes();
    }
});