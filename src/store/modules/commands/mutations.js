export default {
  setCommands(state, payload) {
    state.commands = payload;
  },
  saveCommand(state, payload) {
    state.commands.push(payload);
  },
  updateSelectedCommand(state, payload) {
    const index = state.commands.findIndex(command => {
      return command.id === +payload.id;
    });
    if (index > -1) {
      state.commands[index].howTo = payload.howTo;
      state.commands[index].line = payload.line;
      state.commands[index].platform = payload.platform;
    }
  },
  deleteCommand(state, payload) {
    const index = state.commands.findIndex(command => {
        return command.id === payload;
    });
    if (index > -1) {
      state.commands.splice(index, 1);
    }
  },
  setSelectedCommandId(state, payload) {
    state.selectedCommandId = payload;
  },
  setCommandFilter(state, payload) {
    state.commandFilter = payload;
  },
  setCommandKeyword(state, payload) {
    state.commandKeyword = payload;
  },
  setCommandSort(state, payload) {
    state.commandSort = payload;
  }
};
