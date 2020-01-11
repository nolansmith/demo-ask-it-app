import React from 'react'

export default function ExternalJs() {

    import(/*webpackChunkName: "jquery" */"../../../../node_modules/jquery/dist/jquery.min.js");
    import(/*webpackChunkName: "popper" */"../../../../node_modules/popper.js/dist/popper.min.js");
    import(/*webpackChunkName: "bootstrapjs" */"../../../../node_modules/bootstrap/dist/js/bootstrap.min.js");

    return (
        <>

        </>
    )
}
