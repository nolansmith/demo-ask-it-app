import React from 'react'

export default function ExternalStyles() {

    import(/*webpackChunkName: "bootstrapcss" */"../../../../node_modules/bootstrap/dist/css/bootstrap.min.css");
    
    return (
        <>

        </>
    )
}
