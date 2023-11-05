import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Cookies } from 'react-cookie';

import Menu from '@mui/material/Menu';

import UserContext from "../login-view/userContext";

import { BiCog } from 'react-icons/bi';
import { RiUserLine } from 'react-icons/ri';
import { RxExit } from 'react-icons/rx';

export default function NavbarUserMenu(props) {
    const user = useContext(UserContext);
    const [userExists, setUserExists] = useState();
    const cookieManager = new Cookies();

    const userLogin = async () => {
        window.location.href = 'http://localhost:3030/users/auth';
    }
    const userLogout = async () => {
        const token = cookieManager.get('poster__googleOAuth_token');
        console.log(token);
        const googleId = localStorage.getItem('poster__googleOAuth_id');
        const data = {
            token: token,
            googleId: googleId
        };
        await axios.post('http://localhost:3030/users/logout', data).then(res => {
            if(res.data.valid === true){
                setUserExists(false);
                cookieManager.remove('poster__googleOAuth_token');
                localStorage.removeItem('poster__googleOAuth_id');
                props.parentCallback(false);
            }
        });
    }

    const toProfile = () => {

    }
    const toSettings = () => {

    }

    useEffect(() => {
        if(user){
            setUserExists(true);
        } else{
            setUserExists(false);
        }
    }, [user])

    // Menu Handle
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    function openMenu(event){
        setAnchorEl(event.currentTarget);
    }
    function closeMenu(){
        setAnchorEl(null);
    }

    return (
    <>
        {userExists ?
        <div className="z-20">
            <div className="px-5 h-full flex items-center w-fit cursor-pointer transition duration-200 bg-neutral-900 hover:bg-sky-800 uppercase font-bold"
            onClick={openMenu}>
                {user.username}
            </div>
            <Menu
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                elevation={0}
                anchorEl={anchorEl}
                open={open}
                onClose={closeMenu}
            >   
                <div className='w-[180px] grid gap-y-4 items-center bg-neutral-800 py-4 rounded-md'>
                    <div className="py-[1px] transition duration-200 bg-gradient-to-tr from-cyan-600 to-neutral-700 hover:to-cyan-400">
                        <div 
                        className="flex w-full justify-around py-2 cursor-pointer bg-gradient-to-tr from-neutral-700 to-neutral-800 hover:from-cyan-800 hover:to-neutral-800" 
                        onClick={() => toProfile()}>
                            <RiUserLine size={25} />
                            <span className='uppercase font-semibold'>
                                Profile
                            </span>
                        </div>
                    </div>
                    <div className="py-[1px] transition duration-200 bg-gradient-to-tr from-cyan-600 to-neutral-700 hover:to-cyan-400">
                        <div 
                        className="flex w-full justify-around py-2 cursor-pointer bg-gradient-to-tr from-neutral-700 to-neutral-800 hover:from-cyan-800 hover:to-neutral-800" 
                        onClick={() => toSettings()}>
                            <BiCog className="ml-1" size={25} />
                            <span className='uppercase font-semibold'>
                                Settings
                            </span>
                        </div>
                    </div>
                    <div className="py-[1px] transition duration-200 bg-gradient-to-tr from-rose-600 to-neutral-700 hover:to-rose-400">
                        <div 
                        className="flex w-full justify-around py-2 cursor-pointer bg-gradient-to-tr from-neutral-700 to-neutral-800 hover:from-rose-800 hover:to-neutral-800" 
                        onClick={() => userLogout()}>
                            <RxExit size={25} />
                            <span className='uppercase font-semibold'>
                                Logout
                            </span>
                        </div>
                    </div>
                </div>
            </Menu>
        </div>
        :
            <div className="px-5 flex items-center w-fit cursor-pointer transition duration-200 bg-neutral-900 hover:bg-sky-800 uppercase font-bold"
            onClick={() => userLogin()}>
                Login
            </div>
        }
    </>
    );
}