import React from 'react'

import ShortAnswer from '../answers/ShortAnswer';

export default function Answers(props) {
    return (props.answers.length <= 0) ? (
        <div style={{ width: '33%', margin: '0 auto' }}>
            <h3 style={{ textAlign: 'center', margin: '0 auto', width: '100%' }}>No Questions Answered
        </h3>
        </div>) :
        (

            <div style={{ width: '100%', margin: '0 0' }}>

                <h3 style={{ textAlign: 'center', margin: '0 auto', width: '100%' }}>Answers</h3>
               
                {
                    props.answers.map(function (answer, index) {
                       return (
                        <ShortAnswer key={index + '-' + answer.QuestionId} limit={50} size="col-xs-12" {...answer} />
                       )

                    })
                }
                

            </div>

        )
}
