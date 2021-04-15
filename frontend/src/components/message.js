import React from 'react'

const message = ({varient, children}) => {
    return (
        <div>
            <div className="alert alert-primary" role="alert">
                {children}
            </div>
        </div>
    )
}

message.defaultProps = {
    varient: 'info',
}

export default message
