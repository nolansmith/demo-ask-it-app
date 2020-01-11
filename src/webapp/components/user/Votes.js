import React from 'react'
import { NavLink as Link } from 'react-router-dom';
import ShortVote from '../votes/ShortVote';

export default function Votes(props) {
    return (props.votes.length <= 0) ? (
        <div style={{ width: '33%', margin: '0 auto' }}>
            <h3 style={{ textAlign: 'center', margin: '0 auto', width: '100%' }}>No Votes
        </h3>
        </div>) :
        (

            <div style={{ width: '100%', margin: '0 0' }}>

                <h3 style={{ textAlign: 'center', margin: '0 auto', width: '100%' }}>Votes</h3>

                {
                    props.votes.map(function (vote, index) {
                        return (
                            <ShortVote key={index + "-" + vote.id} size="col-xs-12" limit={25} {...vote} />

                        )

                    })
                }

            </div>

        )
}
