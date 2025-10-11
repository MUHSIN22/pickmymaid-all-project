import React from 'react'

const Loading = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center fixed top-0 left-0 z-[9999] bg-white'>
            <div className='w-20 h-20 border-b-2 border-primary-300 rounded-full animate-spin' />
        </div>
    )
}

export default Loading
