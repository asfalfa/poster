import { useNavigate } from "react-router-dom";

export default function HomeProjectImageGrid(props) {
    const project = props.project;
    const branch = props.branch;

    const navigate = useNavigate();
    const showFullImage = (image) => {
        const data = {
            post: branch.posts[0], 
            image: image,
        }
        navigate(`./${project.id}/${branch.id}/${branch.posts[0].id}`, { state: data });
    };

    return (
        <>
        {branch.posts[0] ?
            <div className="w-1/2 flex relative justify-center flex-col">
                <div 
                key={branch.posts[0].media[0].id} 
                className="m-auto w-fit block rounded-md h-[250px] p-[1px] transition duration-200 bg-gradient-to-tr from-cyan-600 to-neutral-700 hover:to-cyan-400">
                    <img 
                    onClick={() => showFullImage(branch.posts[0].media[0])}  
                    alt={branch.posts[0].media[0]} 
                    src={branch.posts[0].media[0]} 
                    className="h-full cursor-pointer transition duration-200 max-w-sm m-auto aspect-video rounded-md hover:contrast-[1.1]"></img>
                </div>
                <div className="rounded-md m-auto max-w-sm flex flex-row mt-1">
                    {(branch.posts[0].media).slice(1,10).map(media => (
                        <div key={media.id} className="h-10 mx-1 p-[1px] rounded-md transition duration-200 bg-gradient-to-tr from-cyan-800 to-neutral-700 hover:to-cyan-400">
                            <img 
                            onClick={() => showFullImage(media)}  
                            alt={media} 
                            src={media} 
                            className="h-full rounded-md cursor-pointer transition duration-200 m-auto aspect-video hover:contrast-[1.1]">
                            </img>
                        </div>
                    ))}
                </div>
            </div>
        : null }
        </>
    );
}