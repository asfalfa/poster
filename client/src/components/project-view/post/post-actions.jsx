import { AiOutlineEyeInvisible, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { PiShareFat, PiWarningCircle } from 'react-icons/pi';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { BiDotsVerticalRounded , BiCopy} from 'react-icons/bi';

import Menu from '@mui/material/Menu';
import { useState, useEffect, useContext } from 'react';
import axios from "axios";

import UserContext from "../../login-view/userContext";

import PostActionsDialog from './post-actions-dialog';

export default function PostActions(props) {
    const user = useContext(UserContext);
    // eslint-disable-next-line
    const [post, setPost] = useState(props.post);
    const project = props.project;
    const branch = props.branch;

    const [allowShare, setAllowShare] = useState(true);
    const [allowBranch, setAllowBranch] = useState(true);
    const [allowedMembers, setAllowedMember] = useState([]);

    const [canLike, setCanLike] = useState(true);
    const [canBookmark, setCanBookmark] = useState(true);

    const [likes, setLikes] = useState();
    const [branches, setBranches] = useState();
    const [shares, setShares] = useState();


    useEffect(() => {
        const checkPermissions = () => {
            if(project.permissions.share === false || branch.permissions.share === false || post.permissions.share === false){
                setAllowShare(false);
            }
            if(project.permissions.branch === false || branch.permissions.branch === false || post.permissions.branch === false){
                setAllowBranch(false);
            }
            if(project.permissions.private){
                setAllowedMember(project.permissions.allowedMembers);
                if(branch.permissions.private && branch.permissions.allowedMembers.length > 0){
                    let allowedInBoth = (branch.permissions.allowedMembers).filter(x => !allowedMembers.includes(x)).concat(allowedMembers.filter(x => !(branch.permissions.allowedMembers).includes(x)));
                    console.log(allowedInBoth);
                    setAllowedMember(allowedInBoth);
                }
            } else if (branch.permissions.private){
                setAllowedMember(branch.permissions.allowedMembers);
            }
        }

        const checkInteractions = () => {
            setLikes(post.interactions.likes);
            setBranches(post.interactions.branches);
            setShares(post.interactions.shares);
        }

        const checkUser = () => {
            if(user){
                if (post.interactions.likes.some(x => x.id === user.id)){
                    setCanLike(false);
                }else{
                    setCanLike(true);
                }
                if (post.interactions.bookmarks.some(x => x.id === user.id)){
                    setCanBookmark(false);
                }else{
                    setCanBookmark(true);
                }
            }
        }

        checkPermissions();
        checkInteractions();
        checkUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  

    // Interaction
    async function interactWithPost(interaction){
        const res = await axios.post(`http://localhost:3030/projects/interactions/${project.id}/${branch.id}/${post.id}`,{
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
            case 'branches':
                setBranches(res.data.interaction);
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
    const [dialogValue, setDialogValue] = useState([]);
    const openDialog = (interaction) => {
        setDialogValue(post.interactions[interaction]);
        setInteractionDialogOpen(true);
    };
    const handleClose = () => {
        setInteractionDialogOpen(false);
    };

    return (
        <>
            <div className="flex flex-row relative h-8">
                {likes ?
                    <div className="rounded-md flex items-center justify-evenly transition duration-200 mr-2 hover:bg-neutral-800 h-9 w-[90px]">
                        {canLike ? 
                        <div 
                        onClick={() => interactWithPost('likes')}
                        className='rounded-l-md flex w-1/2 h-full items-center transition duration-200 bg-gradient-to-r hover:from-rose-400/20 hover:text-rose-400 cursor-pointer'>
                            <AiOutlineHeart className='m-auto self-center' />
                        </div>
                        : 
                        <div
                        onClick={() => interactWithPost('removelikes')}
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
                {branches && allowBranch ?
                    <div className="rounded-md flex items-center justify-evenly transition duration-200 mr-2 hover:bg-neutral-800 h-9 w-[90px]">
                        <div 
                        onClick={() => interactWithPost('branches')} 
                        className='rounded-l-md flex w-1/2 h-full items-center transition duration-200 bg-gradient-to-r hover:from-blue-400/20 hover:text-blue-400 cursor-pointer'>
                            <BiCopy className='m-auto self-center' />
                        </div>
                        <div
                        onClick={() => openDialog('branches')}
                        className='rounded-r-md flex w-1/2 h-full transition duration-200 bg-gradient-to-l hover:from-blue-400/20 hover:text-blue-400 cursor-pointer'>
                            <span className='m-auto self-center'>{branches.length}</span>
                        </div>
                    </div>
                : null }
                {shares && allowShare ?
                    <div className="rounded-md flex items-center justify-evenly transition duration-200 mr-2 hover:bg-neutral-800 h-9 w-[90px]">
                        <div 
                        onClick={() => interactWithPost('shares')} 
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
                <div onClick={() => interactWithPost('bookmarks')} className="rounded-md flex items-center transition duration-200 mr-2 hover:bg-neutral-800 h-9 w-[45px] bg-gradient-to-l hover:from-violet-400/20 hover:text-violet-400 cursor-pointer">
                    <BsBookmark className='w-full' />
                </div>
                :
                <div
                onClick={() => interactWithPost('removebookmarks')}
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
                        onClick={() => interactWithPost('reports')}>
                            <span className='m-auto'>
                                <PiWarningCircle />
                            </span>
                        </div>
                        <div 
                        className="flex w-1/2 py-2 cursor-pointer bg-gradient-to-l hover:from-violet-400/20 hover:text-violet-400 rounded-r-md" 
                        onClick={() => interactWithPost('hidden')}>
                            <span className='m-auto'>
                                <AiOutlineEyeInvisible />
                            </span>
                        </div>
                    </div>
                </Menu>
            </div>
            <PostActionsDialog open={openInteractionDialog} onClose={handleClose} interaction={dialogValue} />
        </>
    );
}