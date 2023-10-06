export default function ProjectBranchNavbar(props) {
    const project = props.project;

    const defaultBranch = project.branches.find(branch => branch.default === true);

    // This should send the selected branch to the parent element (project-main)

    return (
        <>
        <div>
            {(project.branches).map(branch => (
                <div>
                    {branch.name}
                </div>
            ))}
        </div>
        </>
    );
}