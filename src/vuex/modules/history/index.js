export const addHistoryStack = 'addHistoryStack';
export const addHistory = 'addHistory';
export const rollBack = 'rollBack';
export const rollBackToFuture = 'rollBackToFuture';
export const restoreStateByHistory = 'restoreStateByHistory';

const modalHistory = {
    namespaced: true,
    state: {
        stack: [],
        position: 0,
    },
    mutations: {
        [addHistoryStack]: function (state, payload) {
            state.position++;
            if (state.position < state.stack.length) {
                state.stack =  state.stack.slice(0, state.position);
            }
            state.stack.push(payload);

        }
    },
    actions: {
        [addHistory]: function ({ commit, state, getters }, payload) {
            commit(addHistoryStack, payload);
        },
        [rollBack]: function ({ dispatch, state }) {
            if (state.position > 0) {
                state.position--;
                dispatch(restoreStateByHistory, state.stack[state.position], { root: true });
            }
        },
        [rollBackToFuture]: function ({ dispatch, state, getters }) {
            if (state.position < getters.getStackLength - 1) {
                state.position++;
                dispatch(restoreStateByHistory, state.stack[state.position], { root: true });
            }
        },
    },
    getters: {
        getStackLength: state => state.stack.length,
    },
};

export default modalHistory;
