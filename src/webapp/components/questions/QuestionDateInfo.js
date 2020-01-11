import React from 'react';
import moment from 'moment';
import {NavLink as Link} from 'react-router-dom';

export default function QuestionDateInfo(props) {
    const {question} = props;

    let m = moment(moment.unix(question.createdAt / 1000));
    let postedDate = m.format('MMM Do YY');
    let howLongAgo = m.fromNow();
   
    return (
        <>
         By <Link to={`/user/${question.user.username}`}>{question.user.username}</Link> on {postedDate} ({howLongAgo})
        </>

    )
}