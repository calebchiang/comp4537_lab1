/**
 * Represents an individual note with an ID and content
 */
class Note {
    /**
     * Initializes a note with a unique ID and optional content
     */
    constructor(id, content = '') {
        this.id = id;
        this.content = content;
    }

    /**
     * Creates the DOM elements for the note and append to note container
     */
    createNoteElement(noteManager) {
        const noteWrapper = document.createElement('div');
        noteWrapper.className = 'note-wrapper';
        noteWrapper.dataset.id = this.id;

        const textArea = document.createElement('textarea');
        textArea.className = 'note-textarea';
        textArea.value = this.content;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-note-btn';
        removeBtn.textContent = 'Remove';

        textArea.addEventListener('input', () => {
            this.content = textArea.value;
            noteManager.saveNotes();
        });

        removeBtn.addEventListener('click', () => {
            noteManager.removeNoteById(this.id);
        });

        noteWrapper.appendChild(textArea);
        noteWrapper.appendChild(removeBtn);

        const notesContainer = document.getElementById('notes-container');
        notesContainer.appendChild(noteWrapper);
    }
}

/**
 * Manages a collection of notes
 */
class NoteManager {
    /**
     * Initializes the note manager with an empty array of notes
     */
    constructor() {
        this.notes = []; 
        this.notesContainer = document.getElementById('notes-container');
    }

    /**
     * Loads notes from local storage
     */
    loadNotes() {
        const storedNotes = this.getNotesFromStorage();
        this.notes = storedNotes.map(noteData => new Note(noteData.id, noteData.content));
        this.notes.forEach(note => note.createNoteElement(this));
    }

    /**
     * Saves the current state of all notes to local storage
     */
    saveNotes() {
        const notesData = this.notes.map(note => ({ id: note.id, content: note.content }));
        localStorage.setItem('notes', JSON.stringify(notesData));
        this.updateLastSavedTime();
    }

    /**
     * Retrieves the saved notes from local storage
     */
    getNotesFromStorage() {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    }

    /**
     * Creates a new note with a unique ID and displays it in the UI
     */
    addNote() {
        const id = Date.now();
        const note = new Note(id);
        this.notes.push(note);
        note.createNoteElement(this);
        this.saveNotes();
    }

    /**
     * Removes a note by its ID and displays it in the UI
     */
    removeNoteById(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        const noteWrapper = document.querySelector(`.note-wrapper[data-id="${id}"]`);
        if (noteWrapper) {
            noteWrapper.remove();
        }
        this.saveNotes();
    }

    /**
     * Updates the display to show the last time the notes were saved
     */
    updateLastSavedTime() {
        const lastSavedTimeElement = document.getElementById('last-saved-time');
        const currentTime = new Date().toLocaleTimeString(); // Format the time as HH:MM:SS
        lastSavedTimeElement.textContent = `Last Saved: ${currentTime}`;
    }
}

const noteManager = new NoteManager();
const addNoteBtn = document.getElementById('add-note-btn');
addNoteBtn.addEventListener('click', () => {
    noteManager.addNote();
});

noteManager.loadNotes();

// Periodic save every 2 seconds
setInterval(() => noteManager.saveNotes(), 2000);
