import { gql } from 'apollo-boost';

export const ASK_QUESTION = gql`
    
  mutation AskQuestion($question: QuestionInput) {  
      askQuestion(question: $question) {
              id,
              text,
              UserId,
              createdAt,
              updatedAt
            }
    } 
    
  `;

export const ANSWER_QUESTION = gql`
    
  mutation AnswerQuestion($answer: AnswerInput) {  
      answerQuestion(answer: $answer) {
              id,
              text,
              UserId,
              createdAt,
              updatedAt
            }
    } 
    
  `;



export const ASK_QUESTION_M = gql`
mutation AskQuestion($question: QuestionInput) {
      askQuestion(question: $question) {
              id,
              text,
              UserId,
              createdAt,
              updatedAt
            }
          
    } 
`;

export const CREATE_NEW_USER = gql`
mutation CreateNewUser($user: UserInput) {
    createNewUser(user: $user) {
      id,
      username
    }
}

`;
export const ADD_VOTE = gql`
mutation AddVote($vote: VoteInput) {
      addVote(vote: $vote) {
              id,
              action,
              UserId,
              AnswerId
              
            }
          
    } 
`;