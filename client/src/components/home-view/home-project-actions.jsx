import { useState, useEffect, useContext } from 'react';

import { AiOutlineEyeInvisible, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { PiShareFat, PiWarningCircle } from 'react-icons/pi';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import Menu from '@mui/material/Menu';
import axios from "axios";

import HomeProjectActionsDialog from './home-project-actions-dialog';

import UserContext from "../login-view/userContext";
import HomeProjectLoginDialog from './home-project-login-dialog';

export default function HomeProjectActions(props) {
    const user = useContext(UserContext);
    const project = props.project;
    const branch = props.branch;

    const [canLike, setCanLike] = useState(true);
    const [canBookmark, setCanBookmark] = useState(true);

    const [likes, setLikes] = useState();
    const [shares, setShares] = useState();

    useEffect(() => {
        const checkInteractions = () => {
            setLikes(branch.interactions.likes);
            setShares(branch.interactions.shares);
        }       

        const checkUser = async() => {
            if (user && branch.interactions.likes.some(x => x.id === user.id)){
                setCanLike(false);
            } else{
                setCanLike(true);
            }
            if (user && branch.interactions.bookmarks.some(x => x.id === user.id)){
                setCanBookmark(false);
            } else{
                setCanBookmark(true);
            }
        }

        checkInteractions();
        checkUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, branch]);

    // Interaction
    async function interactWithBranch(interaction){
        const res = await axios.post(`http://localhost:3030/projects/interactions/${project.id}/${branch.id}`,{
            interaction: interaction,
            user: user
        });
        switch(interaction){
            case 'removelikes':
                setLikes(res.data.interaction);
                setCanLike(true);
                break;
            case 'likes':
                setLikes(res.data.interaction);
                setCanLike(false);
                break;
            case 'shares':
                setShares(res.data.interaction);
                break;
            case 'removebookmarks':
                setCanBookmark(true);
                break;
            case 'bookmarks':
                setCanBookmark(false);
                break;
            case 'reports':
                closeMenu();
                break;
            case 'hidden':
                closeMenu();
                break;
            default:
                console.log('Something went wrong.');
        }
    }

    // Hide and Report Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    function openMenu(event){
        setAnchorEl(event.currentTarget);
    }
    function closeMenu(){
        setAnchorEl(null);
    }

    // Open Dialogs
    const [openInteractionDialog, setInteractionDialogOpen] = useState(false);
    const [openLoginDialog, setLoginDialogOpen] = useState(false);
    const [dialogValue, setDialogValue] = useState([]);
    const openDialog = (interaction) => {
        setDialogValue(branch.interactions[interaction]);
        setInteractionDialogOpen(true);
    };
    const handleClose = () => {
        setInteractionDialogOpen(false);
    };
    const handleOpenLoginDialog = () => {
        setLoginDialogOpen(true);
    };
    const handleLoginClose = () => {
        setLoginDialogOpen(false);
    }

    return (
        <>
            {user ?
                <div className="flex flex-row relative h-0 bottom-8">
                    {likes ?
                    <div className="rounded-md flex items-center justify-evenly transition duration-200 mr-2 hover:bg-neutral-800 h-9 w-[90px]">
                        {canLike ? 
                        <div 
                        onClick={() => interactWithBranch('likes')}
                        className='rounded-l-md flex w-1/2 h-full items-center transition duration-200 bg-gradient-to-r hover:from-rose-400/20 hover:text-rose-400 cursor-pointer'>
                            <AiOutlineHeart className='m-auto self-center' />
                        </div>
                        :
                        <div 
                        onClick={() => interactWithBranch('removelikes')}
                        className='rounded-l-md flex w-1/2 h-full items-center transition duration-200 bg-gradient-to-r hover:from-rose-400/20 hover:text-rose-400 cursor-pointer'>
                            <AiFillHeart className='m-auto self-center' />
                        </div>
                        }
                        <div
                        onClick={() => openDialog('likes')}
                        className='rounded-r-md flex w-1/2 h-full transition duration-200 bg-gradient-to-l hover:from-rose-400/20 hover:text-rose-400 cursor-pointer'>
                            <span className='m-auto self-center'>{likes.length}</span>
                        </div>
                    </div>
                    : null}
                    {shares ?
                    <div className="rounded-md flex items-center justify-evenly transition duration-200 mr-2 hover:bg-neutral-800 h-9 w-[90px]">
                        <div 
                        onClick={() => interactWithBranch('shares')} 
                        className='rounded-l-md flex w-1/2 h-full items-center transition duration-200 bg-gradient-to-r hover:from-lime-400/20 hover:text-lime-400 cursor-pointer'>
                            <PiShareFat className='m-auto self-center' />
                        </div>
                        <div
                        onClick={() => openDialog('shares')}
                        className='rounded-r-md flex w-1/2 h-full transition duration-200 bg-gradient-to-l hover:from-lime-400/20 hover:text-lime-400 cursor-pointer'>
                            <span className='m-auto self-center'>{shares.length}</span>
                        </div>
                    </div>
                    : null}
                    {canBookmark ?
                    <div onClick={() => interactWithBranch('bookmarks')} className="rounded-md flex items-center transition duration-200 mr-2 hover:bg-neutral-800 h-9 w-[45px] bg-gradient-to-l hover:from-violet-400/20 hover:text-violet-400 cursor-pointer">
                        <BsBookmark className='w-full' />
                    </div>
                    :
                    <div
                    onClick={() => interactWithBranch('removebookmarks')}
                    className="rounded-md flex items-center transition duration-200 mr-2 hover:bg-neutral-800 h-9 w-[45px] bg-gradient-to-l hover:from-violet-400/20 hover:text-violet-400 cursor-pointer">
                        <BsBookmarkFill className='w-full' />
                    </div>
                    }
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
                        <div className='w-[180px] bg-neutral-800 rounded-md flex items-center'>
                            <div 
                            className="flex w-1/2 py-2 cursor-pointer bg-gradient-to-r hover:from-red-400/20 hover:text-red-400 rounded-l-md" 
                            onClick={() => interactWithBranch('reports')}>
                                <span className='m-auto'>
                                    <PiWarningCircle />
                                </span>
                            </div>
                            <div 
                            className="flex w-1/2 py-2 cursor-pointer bg-gradient-to-l hover:from-violet-400/20 hover:text-violet-400 rounded-r-md" 
                            onClick={() => interactWithBranch('hidden')}>
                                <span className='m-auto'>
                                    <AiOutlineEyeInvisible />
                                </span>
                            </div>
                        </div>
                    </Menu>
                </div>
            : 
                <div className="flex flex-row relative h-0 bottom-8">
                    {likes ?
                    <div className="rounded-md flex items-center justify-evenly transition duration-200 mr-2 hover:bg-neutral-800 h-9 w-[90px]">
                        <div 
                        onClick={handleOpenLoginDialog}
                        className='rounded-l-md flex w-1/2 h-full items-center transition duration-200 bg-gradient-to-r hover:from-rose-400/20 hover:text-rose-400 cursor-pointer'>
                            <AiOutlineHeart className='m-auto self-center' />
                        </div>
                        <div
                        onClick={() => openDialog('likes')}
                        className='rounded-r-md flex w-1/2 h-full transition duration-200 bg-gradient-to-l hover:from-rose-400/20 hover:text-rose-400 cursor-pointer'>
                            <span className='m-auto self-center'>{likes.length}</span>
                        </div>
                    </div>
                    : null}
                    {shares ?
                    <div className="rounded-md flex items-center justify-evenly transition duration-200 mr-2 hover:bg-neutral-800 h-9 w-[90px]">
                        <div 
                        onClick={handleOpenLoginDialog} 
                        className='rounded-l-md flex w-1/2 h-full items-center transition duration-200 bg-gradient-to-r hover:from-lime-400/20 hover:text-lime-400 cursor-pointer'>
                            <PiShareFat className='m-auto self-center' />
                        </div>
                        <div
                        onClick={() => openDialog('shares')}
                        className='rounded-r-md flex w-1/2 h-full transition duration-200 bg-gradient-to-l hover:from-lime-400/20 hover:text-lime-400 cursor-pointer'>
                            <span className='m-auto self-center'>{shares.length}</span>
                        </div>
                    </div>
                    : null}
                    <div onClick={handleOpenLoginDialog} className="rounded-md flex items-center transition duration-200 mr-2 hover:bg-neutral-800 h-9 w-[45px] bg-gradient-to-l hover:from-orange-400/20 hover:text-orange-400 cursor-pointer">
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
                        <div className='w-[180px] bg-neutral-800 rounded-md flex items-center'>
                            <div 
                            className="flex w-1/2 py-2 cursor-pointer bg-gradient-to-r hover:from-red-400/20 hover:text-red-400 rounded-l-md" 
                            onClick={handleOpenLoginDialog}>
                                <span className='m-auto'>
                                    <PiWarningCircle />
                                </span>
                            </div>
                            <div 
                            className="flex w-1/2 py-2 cursor-pointer bg-gradient-to-l hover:from-violet-400/20 hover:text-violet-400 rounded-r-md" 
                            onClick={handleOpenLoginDialog}>
                                <span className='m-auto'>
                                    <AiOutlineEyeInvisible />
                                </span>
                            </div>
                        </div>
                    </Menu>
                </div>
            }
            <HomeProjectLoginDialog open={openLoginDialog} onClose={handleLoginClose} />
            <HomeProjectActionsDialog open={openInteractionDialog} onClose={handleClose} interaction={dialogValue} />
        </>
    );
}