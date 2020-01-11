
/* basic sorting mechanism */
export const sortVotes = function sortVotes(a, b) {
    if (calculateVotes(a.votes) > calculateVotes(b.votes)) return -1;
    if (calculateVotes(a.votes) < calculateVotes(b.votes)) return 1;
    return 0;
};
/**
 * votes come back as a total #. We subtract "down" from "up" in each
 * @param {Answer} votes 
 */
export const calculateVotes = function(votes) {
    let down = votes.filter((v) => v.action==='down').length;
    let up = votes.filter((v) => v.action==='up').length;
    //console.log('up: ', up, ' down: ', down);
    return up-down;
  }

/**
 * get random user from 'stub' seed data
 * helps during testing to generate unique IDs for users on the fly
 * @param [User] users 
 */

let stubUsers = require('../../server/services/database/util/users');
export const getRandomUserFromSeedData = function(users=stubUsers) {
    let max = users.length-1;
    let index = Math.ceil(Math.random()*max);
    //console.log('Index: ', index);
    return users[index];
}


 


