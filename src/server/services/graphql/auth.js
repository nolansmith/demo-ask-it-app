import {
  SchemaDirectiveVisitor,
  AuthenticationError,
} from 'apollo-server-express';


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let tools = {bcrypt,jwt};
const tokenService = require('../auth/token')(tools).checkUserLoginToken;

import regeneratorRuntime from 'regenerator-runtime/runtime';

//const tokenService = auth.checkUserLoginToken;
class AuthDirective extends SchemaDirectiveVisitor {
  
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const ctx = args[2];
      if (!ctx.headers.authorization) throw new AuthenticationError("Improper auth data");
      
      let token = ctx.headers.authorization.split("Bearer ");
    
      let {valid,message} = tokenService(token[1]);

      if (valid === true) {
        return await resolve.apply(this, args);
      }
      throw new AuthenticationError(message);
    };
  }
}
export default AuthDirective;
