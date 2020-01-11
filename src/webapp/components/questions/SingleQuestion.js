import React from "react";
import Question from '../questions/GQ_Question';
import * as URLS from '../../util/urls.js';
import Error from '../error/index.js';
import Loading from '../loading/index.js';
import { GET_SINGLE_QUESTION } from "../../store/graphql/queries";
import { useQuery } from '@apollo/react-hooks';
const QuestionDateInfo = React.lazy(() => import(/* webpackChunkName: "QuestionDateInfo" */'./QuestionDateInfo'));


function SingleQuestion(props) {

  const { loading, data, error, refetch } = useQuery(GET_SINGLE_QUESTION(parseInt(props.match.params.slug)));
  if (loading) return <Loading message="Finding Question" />;
  if (!data.findQuestionById) return <Error message="Cannot find question" />;
  let singleQuestion = data.findQuestionById;


  return (

    <div style={{ width: "100%", margin: '20px auto' }}>
      <div key={`${singleQuestion.id}-${Date.now()}`}>
        <div className="row" style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '0 auto' }}>
          <div className="col-md-4  col-sm-12">
            <img style={{ width: "100%", maxHeight: '250px' }} src={`${URLS.images}/single_question.svg`} />
          </div>
          <div className="col-md-4 col-sm-12">
            <h2 style={{ margin: '10% auto', textAlign: 'center' }}>
              {singleQuestion.text}
            </h2>
            <h6 style={{ margin: '10% auto', textAlign: 'center' }}>
              <React.Suspense fallback="...">
                <QuestionDateInfo question={singleQuestion} />
              </React.Suspense>

            </h6>
          </div>
          <Question refetch={refetch} key={'key-' + (new Date())} {...singleQuestion} />
        </div>
      </div>
    </div>

  );
}

export default SingleQuestion;