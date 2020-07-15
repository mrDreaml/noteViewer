import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        notesList: [
            {
                id: 1,
                noteTitle: 'note title',
                todoList: [
                    { id: 1, text: 'some text 1', isDone: false },
                    { id: 2, text: 'some text 2', isDone: true },
                    { id: 3, text: 'some text 3', isDone: false },
                    { id: 4, text: 'some text 4', isDone: false },
                    { id: 5, text: 'some text 5', isDone: false },
                ],
            }
        ],
    },
    mutations: {
        addNote (state, note) {
            state.notesList.push(note);
        }
    },
    getters: {
        getNoteById: state => id => state.notesList.find(note => note.id === id)
    }
});

export default store;
