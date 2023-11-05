import * as React from 'react';
import { BsFire, BsActivity } from 'react-icons/bs';

export default function HomeProjectStatus(props) {
    const branch = props.branch.interactions;
    return (
        <>
            <div className="flex flex-row relative h-0 bottom-8">
                {branch.activityRate >= 80 ?
                    <div className="rounded-md flex items-center justify-evenly transition duration-200 text-green-600 h-9 w-[80px]">
                        <div 
                        className='flex h-full items-center animate-pulse'>
                            <BsActivity size={25} className='m-auto self-center' />
                        </div>
                    </div>
                : null }
                {branch.popularityRate >= 80 ? 
                    <div className="rounded-md flex items-center justify-evenly transition duration-200 text-orange-600 h-9 w-[80px]">
                        <div 
                        className='flex h-full items-center animate-pulse'>
                            <BsFire size={25} className='m-auto self-center' />
                        </div>
                    </div>
                : null}
            </div>
        </>
    );
}