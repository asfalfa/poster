import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../login-view/userContext";

import { BiBookHeart } from 'react-icons/bi';
import { RiGroupLine } from 'react-icons/ri';
import { TbBookUpload } from 'react-icons/tb';

import axios from "axios";

export default function UserSidebar() {
    const user = useContext(UserContext);
    const [collabs, setCollabs] = useState();
    const navigate = useNavigate();
  
    const toCreateProject = () => {
        navigate(`/project`);
    };

    const toProject = (project, branch) => {
      // we will compile your latest active projects/branches/posts, your last activity
      // Needs to lead to project/branch or project/branch/post depending on what it is
      navigate(`/${project}/${branch}`);
    };

    const fetchProject = async (project) => {
      const res = await axios.get('http://localhost:3030/projects/' + project);
      return res.data;
    }
    
    useEffect(() => {
      async function getBranches(){
        if(user && user.contributions && user.contributions.branches){
          let branches = [];
          for(let i = 0; i < user.contributions.branches.length; i++){
            await fetchProject(user.contributions.branches[i].project).then(res => {
              const selectedBranch = (res.branches).find(branch => branch.id === user.contributions.branches[i].branch);
              const data = {
                project: res,
                branch: selectedBranch
              }
              branches.push(data);
            })
          }
          setCollabs(branches);
          branches.sort((a,b) => { 
            return a.branch.updated - b.branch.updated
          });
          setCollabs(branches);
        }
      }
      getBranches();
    },[user, collabs]);

    return (
      <>
        <div className="fixed w-1/6 bg-neutral-900 h-full flex flex-col">
        {user ?
          <nav className="py-4 px-8 grid gap-y-4">
            {collabs && collabs[0] ?
              <ul className="max-h-[600px] grid gap-y-1">
                <li className="flex flex-row justify-between items-center font-semibold uppercase">
                  <div>Latest Activity</div>
                </li>
                {collabs.slice(0,5).map(collab => (
                  <li 
                  key={collab.branch.id} 
                  className="cursor-pointer bg-gradient-to-r from-neutral-800 p-2 rounded-md transition duration-200 hover:from-sky-400 hover:scale-x-110" 
                  onClick={() => toProject(collab.project.id, collab.branch.id)}>
                    {collab.project.name}/{collab.branch.name}
                  </li>
                ))}
              </ul>
            :
              <div>No recent activity.</div>
            }
            <hr className="border border-neutral-800"/>
            <ul>
              <li>
                <div
                className="cursor-pointer rounded-md transition duration-200 bg-gradient-to-r hover:from-sky-400 hover:scale-x-110 text-xl flex p-2 items-center"
                onClick={() => toCreateProject()}>
                  <TbBookUpload size={25} />
                  <span className="ml-4">New Project</span>
                </div>
              </li>
              <li>
                <a 
                className="rounded-md transition duration-200 bg-gradient-to-r hover:from-sky-400 hover:scale-x-110 text-xl flex p-2 items-center" 
                href={`/contacts/1`}
                >
                  <BiBookHeart size={25} />
                  <span className="ml-4">Saved</span>
                </a>
              </li>
              <li>
                <a 
                className="rounded-md transition duration-200 bg-gradient-to-r hover:from-sky-400 hover:scale-x-110 text-xl flex p-2 items-center" 
                href={`/contacts/2`}
                >
                  <RiGroupLine size={25} />
                  <span className="ml-4">Friends</span>
                </a>
              </li>
            </ul>
          </nav>
        : null }
        </div>
      </>
    );
  }