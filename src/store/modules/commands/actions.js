export default {
  async loadCommands(context) {
    const response = await fetch(
      context.rootGetters.getConnString,
    {
      method: 'GET'
    });
    const responseData = await response.json();    
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to GET data!');
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

  async updateSelectedCommand(context, payload) {
    const commandId = context.state.selectedCommandId;
    const commandData = {
      howTo: payload.howTo,
      line: payload.line,
      platform: payload.platform
    };
    

    //Using backticks instead of single quotes allows us to insert javascript into a string.
    const response = await fetch(
        context.rootGetters.getConnString + `/${commandId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          howTo: commandData.howTo,
          line: commandData.line,
          platform: commandData.platform
        })
      }
    );

    // const responseData = await response.json();    

    if (!response.ok) {
      console.log(response.statusText);
    } else {    
      // const updatedCommandId = responseData.id;
      
      context.commit('updateSelectedCommand', {
        ...commandData,
        id: commandId
      });
      context.commit('setSelectedCommandId', null);
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
      console.log(response.statusText);
    }

    context.commit('deleteCommand', commandId);
  },

  updateSelectedCommandId(context, payload) {
    context.commit('setSelectedCommandId', payload);
  },

  updateCommandFilter(context, payload) {
    context.commit('setCommandFilter', payload);
  },
  updateCommandKeyword(context, payload) {
    context.commit('setCommandKeyword', payload);
  },
  updateCommandSort(context, payload) {
    context.commit('setCommandSort', payload);
  }
};
