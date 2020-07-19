import Vue from 'vue';
import Vuex from 'vuex';
import * as R from 'ramda';
import { v4 as uuid } from 'uuid';

import MODALS from '@/constants/modals';

import * as noteGetters from './note/getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        notesList: [
            {
                id: '1',
                noteTitle: 'todo for project',
                todoList: [
                    { id: '1', text: 'add note functionality', isDone: true },
                    { id: '2', text: 'delete page', isDone: true },
                    { id: '3', text: 'add modal, ask before delete', isDone: true },
                    { id: '4', text: 'add history, ctrl + z, ctrl + shift + z', isDone: false },
                    { id: '5', text: 'adaptive design', isDone: false },
                    { id: '6', text: 'add component text / input', isDone: true },
                    { id: '7', text: 'short view', isDone: true },
                    { id: '8', text: 'refactor: vuex, use action and commits constants, add modules', isDone: false },
                ],
            }
        ],
        modal: {
            isOpened: false,
            currentModal: {},
        }
    },
    mutations: {
        addNote (state, { noteTitle }) {
            state.notesList.push({ id: uuid(), noteTitle, todoList: [] });
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
        openModal (state, { answer }) {
            state.modal.isOpened = true;
            state.modal.currentModal.answer = answer;
        },
        closeModal (state) {
            state.modal.isOpened = false;
            state.modal.currentModal = {};
        }
    },
    actions: {
        deleteTodoItemRequest ({ commit, state }, payload) {
            commit('openModal', {
                answer: {
                    approved: [ 'removeTodoItem', payload ],
                }
            });
        },
        deleteNoteItemRequest ({ commit, state }, payload) {
            commit('openModal', {
                answer: {
                    approved: [ 'removeNote', payload ],
                }
            });
        },
    },
    getters: {
        ...noteGetters,
        getModalAnswerData: state => answerValue => R.path([ 'modal', 'currentModal', 'answer', answerValue ], state)
    }
});

export default store;
