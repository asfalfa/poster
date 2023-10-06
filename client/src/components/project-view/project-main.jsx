import BranchMain from "./branch/branch-main";
import ProjectBranchNavbar from "./project-branch-navbar";

import { useParams } from "react-router-dom";

export default function ProjectMain() {
    // we will get the selected branch from the ProjectBranchNavbar component, then send this branch as a prop to BranchMain
    const projectID = useParams();
    console.log(projectID)
    let selectedBranch = project.branches.find(branch => branch.default === true);

    return (
        <>
        <div className="bg-neutral-900 w-full min-h-full">
            <div className="pt-8 pb-6">
                {/* need a navbar to select the branch, default to main branch, then we show the branch, which will show the posts within */}
                <ProjectBranchNavbar project={project} />
                <BranchMain branch={selectedBranch} />
            </div>
        </div>
        </>
    );
}