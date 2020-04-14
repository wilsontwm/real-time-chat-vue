import { userService } from '../_services/user.service';
import fb from '@/firebase';

const user = JSON.parse(localStorage.getItem('user'));
const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

const actions = {
    async login({commit}) {
        commit('loginRequest');
        const firebaseLogin = await fb.login();
        
        if(firebaseLogin.success) {
            // Store / update the user info into the firebase            
            const uid = firebaseLogin.data.user.uid;
            const name = firebaseLogin.data.user.displayName;
            const email = firebaseLogin.data.user.email;
            const photo = firebaseLogin.data.user.photoURL;

            try {
                var result = await userService.createUpdate(uid, name, email, photo);
                if(result.success) {
                    // Set the user as login
                    userService.login(uid);

                    // Set the state
                    var user = {
                        ID: uid,
                        Name: name,
                        Email: email,
                        Photo: photo
                    };

                    commit('loginSuccess', user);
                }
            } catch (err) {
                commit('loginFailure', err);
            }
            
        } else {
            commit('loginFailure', firebaseLogin.error);
        }        
    },
    logout({commit, state}) {
        if(state.user.ID) {
            userService.logout(state.user.ID);
        }
        fb.logout();
        commit('logout');
    }
}

const mutations = {
    loginRequest(state) {
        state.status = {loggingIn: true};
        state.user = null;
    },
    loginSuccess(state, user) {
        state.status = {loggedIn: true};
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = {};
    }
}

export const userModule = {
    namespaced: true,
    state,
    actions,
    mutations
}