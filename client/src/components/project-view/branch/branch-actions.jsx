import axios from "axios";

import { useState, useEffect, useContext } from 'react';

import Menu from '@mui/material/Menu';

import { AiOutlineHeart, AiFillHeart, AiOutlineBranches } from 'react-icons/ai';
import { PiShareFat } from 'react-icons/pi';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { BiPencil } from 'react-icons/bi';

import PostCreate from '../post/post-create';
import UserContext from "../../login-view/userContext";

export default function BranchActions(props) {
    const user = useContext(UserContext);
    const project = props.project;
    const [branch, setBranch] = useState(props.branch);
    useEffect(() => {
        setBranch(props.branch);
    }, [props.branch]);

    const [canLike, setCanLike] = useState(true);
    const [canBookmark, setCanBookmark] = useState(true);
    useEffect(() => {
        const checkUser = () => {
            if (user && props.branch.interactions.likes.some(x => x.id === user.id)){
                setCanLike(false);
            }else{
                setCanLike(true);
            }
            if (user && props.branch.interactions.bookmarks.some(x => x.id === user.id)){
                setCanBookmark(false);
            }else{
                setCanBookmark(true);
            }
        }

        checkUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.branch]);


    // Interaction
    function interactWithBranch(interaction){
        axios.post(`http://localhost:3030/projects/interactions/${project.id}/${branch.id}`,{
            interaction: interaction,
            user: user
        });
        switch(interaction){
            case 'removebookmarks':
                setCanBookmark(true);
                break;
            case 'bookmarks':
                setCanBookmark(false);
                break;
            case 'removelikes':
                setCanLike(true);
                break;
            case 'likes':
                setCanLike(false);
                break;
            default:
                console.log('Something went wrong.');
        }
    }

    // Menu Handle
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    function openCollaborateMenu(event){
        setAnchorEl(event.currentTarget);
    }
    function closeCollaborateMenu(){
        setAnchorEl(null);
    }

    return (
        <>
            <div className='z-10 flex flex-row items-center relative bg-neutral-700 px-5 rounded-t-md cursor-default'>
                <AiOutlineBranches />
                {branch.name}
            </div>
            <div className='z-0 flex flex-row items-center justify-center rounded-b-md text-neutral-400 w-fit m-auto'>
                {branch.permissions.collaborate && project.permissions.collaborate ?
                <div className='w-[90px] h-[60px] p-[2px] rounded-b-md transition duration-200 bg-gradient-to-tr from-neutral-700 to-neutral-800 hover:from-cyan-600 hover:to-neutral-700 flex justify-center'>
                    <div
                    onClick={openCollaborateMenu}
                    className='h-fit py-2 px-5 rounded-b-md cursor-pointer bg-gradient-to-tr from-neutral-700 to-neutral-800 hover:from-cyan-600 transition duration-200 hover:first:scale-110'>
                        <BiPencil size={40}/>
                    </div>
                </div>
                : null}
                {canLike ?
                <div className='w-[90px] h-[60px] p-[2px] rounded-b-md transition duration-200 bg-gradient-to-tr from-neutral-700 to-neutral-800 hover:from-rose-600 hover:to-neutral-700 flex justify-center'>
                    <div
                    onClick={() => interactWithBranch('likes')}
                    className='h-fit py-2 px-5 rounded-b-md cursor-pointer bg-gradient-to-tr from-neutral-700 to-neutral-800 hover:from-rose-600 transition duration-200 hover:first:scale-110'>
                        <AiOutlineHeart size={40}/>
                    </div>
                </div>
                :
                <div className='w-[90px] h-[60px] p-[2px] rounded-b-md transition duration-200 bg-gradient-to-tr from-neutral-700 to-neutral-800 hover:from-rose-600 hover:to-neutral-700 flex justify-center'>
                    <div
                    onClick={() => interactWithBranch('removelikes')}
                    className='h-fit py-2 px-5 rounded-b-md cursor-pointer bg-gradient-to-tr from-neutral-700 to-neutral-800 hover:from-rose-600 transition duration-200 hover:first:scale-110'>
                        <AiFillHeart size={40}/>
                    </div>
                </div>
                }
                {branch.permissions.share && project.permissions.share ?
                <div className='w-[90px] h-[60px] p-[2px] rounded-b-md transition duration-200 bg-gradient-to-tr from-neutral-700 to-neutral-800 hover:from-lime-600 hover:to-neutral-700 flex justify-center'>
                    <div 
                    onClick={() => interactWithBranch('shares')}
                    className='h-fit py-2 px-5 rounded-b-md cursor-pointer bg-gradient-to-tr from-neutral-700 to-neutral-800 hover:from-lime-600 transition duration-200 hover:first:scale-110'>
                        <PiShareFat size={40}/>
                    </div>
                </div>
                : null}
                {canBookmark ?
                <div className='w-[90px] h-[60px] p-[2px] rounded-b-md transition duration-200 bg-gradient-to-tr from-neutral-700 to-neutral-800 hover:from-violet-600 hover:to-neutral-700 flex justify-center'>
                    <div
                    onClick={() => interactWithBranch('bookmarks')}
                    className='h-fit py-2 px-5 rounded-b-md cursor-pointer bg-gradient-to-tr from-neutral-700 to-neutral-800 hover:from-violet-600 transition duration-200 hover:first:scale-110'>
                        <BsBookmark size={40}/>
                    </div>
                </div>
                :
                <div className='w-[90px] h-[60px] p-[2px] rounded-b-md transition duration-200 bg-gradient-to-tr from-neutral-700 to-neutral-800 hover:from-violet-600 hover:to-neutral-700 flex justify-center'>
                    <div
                    onClick={() => interactWithBranch('removebookmarks')}
                    className='h-fit py-2 px-5 rounded-b-md cursor-pointer bg-gradient-to-tr from-neutral-700 to-neutral-800 hover:from-violet-600 transition duration-200 hover:first:scale-110'>
                        <BsBookmarkFill size={40}/>
                    </div>
                </div>
                }
            </div>
            <Menu
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                elevation={0}
                anchorEl={anchorEl}
                open={open}
                onClose={closeCollaborateMenu}
            >
                <PostCreate />
            </Menu>
        </>
    );
}