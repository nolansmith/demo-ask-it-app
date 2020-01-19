import React, { useEffect, useState} from "react";
import Loading from '../loading/';
import Error from '../error';
import ShortQuestion from './ShortQuestion';
import { connect } from "react-redux";
import {useQuery} from '@apollo/react-hooks';
import {updateQuestions} from '../../store/graphql/actions';
import {GET_ALL_QUESTIONS} from '../../store/graphql/queries';


function AllQuestions(props) {

  
  const {loading,error,data, networkStatus} = useQuery(GET_ALL_QUESTIONS, {
    pollInterval: 500, 
    onCompleted: (data) => {
      //console.log('GraphQL: ', data);
      //props.updateQuestions({all: data.questions})
      
    },
  });

  
  if (loading) return <Loading message="Getting Questions..." />;
 
  if (networkStatus === 6) console.log('Apollo Polling...');
  
 
  if (error) {
    
    return <Error message="Server Error" />
    };
  let {questions} = data;

 
  return (
    <div
      style={{ margin: "20px auto", width: "100%" }}
      id="latest_question_area"
    >
      <div style={{ width: "100%", padding: "0 auto", margin: "0 auto" }}>
        <h2 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
          All Questions ({questions.length})
          </h2>
      </div>
      {questions.map((question, index) => {
        let { id, text, answers } = question;
        return (

          <ShortQuestion
          key={index}
          id={id}
          text={text}
          answers={answers}
        />
         
          //  <Question key={'key-' + id + '-' + answers.length + '_'} id={id} answers={answers} text={text} /> 

        );
      })}
    </div>
  );

}


const mapStateToProps = state => {
  return {
   questions: state.questions,
   loading: state.loading,
   error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateQuestions: (questions) => dispatch(updateQuestions(questions))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllQuestions);
