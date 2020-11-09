import { createStore } from "vuex";
import commandsModule from './modules/commands/index.js';

const store = createStore({
    state() {
        return {
            connString: 'https://jdccommanderapi.azurewebsites.net/api/commands'
        }
    },
    modules: {
        commands: commandsModule
    },
    getters: {
        getConnString(state) {
            return state.connString;
        }
    }
});

export default store;