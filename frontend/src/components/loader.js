import React from 'react'

const loader = () => {
    return (
        <div>
            <div className="d-flex justify-content-center" style={{height:'100px',width:'100px',margin:'auto',display:'block'}}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
        </div>
    )
}

export default loader
