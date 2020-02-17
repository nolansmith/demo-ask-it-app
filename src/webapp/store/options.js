import apolloClient from '../config/apollo/index';
//store options
export default {
    thunk: {
      arguments: {
        client: apolloClient
      }
    }
  };