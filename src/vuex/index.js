import Vue from 'vue';
import Vuex from 'vuex';
import note from './modules/note';
import modal, { openModal } from './modules/modal';

Vue.use(Vuex);

export const deleteTodoItemRequest = 'deleteTodoItemRequest';
export const deleteNoteItemRequest = 'deleteNoteItemRequest';

const store = new Vuex.Store({
    modules: {
        note,
        modal,
    },
    actions: {
        [deleteTodoItemRequest]: function ({ commit, state }, payload) {
            commit(openModal, {
                answer: {
                    approved: [ 'removeTodoItem', payload ],
                }
            });
        },
        [deleteNoteItemRequest]: function ({ commit, state }, payload) {
            commit(openModal, {
                answer: {
                    approved: [ 'removeNote', payload ],
                }
            });
        },
    }
});

export default store;
