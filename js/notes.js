// PawNotes Code
const pawNotesScreen = document.getElementById('pawNotes');
const pawNotesScreenClose = document.getElementById('pawNotesClose');

let content = [
    {
        title: "Welcome",
        date: "03/07/2026",
        content: `
            <p contenteditable="true">
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
            </p>
        `
    },
    {
        title: "About Me",
        date: "03/07/2026",
        content: `
            <p>
                Hello again!
                <br>
                I am <b>nokira</b>, a high school student from Italy!
                <br>
                I'm really enjoyin this journey because it's chellenging but so rewarding! I am learning many new things and building actual websites :D
            </p>
        `
    },
    {
        title: "Fun Fact",
        date: "04/07/2026",
        content: `
            <p>
                Hello!
                <br>
                If you wanted to know, my favorite food is... hmm... it's a <i>secret</i>
                
            </p>
        `
    }
]

function setNotesContent(index) {
    let notesContent = document.getElementById('notesContent');
    notesContent.innerHTML = content[index].content;
}

setNotesContent(0);

let selectedNote = undefined;

function addToSideBar(index) {
    let sidebar = document.querySelector("#sidebar");
    let note = content[index];
    let newDiv = document.createElement("div");

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


for (let i = 0; i < content.length; i++) {
    addToSideBar(i)
}

pawNotesScreenClose.addEventListener("click", () => {
    closeWindow(pawNotesScreen);
});

initializeWindow("pawNotes");
