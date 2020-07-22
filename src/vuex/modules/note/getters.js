export const getNotesList = state => () => state.notesList;

export const getNoteById = state => id => state.notesList.find(note => note.id === id);

