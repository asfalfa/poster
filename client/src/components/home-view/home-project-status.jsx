import * as React from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsFire } from 'react-icons/bs';

export default function HomeProjectStatus(props) {
    const project = props.project;
    return (
        <>
            <div className="flex flex-row relative h-0 bottom-8">
                <div className="rounded-md flex items-center transition duration-200 h-9 w-[80px] justify-evenly">
                    <div 
                    className='flex h-full flex-col items-center'>
                        <span className='m-auto self-center text-neutral-400 text-xs'>24h</span>
                        <AiOutlineClockCircle className='m-auto self-center' />
                    </div>
                    <div
                    className='flex h-full'>
                        <span className='m-auto self-center text-green-600 font-semibold text-lg'>+{project.likes}</span>
                    </div>
                </div>
                <div className="rounded-md flex items-center justify-evenly transition duration-200 text-orange-600 h-9 w-[80px]">
                    <div 
                    className='flex h-full items-center animate-pulse'>
                        <BsFire size={25} className='m-auto self-center' />
                    </div>
                </div>
            </div>
        </>
    );
}