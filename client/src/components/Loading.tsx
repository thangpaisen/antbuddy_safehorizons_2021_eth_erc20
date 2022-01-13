import React, { memo } from 'react'
const img = "../../../../assets/loading.gif"
function Loading() {
    const style = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        height: '50vh',
        alignItems: 'center'

    }
    return (
        <div style={style}>
            <img src={img} width="50" height={50} />
        </div>
    )
}

export default React.memo(Loading)
