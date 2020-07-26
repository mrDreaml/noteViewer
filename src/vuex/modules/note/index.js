import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import * as noteGetters from './getters';
import { addHistory } from '@/vuex/modules/history';
import { getStorageData, setStorageData } from '@/utils/storage';

export const addNote = 'addNote';
export const addTodo = 'addTodo';
export const updateNoteTitle = 'updateNoteTitle';
export const toggleDoneStatus = 'toggleDoneStatus';
export const removeTodoItem = 'removeTodoItem';
export const updateTodoItemText = 'updateTodoItemText';
export const removeNote = 'removeNote';
export const removeNoteAction = 'removeNoteAction';
export const addTodoAction = 'addTodoAction';
export const removeTodoItemAction = 'removeTodoItemAction';

const INITIAL = getStorageData() || {
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
};

const noteModule = {
    state: INITIAL,
    mutations: {
        [addNote]: function (state, { noteTitle }) {
            state.notesList.push({ id: uuid(), noteTitle, todoList: [] });
            setStorageData(state);
        },
        [addTodo]: function (state, { noteId, text }) {
            const note = this.getters.getNoteById(noteId);
            note.todoList.push({ id: uuid(), text, isDone: false });
            setStorageData(state);
        },
        [updateNoteTitle]: function (state, { noteId, noteTitle }) {
            const note = this.getters.getNoteById(noteId);
            note.noteTitle = noteTitle;
            setStorageData(state);
        },
        [toggleDoneStatus]: function (state, { noteId, todoId }) {
            const note = this.getters.getNoteById(noteId);
            const todoItem = note.todoList.find(todoItem => todoItem.id === todoId);
            todoItem.isDone = !todoItem.isDone;
            setStorageData(state);
        },
        [removeTodoItem]: function (state, { noteId, todoId }) {
            const note = this.getters.getNoteById(noteId);
            note.todoList = note.todoList.filter(todoListItem => todoListItem.id !== todoId);
            setStorageData(state);
        },
        [updateTodoItemText]: function (state, { noteId, todoId, text }) {
            const note = this.getters.getNoteById(noteId);
            const todoItem = note.todoList.find(todoItem => todoItem.id === todoId);
            todoItem.text = text;
            setStorageData(state);
        },
        [removeNote]: function (state, { noteId }) {
            this.state.note.notesList = this.getters.getNotesList.filter(note => note.id !== noteId);
            setStorageData(state);
        },
    },
    actions: {
        [removeTodoItemAction]: function ({ state, commit, dispatch }, payload) {
            dispatch(`history/${addHistory}`, { note: { notesList: R.clone(state.notesList) } });
            commit(removeTodoItem, payload);
        },
        [removeNoteAction]: function ({ state, commit, dispatch }, payload) {
            dispatch(`history/${addHistory}`, { note: { notesList: R.clone(state.notesList) } });
            commit(removeNote, payload);
        },
        [addTodoAction]: function ({ state, commit, dispatch }, payload) {
            dispatch(`history/${addHistory}`, { note: { notesList: R.clone(state.notesList) } });
            commit(addTodo, payload);
        },
    },
    getters: {
        ...noteGetters,
    }
};

export default noteModule;
