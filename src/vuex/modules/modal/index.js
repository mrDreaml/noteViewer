import * as R from 'ramda';

export const openModal = 'openModal';
export const closeModal = 'closeModal';

const modalModule = {
    state: {
        isOpened: false,
        currentModal: {},
    },
    mutations: {
        [openModal]: function (state, { answer }) {
            state.isOpened = true;
            state.currentModal.answer = answer;
        },
        [closeModal]: function (state) {
            state.isOpened = false;
            state.currentModal = {};
        }
    },
    getters: {
        getModalAnswerData: state => answerValue => R.path([ 'currentModal', 'answer', answerValue ], state)
    }
};

export default modalModule;
