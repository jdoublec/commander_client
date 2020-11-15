export default {
  getCommands(state) {
    return state.commands;
  },
  getSelectedCommand(state, getters) {
    const commandId = state.selectedCommandId;
    const commands = getters.getCommands;
    return commands.find(command => command.id === +commandId);
  },
  getCommandId(state) {
    if (state.commands.length > 0) {
      return state.commands[state.commands.length - 1].id + 1;
    }

    return 0;
  },
  getCommandFilter(state) {
    return state.commandFilter;
  },
  getCommandKeyword(state) {
    return state.commandKeyword;
  },
  getCommandSort(state) {
    return state.commandSort;
  }
};
