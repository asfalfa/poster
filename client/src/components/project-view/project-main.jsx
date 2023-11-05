import BranchMain from "./branch/branch-main";
import ProjectBranchNavbar from "./project-branch-navbar";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import axios from "axios";

export default function ProjectMain() {
    const navigate = useNavigate();
    const [project, setProject] = useState();
    const [branch, setBranch] = useState();
    const params = useParams();

    const fetchProject = async () => {
        const res = await axios.get('http://localhost:3030/projects/' + params.project);
        setProject(res.data);
        return res.data;
    }

    const fetchBranch = async (newBranch) => {
        const res = await axios.get(`http://localhost:3030/projects/${project.id}/${newBranch.id}`);
        setBranch(res.data.branch);
    }

    useEffect(() => {
        fetchProject().then(project => {
            const selectedBranch = (project.branches).find(branch => branch.id === params.branch);
            setBranch(selectedBranch);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCallback = (childBranch) => {
        fetchBranch(childBranch);
        navigate(`/${project.id}/${childBranch.id}`);
    }


    return (
        <>
        <div className="bg-neutral-900 w-full min-h-full">
            <div className="pt-8 pb-6">
                {project ?
                <div>
                    <ProjectBranchNavbar project={project} branch={params.branch} parentCallback={handleCallback} />
                    <BranchMain project={project} branch={branch} />
                </div>
                : null}
            </div>
        </div>
        </>
    );
}