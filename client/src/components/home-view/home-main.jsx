import HomeProjectMain from './home-project-main';

import ProjectService from '../../services/projectService';

export default function HomeMain() {
  const projects = ProjectService.getAllProjects();

  return (
    <>
      <div className="bg-neutral-900 w-full min-h-full">
        <div className="pt-8 pb-6">
          {projects.map(project => (
            <HomeProjectMain project={project} />
          ))}
        </div>
      </div>
    </>
  );
}