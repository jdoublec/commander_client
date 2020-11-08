export default {
  async loadCommands(context) {
    const response = await fetch(
      context.rootGetters.getConnString,
    {
      method: 'GET'
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.log('poop');
      const error = new Error(responseData.message || 'Failed to GET data!');
      console.log(responseData);
      throw error;
    }

    const commands = [];

    for (const key in responseData) {
      const command = {
        id: responseData[key].id,
        howTo: responseData[key].howTo,
        line: responseData[key].line,
        platform: responseData[key].platform
      };
      commands.push(command);
    }
    context.commit('setCommands', commands);
  },

  async saveCommand(context, payload) {

    const commandData = {
      // id: context.rootGetters.userId,
      howTo: payload.howTo,
      line: payload.line,
      platform: payload.platform
    };
    

    //Using backticks instead of single quotes allows us to insert javascript into a string.
    const response = await fetch(
        context.rootGetters.getConnString,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          howTo: commandData.howTo,
          line: commandData.line,
          platform: commandData.platform
        })
        // body: commandData
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      //error ...
    } else {    
      const newCommandId = responseData.id;
      context.commit('saveCommand', {
        ...commandData,
        id: newCommandId
      });
    }
  },
  async deleteCommand(context, payload) {
    const commandId = payload;

    //Using backticks instead of single quotes allows us to insert javascript into a string.
    const response = await fetch(
      context.rootGetters.getConnString + `/${commandId}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      //error ...
    }

    context.commit('deleteCommand', commandId);
  },

  updateCommandFilter(context, payload) {
    context.commit('setCommandFilter', payload);
  }
};
