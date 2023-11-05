import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Menu from '@mui/material/Menu';
import BranchCreate from './branch/branch-create';

import UserContext from "../login-view/userContext";

import { BiCog } from 'react-icons/bi';

export default function ProjectBranchNavbar(props) {
    const navigate = useNavigate();
    const user = useContext(UserContext);

    const project = props.project;
    const branch = props.branch;
    const [selectedBranch, setSelectedBranch] = useState(project.branches.find(x => x.id === branch));

    useEffect(() => {
        const checkDefault = () => {
            for(let i = 0; i < project.branches.length; i++){
                if(project.branches[i].id === selectedBranch.id){
                    project.branches[i].selected = true;
                }
            }
        }
        checkDefault();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeBranch = (branch) => {
        setSelectedBranch(branch);
        props.parentCallback(branch);
    }

    const toProjectSettings = () => {
        navigate(`/${project.id}/settings`);
    }
    // Menu Handle
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    function openCreateBranch(event){
        setAnchorEl(event.currentTarget);
    }
    function closeCreateBranch(){
        setAnchorEl(null);
    }

    return (
        <>
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row'>
                {(project.branches).map(branch => (
                    branch.permissions.private === false ?
                    <div key={branch.name} className="items-center flex">
                        {branch.id === selectedBranch.id ?
                            <div className="rounded-t-md border-b border-neutral-600 bg-neutral-600 px-2 py-1 transition duration-200 text-cyan-500 mr-1 w-fit cursor-default">
                                {branch.name}
                            </div>
                        : 
                            <div onClick={() => changeBranch(branch)} className="cursor-pointer rounded-t-md bg-neutral-800 transition duration-200 hover:bg-neutral-600 hover:text-cyan-400 border hover:border-cyan-600 border-cyan-600/0 px-2 py-1 mr-1 w-fit">
                                {branch.name}
                            </div>
                        }
                    </div>
                    : null
                ))}
                {user && project.permissions.branch === true ?
                <div 
                className="cursor-pointer rounded-t-md bg-neutral-800 transition duration-200 hover:bg-neutral-600 hover:text-cyan-400 border hover:border-cyan-600 border-cyan-600/0 px-2 py-1 w-fit"
                onClick={openCreateBranch}
                >
                    <span className='font-bold'>+</span>
                </div>
                : null }
            </div>
            {user&& user.id === project.user.id ?
            <div 
            className="items-center flex cursor-pointer rounded-t-md bg-neutral-800 transition duration-200 hover:bg-neutral-600 hover:text-cyan-400 border hover:border-cyan-600 border-cyan-600/0 px-1"
            onClick={toProjectSettings}
            >
                <BiCog size={25} />
            </div>
            : null }
        </div>
        <div className='mb-4 px-8 py-2 bg-neutral-600 rounded-b-md'>
            {selectedBranch.description}
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
            onClose={closeCreateBranch}
        >
            <BranchCreate project={project} />
        </Menu>
        </>
    );
}