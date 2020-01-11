/* 

In this file, we will define the schema or typeDefs for graphQL

*/
const typeDefs = `

type Question { 
    UserId: String,
    id: Int,
    text: String,
    createdAt: String,
    updatedAt: String,
    answers: [Answer],
    user: User,
}

input QuestionInput { 
    UserId: String!,
    text: String!,
    createdAt: String,
    updatedAt: String
}


type Answer {
    UserId: String,
    QuestionId: Int,
    id: Int,
    updatedAt: String,
    createdAt: String,
    text: String,
    user: User
    votes: [Vote]
}

input AnswerInput {
    UserId: String,
    QuestionId: Int,
    text: String,
}

type Vote {
    id: Int,
    action: String,
    UserId: String,
    AnswerId: Int,
    createdAt: String,
    updatedAt: String,
    answer: Answer,
    
}

input VoteInput {
    action: String,
    UserId: String,
    AnswerId: Int,
    QuestionId: Int,
}

type User {
    id: String,
    password: String,
    username: String,
    createdAt: String,
    updatedAt: String,
    answers: [Answer],
    questions: [Question],
    votes: [Vote],
}

input UserInput {
    id: String,
    password: String,
    username: String,
}


type RootQuery {
    questions: [Question],
    answers: [Answer],
    users: [User],
    findUserByUsername(username: String): User,
    findQuestionById(id: Int!): Question,
    getLatestQuestions: [Question],
    verifyUser(username: String, password: String): User,
   
}

type RootMutation {
    addVote(vote: VoteInput): Vote,
    askQuestion(question: QuestionInput): Question,
    answerQuestion(answer: AnswerInput): Answer,
    createNewUser(user: UserInput): User,
}

schema {
    query: RootQuery,
    mutation: RootMutation,
   
}



`;


export default [typeDefs];