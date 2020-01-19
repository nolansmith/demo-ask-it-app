import { gql } from 'apollo-boost';

export const GET_ALL_QUESTIONS = gql`
{
  questions {
    id,
    text,
    answers {
      id,
    }
  }
}
`;

export const GET_ALL_QUESTIONS_FULL = gql`
  {
    questions {
      id,
      text,
      answers {
        id,
        text,
        votes {
          id,
          action
        },
        user {
          username
        }
      }
    }
  }
`;


export const GET_LATEST_QUESTIONS = gql`
  {
    getLatestQuestions {
      id,
      text,
      answers {
        id,
      }
    }
  }
`;

export const GET_SINGLE_QUESTION = (id) => {
  return gql`
  {
    findQuestionById(id: ${id}) {
      id,
      text,
      createdAt,
      UserId,
      user {
        username
      },
      answers {
        id,
        text,
        votes {
          id,
          action
        },
        user {
          username
        }
      }
    }

  }`;

}

export const VERIFY_USER = gql`
query VerifyUser($username: String, $password: String) {
  verifyUser(username: $username, password: $password) {
    id,
    username,
    token
  }
}

`;

export const FIND_USER = gql`
  
 query FindUser($username: String) {
    findUserByUsername(username: $username) {
      id,
      username,
      createdAt,
      questions {
        id,
        answers{
          id
        },
        text,
      },
      answers {
        id,
        text,
        QuestionId,
        votes {
          id,
          action
        },
        user {
          username
        }
      },
      votes {
        id,
        action,
        AnswerId,
        answer {
          id,
          QuestionId,
          text
        }
      }
    
    }
  }

`;