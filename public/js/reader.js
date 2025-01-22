/**
 * Reads and displays notes from local storage, and updates retrieval timestamps.
 */
class NoteReader {
    /**
     * Initializes the NoteReader with container and timestamp elements by their IDs.
     */
    constructor(containerId, timestampId) {
        this.container = document.getElementById(containerId);
        this.timestamp = document.getElementById(timestampId); 
    }

    /**
     * Retrieves notes from local storage.
     */
    getNotesFromStorage() {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    }

    /**
     * Displays all notes in the container element.
     */
    displayNotes() {
        const notes = this.getNotesFromStorage();
        this.container.innerHTML = ''; // Clear existing notes

        notes.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note';
            noteDiv.textContent = note.content;
            this.container.appendChild(noteDiv);
        });
    }

    /**
     * Updates the timestamp element to show the last time notes were retrieved.
     */
    updateLastRetrievedTime() {
        const currentTime = new Date().toLocaleTimeString();
        this.timestamp.textContent = `Last Retrieved: ${currentTime}`;
    }

    /**
     * Refreshes the notes display and updates the retrieval timestamp.
     */
    refreshNotes() {
        this.displayNotes();
        this.updateLastRetrievedTime();
    }

    /**
     * Initializes the NoteReader by refreshing notes immediately and setting up periodic refreshes.
     */
    initialize(interval = 2000) {
        this.refreshNotes();
        setInterval(() => this.refreshNotes(), interval);
    }
}

// Create an instance of NoteReader and initialize it.
const noteReader = new NoteReader('notes-display-container', 'last-retrieved-time');
noteReader.initialize();
