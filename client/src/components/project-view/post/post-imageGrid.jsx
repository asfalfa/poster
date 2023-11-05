import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

export default function PostImageGrid(props) {
    const post = props.post;

    const navigate = useNavigate();
    const showFullImage = (image) => {
        const data = {
            post: post, 
            image: image,
        }
        navigate(`./${post.id}`, { state: data });
    };

    return (
        <>
            <div className="w-1/2 flex relative justify-center flex-col">
                <div className="m-auto w-fit block rounded-md h-[250px] p-[1px] transition duration-200 bg-gradient-to-tr from-cyan-600 to-neutral-700 hover:to-cyan-400">
                    <img 
                    onClick={() => showFullImage(post.media[0])}  
                    alt={post.media[0]} src={post.media[0]} 
                    className="h-full cursor-pointer transition duration-200 max-w-sm m-auto aspect-video rounded-md hover:contrast-[1.1]"></img>
                </div>
                <div className="rounded-md m-auto max-w-sm flex flex-row mt-1">
                    {(post.media).slice(1,6).map(media => (
                        <div key={media.id} className="h-10 mx-1 p-[1px] rounded-md transition duration-200 bg-gradient-to-tr from-cyan-800 to-neutral-700 hover:to-cyan-400">
                            <img 
                            onClick={() => showFullImage(media)}  
                            alt={media} 
                            src={media} 
                            className="h-full rounded-md cursor-pointer transition duration-200 m-auto aspect-video hover:contrast-[1.1]"></img>
                        </div>
                    ))}
                    {(post.media).length > 5 ? 
                        <div className="relative h-0 w-0 top-[5px] right-[60px] pointer-events-none text-neutral-300">
                            <AiOutlinePlus size={40} />
                        </div>
                    : null}

                </div>
            </div>
        </>
    );
}