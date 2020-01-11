
/**
 * 
 * Some utilities to generate random ID information for seeding
 */

let getRandomUserId = function(users, howMany) {
    let max = users.length-1;
    if (howMany && howMany <= max && howMany > 0) {
        max = howMany;
    }
    let index = Math.ceil(Math.random()*max);
    //console.log('Index: ', index);
    return users[index]["id"];
}



let getRandomQuestionId = function(questions) {
    let index = Math.ceil(Math.random()*questions.length-1);
    //console.log('Index: ', index);
    //console.log('Question ID: ', index);
    return questions[index]["id"];
}

let getRandomAnswerId = function(answers) {
    let index = Math.ceil(Math.random()*20);
    //console.log('Index: ', index);
    return answers[index]["id"];
}

module.exports = {
    getRandomUserId,
    getRandomQuestionId,
    getRandomAnswerId,
}