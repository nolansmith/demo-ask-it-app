import React from "react";
import ShortQuestion from "./ShortQuestion";
import { connect } from "react-redux";
import URLS from '../../util/urls.js';
import * as actions from '../../store/graphql/actions';
import {GET_LATEST_QUESTIONS} from '../../store/graphql/queries';
import {useQuery} from '@apollo/react-hooks';
import Loading from '../loading';


function LatestQuestions (props) {



  const {loading,data,error} = useQuery(GET_LATEST_QUESTIONS, {pollInterval: 500});
  if (loading) return <Loading message="Getting Latest Questions..." />;
  /* Get the last 5 questions */
  let questions = data.getLatestQuestions;
  
  return (
  
    
      <div
        style={{ margin: "20px auto", width: "100%" }}
        id="latest_question_area"
      >
        <div style={{ width: "100%", padding: "0 auto", margin: "0 auto" }}>
          
        </div>
        <div className="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', margin: '0 auto' }}>
          <div className="col-md-4 col-md-push-2  col-sm-12">
            <img style={{ width: "100%", maxHeight: '250px' }} src={`${URLS.images}/recent.svg`} />
          </div>
          <div className="col-md-4 col-md-pull-2 col-sm-12">
            <h2 style={{ margin: '10% auto', textAlign: 'left' }}>The Latest</h2>
          </div>
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
          );
          }
        )}
      </div>
    );
  }


const mapStateToProps = state => {
  return {
   questions: state.latestQuestions,
   loading: state.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLatestQuestions: () => dispatch(actions.getLatestQuestions()),
    resetQuestions: () => dispatch(actions.resetQuestions())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LatestQuestions);
