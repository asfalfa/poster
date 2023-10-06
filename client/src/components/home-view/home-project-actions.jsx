import * as React from 'react';

import { AiOutlineEyeInvisible, AiOutlineHeart } from 'react-icons/ai';
import { PiShareFat, PiWarningCircle } from 'react-icons/pi';
import { BsChatSquareText, BsBookmark } from 'react-icons/bs';
import { BiDotsVerticalRounded , BiCopy} from 'react-icons/bi';

import Menu from '@mui/material/Menu';

export default function HomeProjectActions(props) {
    const project = props.project;

    // Collabs
    function collabProject(){
        console.log(project)
    }
    function seeProjectCollabs(){
        console.log(project)
    }

    // Branches
    function branchProject(){
        console.log(project)
    }
    function seeProjectBranches(){
        console.log(project)
    }

    // Likes
    function likeProject(){
        console.log(project)
    }
    function seeProjectLikes(){
        console.log(project)
    }

    // Share
    function shareProject(){
        console.log(project)
    }
    function seeProjectShares(){
        console.log(project)
    }

    // Bookmark
    function bookmarkProject(){
        console.log(project)
    }

    // Extras
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    function openMenu(event){
        setAnchorEl(event.currentTarget);
    }
    function closeMenu(){
        setAnchorEl(null);
    }

    return (
        <>
            <div className="flex flex-row relative h-0 bottom-8">
                {/* the idea is you can submit additional text + img to an existing project
                person has to accept it, then it will become part of the original project ( with credit to the submiter )
                projects can become a collaborative effort */}
                {/* <div className="rounded-md flex items-center justify-evenly transition duration-200 mr-2 border border-neutral-800/0 hover:border-neutral-600 hover:bg-neutral-800 h-9 w-[90px]">
                    <div 
                    onClick={collabProject}
                    className='flex w-1/2 h-full items-center transition duration-200 bg-gradient-to-r hover:from-emerald-400/20 hover:text-emerald-400 cursor-pointer'>
                        <BsChatSquareText className='m-auto self-center' />
                    </div>
                    <div
                    onClick={seeProjectCollabs}
                    className='flex w-1/2 h-full transition duration-200 bg-gradient-to-l hover:from-emerald-400/20 hover:text-emerald-400 cursor-pointer'>
                        <span className='m-auto self-center'>{project.likes}</span>
                    </div>
                </div>
                <div className="rounded-md flex items-center justify-evenly transition duration-200 mr-2 border border-neutral-800/0 hover:border-neutral-600 hover:bg-neutral-800 h-9 w-[90px]">
                    <div 
                    onClick={branchProject} 
                    className='flex w-1/2 h-full items-center transition duration-200 bg-gradient-to-r hover:from-cyan-400/20 hover:text-cyan-400 cursor-pointer'>
                        <BiCopy className='m-auto self-center' />
                    </div>
                    <div
                    onClick={seeProjectBranches}
                    className='flex w-1/2 h-full transition duration-200 bg-gradient-to-l hover:from-cyan-400/20 hover:text-cyan-400 cursor-pointer'>
                        <span className='m-auto self-center'>{project.likes}</span>
                    </div>
                </div> */}
                <div className="rounded-md flex items-center justify-evenly transition duration-200 mr-2 hover:bg-neutral-800 h-9 w-[90px]">
                    <div 
                    onClick={likeProject}
                    className='rounded-l-md flex w-1/2 h-full items-center transition duration-200 bg-gradient-to-r hover:from-rose-400/20 hover:text-rose-400 cursor-pointer'>
                        <AiOutlineHeart className='m-auto self-center' />
                    </div>
                    <div
                    onClick={seeProjectLikes}
                    className='rounded-r-md flex w-1/2 h-full transition duration-200 bg-gradient-to-l hover:from-rose-400/20 hover:text-rose-400 cursor-pointer'>
                        <span className='m-auto self-center'>{project.likes}</span>
                    </div>
                </div>
                <div className="rounded-md flex items-center justify-evenly transition duration-200 mr-2 hover:bg-neutral-800 h-9 w-[90px]">
                    <div 
                    onClick={shareProject} 
                    className='rounded-l-md flex w-1/2 h-full items-center transition duration-200 bg-gradient-to-r hover:from-lime-400/20 hover:text-lime-400 cursor-pointer'>
                        <PiShareFat className='m-auto self-center' />
                    </div>
                    <div
                    onClick={seeProjectShares}
                    className='rounded-r-md flex w-1/2 h-full transition duration-200 bg-gradient-to-l hover:from-lime-400/20 hover:text-lime-400 cursor-pointer'>
                        <span className='m-auto self-center'>{project.likes}</span>
                    </div>
                </div>
                <div onClick={bookmarkProject} className="rounded-md flex items-center transition duration-200 mr-2 hover:bg-neutral-800 h-9 w-[45px] bg-gradient-to-l hover:from-orange-400/20 hover:text-orange-400 cursor-pointer">
                    <BsBookmark className='w-full' />
                </div>
                <div onClick={openMenu} className="rounded-md flex items-center transition duration-200 mr-2 h-9 px-2 hover:bg-neutral-800 cursor-pointer">
                    <BiDotsVerticalRounded />
                </div>
                <Menu
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    elevation={0}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={closeMenu}
                >
                    <div className='w-[180px] bg-neutral-800 border border-neutral-600 rounded-md flex items-center'>
                        <div 
                        className="flex w-1/2 py-2 cursor-pointer bg-gradient-to-r hover:from-red-400/20 hover:text-red-400" onClick={closeMenu}>
                            <span className='m-auto'>
                                <PiWarningCircle />
                            </span>
                        </div>
                        <div 
                        className="flex w-1/2 py-2 cursor-pointer bg-gradient-to-l hover:from-violet-400/20 hover:text-violet-400" onClick={closeMenu}>
                            <span className='m-auto'>
                                <AiOutlineEyeInvisible />
                            </span>
                        </div>
                    </div>
                </Menu>
            </div>
        </>
    );
}