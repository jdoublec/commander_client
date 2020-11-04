import { createStore } from "vuex";
import commandsModule from './modules/commands/index.js';

const store = createStore({
    modules: {
        commands: commandsModule
    }  
});

export default store;