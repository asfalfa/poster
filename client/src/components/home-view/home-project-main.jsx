import HomeProjectActions from './home-project-actions';
import HomeProjectStatus from './home-project-status';
import HomeProjectImageGrid from './home-project-imageGrid';

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { AiOutlineBranches } from 'react-icons/ai';

export default function HomeProjectMain(props) {
    const [selectedBranch, setBranch] = useState();
    const project = props.project;

    const navigate = useNavigate(); 
    const toBranch = (project, branch) => {
        navigate(`/${project.id}/${branch.id}`);
    }

    const getBranch = () => {
        let defaultBranch = project.branches.find(branch => branch.default === true);
        if(project.branches && props.project.metrics.maxStats){
            let selectedBranch = project.branches.find(branch => branch.id === props.project.metrics.maxStats);
            setBranch(selectedBranch);
        } else{
            setBranch(defaultBranch);
        }
    }
    
    useEffect(() => {
        getBranch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <>
            <div className="transition duration-200 border-t border-b border-neutral-800 bg-neutral-900 hover:border-cyan-400 hover:scale-110 px-8 py-4">
                {selectedBranch ?
                    <div key={selectedBranch.id}>
                        <div className="flex flex-row">
                            <div onClick={() => toBranch(project, selectedBranch)} className="cursor-pointer w-1/2 relative">
                                <div className="text-lg">
                                    <span className="text-gray-200 font-semibold">{selectedBranch.user.nickname}</span>
                                    <span className="text-gray-400 ml-2">@{selectedBranch.user.username}</span>
                                </div>
                                <div className="text-lg flex flex-row">
                                    <span className="font-bold">{project.name}</span>
                                    <span className="text-gray-400 ml-2 flex flex-row items-center"><AiOutlineBranches />{selectedBranch.name}</span>
                                </div>
                                <div className="text-justify my-2 pr-4 text-xl h-[200px] overflow-y-auto">
                                    {selectedBranch.description}
                                </div>
                            </div>
                            <HomeProjectImageGrid project={project} branch={selectedBranch} />
                        </div>
                        <div className='flex flex-row justify-between w-1/2'> 
                            <HomeProjectActions project={project} branch={selectedBranch} />
                            <HomeProjectStatus branch={selectedBranch} />
                        </div>
                    </div>
                : null }
            </div>
        </>
    );
}