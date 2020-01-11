import React from 'react';
import moment from 'moment';


export default function UserDateInfo(props) {
    const {inputDate} = props;

    let m = moment(moment.unix(inputDate / 1000));
    let joinDate = m.format('MMM Do YY');
    let howLongAgo = m.fromNow();
   
    return (
        <>
         Member Since {joinDate} <br /> ({howLongAgo})
        </>

    )
}