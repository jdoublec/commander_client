export default {
  setCommands(state, payload) {
    state.commands = payload;
  },
  saveCommand(state, payload) {
    state.commands.push(payload);
  },
  deleteCommand(state, payload) {
    const index = state.commands.findIndex(command => {
        return command.id === payload;
    });
    if (index > -1) {
      state.commands.splice(index, 1);
    }
  },
  setCommandFilter(state, payload) {
    state.commandFilter = payload;
  }
};
