import React from 'react'
import Image from 'next/image'
import { ICONS } from '@/app/assets/Assets'
const InProgress = () => {
    return (
        <div className='p-4 bg-white border-[0.3px] border-gray rounded-2xl shadow-md flex flex-col gap-3'>
            <div className="flex items-center w-100 justify-between">
                <span className="text-lg text-dark font-semibold">Recently Watched</span>
                <div className="text-secondary text-sm cursor-pointer flex items-center justify-end gap-2">
                    <span>View All</span>
                    <Image src={ICONS.arrowRight} className='size-5' alt='view all' />
                </div>
            </div>
            <div className="flex items-center justify-start gap-3">
                <div className="flex items-start">
                    <Image src="https://images.unsplash.com/photo-1719937206589-d13b6b008196?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-[200px] h-[130px] object-cover rounded-md' alt="lesson" width={200} height={200} />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <span className='text-md text-secondary'>Learning Js with Prayush</span>
                        <span className='text-[12px] text-dark'>Callback Hell</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                            <Image src={ICONS.clock} alt='duration' className='size-4' />
                            <span className='text-sm'>3h 24m Left</span>
                        </div>
                    </div>
                    <button className="btn btn-secondary">
                        Continue
                    </button>
                </div>
            </div>

        </div>
    )
}

export default InProgress
