import axios from "axios";

import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserContext from "../../login-view/userContext";

export default function PostCreate() {
    const navigate = useNavigate(); 
    const params = useParams();
    const project = params.project;
    const branch = params.branch;
    
    const user = useContext(UserContext);
    const [media, setMedia] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const formData = new FormData();
        
        // WE SHOULD CHECK IF BRANCH ALLOWS SHARING/BRANCHING
        let permissions = {};
        if(form.branch.checked === true){
            permissions.branch = true;
        }else{
            permissions.branch = false;
        }
        if(form.share.checked === true){
            permissions.share = true;
        }else{
            permissions.share = false;
        }

        let formUser = {
            id: user.id,
            username: user.username
        }
        if(user.nickname){
            formUser.nickname = user.nickname;
        } else {
            formUser.nickname = user.username;
        }

        for (const i of Object.keys(media)) {
            console.log(media[i]);
            formData.append('media', media[i]);
        };
        formData.append('user', JSON.stringify(formUser));
        formData.append('content', form.content.value);
        formData.append('permissions', JSON.stringify(permissions));

        await axios.post(`http://localhost:3030/projects/create/${project}/${branch}` , formData).then(res => {
            if(res.data.valid === true){
                console.log(res.data);
            }
        });
    }

    const redirectToLogin = () => {
        navigate(`/login`);
    }

    const uploadMedia = (event) => {
        setMedia(event.target.files);
    }

    return (
    <>
        <div className="rounded-md bg-neutral-900 w-full min-h-full border border-neutral-600 p-4">
            {user ?
                <form method="post" onSubmit={handleSubmit} className="flex-col grid gap-y-4 px-4">
                    <div className="flex flex-col">
                        <textarea name="content" className="transition duration-200 bg-neutral-800 hover:bg-neutral-700 rounded-md text-neutral-200">
                        </textarea> 
                    </div>
                    <div>
                        <input type="file" onChange={uploadMedia} multiple />
                    </div>
                    <div className="flex flex-col">
                        <div className="m-auto mb-2 uppercase font-bold">
                            Permissions
                        </div>
                        <div className="flex justify-evenly items-center m-auto">
                            <div className="flex flex-col justify-center items-center w-[80px]">
                                <label className="uppercase text-sm font-semibold">
                                    Branch
                                </label>
                                <input 
                                    type="checkbox" 
                                    name="branch"
                                    className="transition duration-200 m-auto mt-2 p-6 rounded-md cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-sky-600"
                                />
                            </div>
                            <div className="flex flex-col justify-center items-center w-[80px]">
                                <label className="uppercase text-sm font-semibold">
                                    Share
                                </label>
                                <input 
                                    type="checkbox" 
                                    name="share"
                                    className="transition duration-200 m-auto mt-2 p-6 rounded-md cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-sky-600"
                                    defaultChecked={true} 
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="border border-neutral-800"/>
                    <button 
                    type="submit" 
                    className="uppercase font-bold py-4 bg-neutral-800 hover:bg-neutral-700 transition duration-200 rounded-md w-2/3 m-auto">
                        Submit
                    </button>
                </form>
            :
                <div className="flex flex-col justify-center p-5"> 
                    <div className="m-auto">You need to be logged in to do this.</div>
                    <div 
                    className='p-4 px-8 m-auto uppercase flex justify-center border border-neutral-700 hover:border-neutral-600 rounded-md mt-5 hover:bg-neutral-700 cursor-pointer transition duration-200 font-semibold' 
                    onClick={redirectToLogin}>
                        <span>Proceed to Log In</span>
                    </div>
                </div>
            }
        </div>
    </>
    );
}