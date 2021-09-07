import React from 'react'

export const Alert = (props) => {
    return (
        <div>
            <div class="alert alert-primary" role="alert">
                {props.message}
            </div>
        </div>
    )
}
