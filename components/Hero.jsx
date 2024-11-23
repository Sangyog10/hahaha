import React from 'react'
import Nav from './Nav'
import InfiniteMarquee from './InfiniteMarquee'

const Hero = () => {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-between">
            <Nav />
            <div className="flex-center flex-col gap-16 padding-xl">
                <div className="flex flex-col gap-6 items-center justify-center">
                    <h1>Want to be Productive? <span className="text-gradient">Join us</span></h1>
                    <p className="w-[700px] text-center text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, dolor. Omnis incidunt praesentium officiis dicta maiores quas optio commodi illo.</p>
                </div>
                <div className="flex flex-col gap-6 items-center justify-center">
                    <button className="btn btn-primary ">Start for Free</button>
                    <p>Join <span className="text-secondary">2.5 million</span> developers working in companies like</p>
                </div>
            </div>
            <div className="flex-center flex-col gap-8 mt-10 w-full">
                <InfiniteMarquee />
            </div>
        </div>

    )
}

export default Hero
