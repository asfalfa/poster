import HomeProjectMain from './home-project-main';

import { useEffect, useState } from 'react';
import axios from "axios";

export default function HomeMain() {
  const [sortedProjects, setSorted] = useState();

  useEffect(() => {
    const sortProjects = (projects) => {
      let sorted = projects.sort((a, b) => b.metrics.stats - a.metrics.stats);
      setSorted(sorted);
    }

    const fetchProjects = async () => {
      const res = await axios.get('http://localhost:3030/projects');
      sortProjects(res.data);
    }

    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="bg-neutral-900 w-full min-h-full">
        <div className="pt-8 pb-6 grid gap-y-4">
          {sortedProjects ?
          sortedProjects.map(project => (
            <HomeProjectMain key={project.id} project={project} />
          ))
          : null}
        </div>
      </div>
    </>
  );
}