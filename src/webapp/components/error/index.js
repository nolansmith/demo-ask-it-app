import React from 'react'
import URLS from '../../util/urls.js';

function Error({image,message, maxHeight}) {
    
       
        return (
            <div style={{ width: "100%", padding: "0 auto", margin: "0 auto" }}>
                <h2 style={{ color: 'red', width: "100%", textAlign: "center", margin: "0 auto" }}>
                    {message ? message : 'Error!'}


                </h2>

                <div style={{width: '100%', margin: '0 auto'}}>
                    <img style={{ width: "100%",  margin: '10px auto', maxHeight: (maxHeight) ? maxHeight : '250px' }} src={`${URLS.images}/${image ? image : 'error'}.svg`} />
                </div>


            </div>

        )
    
}

export default Error;
