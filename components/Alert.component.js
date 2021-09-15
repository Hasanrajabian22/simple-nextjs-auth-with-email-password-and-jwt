import React from 'react'

function AlertComponent({type, text}) {
    return (
        <div>
            <div className={`alert text-capitalize alert-${type}`} role="alert">
                {text}
            </div>
        </div>
    )
}

export default AlertComponent
