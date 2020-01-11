import React from 'react'
const ReactLoading = React.lazy(() => import(/* webpackChunkName: "ReactLoading" */ 'react-loading'));
import URLS from '../../util/urls.js';

function Loading(props) {


    return (
        <div style={{ width: "100%", padding: "0 auto", margin: "0 auto" }}>
            <h2 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
                {props.message ? props.message : 'Loading...'}
            </h2>
            {(props.image) ? (
                <div style={{ width: '100%', margin: '0 auto' }}>
                    <img style={{ width: "100%", margin: '10px auto', maxHeight: (props.maxHeight) ? props.maxHeight : '250px' }}
                        src={`${URLS.images}/${props.image}.svg`} />
                </div>
            ) : null}
            <div style={{ width: "10%", padding: "0 auto", margin: "10% auto" }}>
                <React.Suspense fallback={null}>
                    <ReactLoading width={props.width ? props.width : "100%"} height="10%" color="#1f2179" type={props.type ? props.type : "spin"} />
                </React.Suspense>
            </div>
        </div>

    )
}

export default Loading;
