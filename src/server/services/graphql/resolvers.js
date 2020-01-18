/** 
 * GraphQL Resolvers
 */

import bcrypt from 'bcryptjs';

export default function resolver(utils) {
    
    /* Where we get our models from, the database service */
    const { User, Answer, Question, Vote } = utils.db.models;

    const resolvers = {


        RootQuery: {
            
            /**
             * 
             * @param {*} root 
             * @param {*} args 
             * @param {*} context 
             * @returns [Question]
             */
            questions(root, args, context) {
                return Question.findAll({
                    order: [['id', 'DESC']],
                });
            },

            /**
             * 
             * @param {*} root 
             * @param {*} args 
             * @param {*} context 
             * @returns [Question][5]
             */
            getLatestQuestions(root, args, context) {
                return Question.findAll({
                    order: [['id', 'DESC']],
                    limit: 5
                })
            },
            /**
             * 
             * @param {*} root 
             * @param {id} QuestionId 
             * @param {*} context 
             */
            findQuestionById(root, { id }, context) {
                return Question.findOne({
                    where: {
                        id: id
                    }
                })
            },

            /**
             * 
             * @param {*} root 
             * @param {*} args 
             * @param {*} context 
             * @returns [User]
             */
            users(root, args, context) {
                return User.findAll();
            },
            /**
             * 
             * @param {*} root 
             * @param {username} User.username 
             * @param {*} context 
             * @returns {User}
             */
            findUserByUsername(root, { username }, context) {
                return User.findOne({
                    where: {
                        username: username
                    }
                })
            },

            verifyUser(root,{ username, password}, context) {
                    return User.findOne({
                        where: {
                            username: username
                        }
                    }).then(async (user) => {
                        //console.log('Password: ', password, ' DB Password: ', user.password);
                        let validPassword = await bcrypt.compare(password, user.password);
                        if (!validPassword) return null;
                        return user;

                    })
            },

            /**
             * 
             * @param {*} root 
             * @param {*} args 
             * @param {*} context 
             * @returns {Answer}
             */
            answers(root, args, context) {
                return Answer.findAll();
            },

        },

        /**
         * USER type has 3 resolvers for:
         * 1. Questions that belong to it via UserId
         * 2. Answers that belong to it via UserId
         * 3. Votes that belong to it via UserId
         */
        User: {
            questions(root, args, context) {

                return root.getQuestions();
            },
            answers(root, args, context) {

                return root.getAnswers();
            },
            votes(root,args,context) {
                return root.getVotes();
            }

        },

        /**
         * ANSWER type has 2 resolvers for:
         * 1. User that answered via UserId
         * 2. Votes that belong to it via AnswerId
         */

        Answer: {
            user(root, args, context) {

                return root.getUser();
            },
            votes(root, args, context) {
                return root.getVotes();
            }
            
        },

        /**
         * QUESTION type has 2 resolvers for:
         * 1. Answers to the question via QuestionId
         * 2. User that asked the question via UserId
         */

        Question: {
            answers(root, args, context) {
                return root.getAnswers();

            },
            user(root, args, context) {
                return root.getUser()
            }
        },

        Vote: {
            answer(root,args,context) {
                return root.getAnswer();
            },
            
        },


        RootMutation: {
            /**
             * 
             * @param {*} root 
             * @param {vote} VoteInput 
             * @param {*} context 
             * @returns Vote
             */
            addVote(root, { vote }, context) {

                return Vote.create(vote);

            },

            /**
             * 
             * @param {*} root 
             * @param {question} QuestionInput 
             * @param {*} context 
             * @returns Question
             */

            askQuestion(root, { question }, context) {

                return User.findOne({
                    where: {
                        id: question.UserId
                    }
                }).then((user) => {
                    if (null !== user) {
                        question = Object.assign({}, question, { UserId: user.id });
                        return Question.create(question);
                    }

                });
            },
            /**
             * 
             * @param {*} root 
             * @param {answer} AnswerInput
             * @param {*} context 
             * @returns Answer
             */
            answerQuestion(root, { answer }, context) {
                return Answer.create(answer);
            },

            /**
             * 
             * @param {*} root 
             * @param {user} UserInput 
             * @param {*} context 
             */
            createNewUser(root, {user}, context) {
                let newUser = {...user};
                return bcrypt.hash(newUser.password, 10).then((hash) => {
                    newUser.password = hash;
                    return User.create(newUser);
                }).catch(err => null)
                
            }



        }
    }





    return resolvers;
};