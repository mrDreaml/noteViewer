import Vue from 'vue';
import Vuex from 'vuex';
import * as R from 'ramda';
import { v4 as uuid } from 'uuid';

import * as noteGetters from './note/getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        notesList: [
            {
                id: '1',
                noteTitle: 'todo for project',
                todoList: [
                    { id: '1', text: 'add note functionality', isDone: false },
                    { id: '2', text: 'delete page', isDone: false },
                    { id: '3', text: 'add modal, ask before delete', isDone: false },
                    { id: '4', text: 'add history, ctrl + z, ctrl + shift + z', isDone: false },
                    { id: '5', text: 'adaptive design', isDone: false },
                    { id: '6', text: 'add component text / input', isDone: true },
                    { id: '7', text: 'short view', isDone: false },
                ],
            }
        ],
    },
    mutations: {
        addNote (state, note) {
            state.notesList.push(note);
        },
        addTodo (state, { noteId, text }) {
            const note = this.getters.getNoteById(noteId);
            note.todoList.push({ id: uuid(), text, isDone: false });
        },
        updateNoteTitle (state, { noteId, noteTitle }) {
            const note = this.getters.getNoteById(noteId);
            note.noteTitle = noteTitle;
        },
        toggleDoneStatus (state, { noteId, todoId }) {
            const note = this.getters.getNoteById(noteId);
            const todoItem = note.todoList.find(todoItem => todoItem.id === todoId);
            todoItem.isDone = !todoItem.isDone;

        },
        removeTodoItem (state, { noteId, todoId }) {
            const note = this.getters.getNoteById(noteId);
            note.todoList = note.todoList.filter(todoListItem => todoListItem.id !== todoId);
        },
        updateTodoItemText (state, { noteId, todoId, text }) {
            const note = this.getters.getNoteById(noteId);
            const todoItem = note.todoList.find(todoItem => todoItem.id === todoId);
            todoItem.text = text;
        },
        removeNote (state, { noteId }) {
            this.state.notesList = this.state.notesList.filter(note => note.id !== noteId);
        },
    },
    getters: {
        ...noteGetters,
    }
});

export default store;
