import React from 'react'
import { NavLink as Link } from 'react-router-dom';
import ShortQuestion from '../questions/ShortQuestion';

export default function Questions(props) {
    return (props.questions.length <= 0) ? (
        <div style={{ width: '33%', margin: '0 auto' }}>
            <h3 style={{ textAlign: 'center', margin: '0 auto', width: '100%' }}>No Questions Asked
        </h3>
        </div>) :
        (

            <div style={{ width: '100%', margin: '0 0' }}>

                <h3 style={{ textAlign: 'center', margin: '0 auto', width: '100%' }}>Questions Asked</h3>

                {
                    props.questions.map(function (question, index) {
                        return (
                            <ShortQuestion key={index + "-" + question.id} size="col-xs-12" limit={25} {...question} />

                        )

                    })
                }

            </div>

        )
}
