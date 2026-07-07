// PawNotes Code
const pawNotesScreen = document.getElementById('pawNotes');
const pawNotesScreenClose = document.getElementById('pawNotesClose');

const noteNewButton = document.getElementById('pawNotesNewBtn');
const noteDelButton = document.getElementById('pawNotesDelBtn');

const notesContent = document.getElementById('notesContent');

let content = [
    {
        title: "Welcome",
        date: "03/07/2026",
        content: `
                Welcome to PawNotes, the incredible note taking app for cats!
                Here you will find many notes...
                <br>
                It could be:
                <br>
                > Favorite <b>food</b>... <i>Yummy</i>
                <br>
                > Favorite <b>hobbies</b>!
                <br>
                > <b>Feelings</b> :D
                <br>
                Or...
                <br>
                Anything!!!
                 `
    },
    {
        title: "About Me",
        date: "03/07/2026",
        content: `
                Hello again!
                <br>
                I am <b>nokira</b>, a high school student from Italy!
                <br>
                I'm really enjoyin this journey because it's chellenging but so rewarding! I am learning many new things and building actual websites :D
                `
    },
    {
        title: "Fun Fact",
        date: "04/07/2026",
        content: `
                Hello!
                <br>
                If you wanted to know, my favorite food is... hmm... it's a <i>secret</i>
                `
    }
]

const savedData = localStorage.getItem("pawNotesData");

content = savedData ? JSON.parse(savedData) : content;

function setNotesContent(index) {
    
    let notesContent = document.getElementById('notesContent');
    if (index == -1) {
         notesContent.innerHTML = "";
    } else {
        notesContent.innerHTML = `
             <h2 contenteditable="true" class="noteTitle"> 
                ${content[index].title}
            </h2>
            <p contenteditable="true" class="noteContent">${content[index].content}</p>
        `
    }
}

noteNewButton.addEventListener("click", () => {
    content.push(
        {
            title: "New Note",
            date: new Date().toLocaleDateString("en-GB"),
            content: `Write here your note.`
        }
    )
    reloadSidebar();
    localStorage.setItem("pawNotesData", JSON.stringify(content));
});

noteDelButton.addEventListener("click", () => {
    if (!selectedNote) return;
    
    let index = parseInt(selectedNote.dataset.index);
    content.splice(index, 1);
    reloadSidebar();
    localStorage.setItem("pawNotesData", JSON.stringify(content));
});

notesContent.addEventListener("input", (note) => {
    if(!selectedNote) return;

    let index = parseInt(selectedNote.dataset.index);

    let noteTitle = notesContent.querySelector(".noteTitle");
    let noteContent = notesContent.querySelector(".noteContent");

    if (note.target == noteTitle) {
        content[index].title = noteTitle.innerText;
        selectedNote.querySelector('p').innerText = noteTitle.innerText;
    }

    if (note.target == noteContent) {
        content[index].content = noteContent.innerHTML;
    }

    localStorage.setItem("pawNotesData", JSON.stringify(content));
});

let selectedNote = undefined;
for (let i = 0; i < content.length; i++) {
    addToSideBar(i)
}

if (content.length > 0) {
    let sidebar = document.querySelector("#sidebar");
    selectedNote = sidebar.lastElementChild;
    selectedNote.style.color = "rgb(124, 18, 124)";
    setNotesContent(content.length - 1);
} else {
    setNotesContent(-1);
    selectedNote = null;
}


function addToSideBar(index) {
    let sidebar = document.querySelector("#sidebar");
    let note = content[index];
    let newDiv = document.createElement("div");

    newDiv.dataset.index = index;
    newDiv.style.color = "black";
    newDiv.style.cursor = "pointer";
    
    newDiv.innerHTML = `
        <p style="margin: 0px;">
        ${note.title}
        </p>
        <p style="font-size: 12px; margin: 0px;">
        ${note.date}
        </p>
    `;

    newDiv.addEventListener("click", function() {
        setNotesContent(index);
        
        if (selectedNote !== undefined) {
            selectedNote.style.color = "black";
        }

        newDiv.style.color = "rgb(124, 18, 124)";
        selectedNote = newDiv;
    });
    
    sidebar.appendChild(newDiv);
}

function reloadSidebar() {
    let sidebar = document.querySelector("#sidebar");
    sidebar.innerHTML = "";

    for (let i = 0; i < content.length; i++) {
        addToSideBar(i);
    }

    if (content.length > 0) {
        selectedNote = sidebar.lastElementChild;
        selectedNote.style.color = "rgb(124, 18, 124)";
        setNotesContent(content.length - 1);
    } else {
        setNotesContent(-1);
        selectedNote = null;
    }
}



pawNotesScreenClose.addEventListener("click", () => {
    closeWindow(pawNotesScreen);
});

initializeWindow("pawNotes");
