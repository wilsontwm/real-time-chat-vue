const state = {
    type: null,
    message: null,
    isRead: false
}

const actions = {
    success({commit}, message) {
        commit('success', message);
    },
    error({commit}, message) {
        commit('error', message);
    },
    clear({commit}) {
        commit('clear');
    },
    read({commit}) {
        commit('read');
    }
}

const mutations = {
    success(state, message) {
        state.type = 'alert-success';
        state.message = message;
        state.isRead = false;
    },
    error(state, message) {
        state.type = 'alert-danger';
        state.message = message;
        state.isRead = false;
    },
    clear(state) {
        state.type = null;
        state.message = null;
        state.isRead = false;
    },
    read(state) {
        state.isRead = true;
    }
}

export const alertModule = {
    namespaced: true,
    state,
    actions,
    mutations
};