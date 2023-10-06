import HomeProjectActions from './home-project-actions';
import HomeProjectStatus from './home-project-status';
import HomeProjectImageGrid from './home-project-imageGrid';

import { useNavigate } from "react-router-dom";

export default function HomeProjectMain(props) {
  
    let navigate = useNavigate(); 

    const project = props.project;
    const toProject = (project) => {
        navigate(`/${project.id}`);
    }
    return (
        <>
            <div className="transition duration-200 border-t border-b border-neutral-800 bg-neutral-900 hover:border-cyan-400 hover:scale-110 px-8 py-4 mb-4">
                <div key={project.id}>
                    <div className="justify-around flex flex-row">
                        <div onClick={() => toProject(project)} className="cursor-pointer w-1/2 relative">
                            <div className="text-lg">
                                <span className="font-semibold">{project.user.nickname}</span>
                                <span className="text-gray-400 ml-2">@{project.user.username}</span>
                            </div>
                            <div className="text-justify my-2 pr-4 text-xl h-[200px] overflow-y-auto">
                                {project.content}
                            </div>
                        </div>
                        <HomeProjectImageGrid project={project} />
                    </div>
                    <div className='flex flex-row justify-between w-1/2'> 
                        <HomeProjectActions project={project} />
                        <HomeProjectStatus project={project} />
                    </div>
                </div>
            </div>
        </>
    );
}