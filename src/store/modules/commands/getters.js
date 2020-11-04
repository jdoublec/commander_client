export default {
  getCommands(state) {
    return state.commands;
  },
  getCommandId(state) {
    if (state.commands.length > 0) {
      return state.commands[state.commands.length - 1].id + 1;
    }

    return 0;
  },
  getCommandFilter(state) {
    return state.commandFilter;
  }
};
