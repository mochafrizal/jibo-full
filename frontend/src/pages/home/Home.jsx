import React from 'react'
import Hero from '../Hero'
import Posts from '../posts/Posts'
export const Home = () => {
    return (
        <div className='bg-white mx-auto'>
            <Hero />
            <Posts />
        </div>
    )
}

export default Home
