import { v4 as uuid } from 'uuid';
import * as noteGetters from './getters';

export const addNote = 'addNote';
export const addTodo = 'addTodo';
export const updateNoteTitle = 'updateNoteTitle';
export const toggleDoneStatus = 'toggleDoneStatus';
export const removeTodoItem = 'removeTodoItem';
export const updateTodoItemText = 'updateTodoItemText';
export const removeNote = 'removeNote';

const noteModule = {
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
    },
    mutations: {
        [addNote]: function (state, { noteTitle }) {
            state.notesList.push({ id: uuid(), noteTitle, todoList: [] });
        },
        [addTodo]: function (state, { noteId, text }) {
            const note = this.getters.getNoteById(noteId);
            note.todoList.push({ id: uuid(), text, isDone: false });
        },
        [updateNoteTitle]: function (state, { noteId, noteTitle }) {
            const note = this.getters.getNoteById(noteId);
            note.noteTitle = noteTitle;
        },
        [toggleDoneStatus]: function (state, { noteId, todoId }) {
            const note = this.getters.getNoteById(noteId);
            const todoItem = note.todoList.find(todoItem => todoItem.id === todoId);
            todoItem.isDone = !todoItem.isDone;

        },
        [removeTodoItem]: function (state, { noteId, todoId }) {
            const note = this.getters.getNoteById(noteId);
            note.todoList = note.todoList.filter(todoListItem => todoListItem.id !== todoId);
        },
        [updateTodoItemText]: function (state, { noteId, todoId, text }) {
            const note = this.getters.getNoteById(noteId);
            const todoItem = note.todoList.find(todoItem => todoItem.id === todoId);
            todoItem.text = text;
        },
        [removeNote]: function (state, { noteId }) {
            this.state.note.notesList = this.getters.getNotesList().filter(note => note.id !== noteId);
        },
    },
    getters: {
        ...noteGetters,
    }
};

export default noteModule;
