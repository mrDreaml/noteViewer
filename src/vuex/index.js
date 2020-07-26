import Vue from 'vue';
import Vuex from 'vuex';
import note from './modules/note';
import history, { restoreStateByHistory } from './modules/history';
import modal, { openModal } from './modules/modal';
import { setStorageData } from '@/utils/storage';
import { removeNoteAction, removeTodoItemAction } from '@/vuex/modules/note';

Vue.use(Vuex);

export const deleteTodoItemRequest = 'deleteTodoItemRequest';
export const deleteNoteItemRequest = 'deleteNoteItemRequest';

const store = new Vuex.Store({
    modules: {
        history,
        note,
        modal,
    },
    actions: {
        [deleteTodoItemRequest]: function ({ commit, state }, payload) {
            commit(openModal, {
                answer: {
                    approved: [ removeTodoItemAction, payload ],
                }
            });
        },
        [deleteNoteItemRequest]: function ({ commit, state }, payload) {
            commit(openModal, {
                answer: {
                    approved: [ removeNoteAction, payload ],
                }
            });
        },
        [restoreStateByHistory]: function ({ state }, historyPayload) {
            Object.entries(historyPayload).forEach(([ key, value ]) => {
                state[key] = value;
            });
            setStorageData(state.note);
        },
    }
});

export default store;
