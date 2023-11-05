import { useLocation, useNavigate  } from "react-router-dom";
import { useEffect, useState } from 'react';
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";

export default function MediaMain() {
    const [image, setImage] = useState();

    const [back, setBackVisibility] = useState(true);
    const [fwd, setFwdVisibility] = useState(true);

    const state = useLocation().state;
    const navigate = useNavigate();

    const post = state.post;

    useEffect(() => {
        setImage(state.image);
        const checkIndex = (image) => {
            let currentImageIndex = (post.media).map(x => x.id).indexOf(image.id);
            if(currentImageIndex === 0){
                setBackVisibility(false);
            }else {
                setBackVisibility(true);
            }
            if(currentImageIndex === (post.media.length - 1)){
                setFwdVisibility(false);
            }else {
                setFwdVisibility(true);
            }
        }
        checkIndex(state.image);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toImage = (direction) => {
        let currentImageIndex = (post.media).map(x => x.id).indexOf(image.id);
        let newIndex = currentImageIndex + direction;

        if(newIndex >= 0 && newIndex <= (post.media.length - 1)){
            const newImage = post.media[newIndex];
            setImage(newImage);
            currentImageIndex = newIndex;
        }
        if(currentImageIndex === 0){
            setBackVisibility(false);
        }else {
            setBackVisibility(true);
        }
        if(currentImageIndex === (post.media.length - 1)){
            setFwdVisibility(false);
        }else {
            setFwdVisibility(true);
        }
    }

    const changeMedia = (newMedia) => {
        setImage(newMedia);
        let currentImageIndex = (post.media).map(x => x.id).indexOf(newMedia.id);
        if(currentImageIndex === 0){
            setBackVisibility(false);
        }else {
            setBackVisibility(true);
        }
        if(currentImageIndex === (post.media.length - 1)){
            setFwdVisibility(false);
        }else {
            setFwdVisibility(true);
        }
    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="z-[99] relative m-auto w-fit mt-5 rounded-md border bg-neutral-900 border-neutral-700/80 h-[800px]">
                <div className="z-[99] flex relative justify-center flex-col">
                    <div key={post.id} className="flex flex-col justify-around py-4 m-auto">
                        <div className="text-lg">
                            <span className="font-semibold">{post.user.nickname}</span>
                            <span className="text-gray-400 ml-2">@{post.user.username}</span>
                        </div>
                        <div className="text-justify my-2 pr-4 text-xl h-fit overflow-y-auto">
                            {post.content}
                        </div>
                    </div>
                </div>
                {image ?
                <div>
                    <div className="z-[90] relative mb-4 px-4 w-fit m-auto flex flex-row">
                        {(post.media).map(media => (
                            <div key={media.id}>
                                {media === image ?
                                    <div className="rounded-md transition duration-200 bg-gradient-to-tr from-cyan-800 to-neutral-700 p-[1px] m-auto aspect-video h-14 overflow-hidden flex items-center contrast-[1.1] mx-1">
                                        <img
                                        className="rounded-md h-full w-full"
                                        onClick={() => changeMedia(media)}  
                                        alt={media.id} src={media} 
                                        />
                                    </div>
                                :
                                    <div className="rounded-md cursor-pointer transition duration-200 m-auto aspect-video hover:contrast-[1.1] h-14 overflow-hidden flex items-center mx-1 p-[1px] bg-gradient-to-tr from-cyan-600 to-neutral-700 hover:to-cyan-400">
                                        <img
                                        className="rounded-md h-full w-full"
                                        onClick={() => changeMedia(media)}  
                                        alt={media.id} src={media}
                                        />
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                    <div 
                    className="flex items-center justify-around z-[99] h-[600px] overflow-hidden w-full">
                        {back ?
                            <div className="transition duration-200 z-[85] absolute h-[600px] left-0 w-1/3 cursor-pointer bg-gradient-to-l hover:from-transparent hover:to-neutral-800/30 flex items-center justify-start" onClick={() => toImage(-1)}>
                                <BsArrowBarLeft className="relative left-5" size={40} />
                            </div>
                        : null}
                        <img 
                        className="z-[80] border-t border-neutral-700/80"
                        alt={image}
                        src={image}></img>
                        {fwd ?
                            <div className="transition duration-200 z-[85] absolute h-[600px] right-0 w-1/3 cursor-pointer bg-gradient-to-r hover:from-transparent hover:to-neutral-800/30 flex items-center justify-end" onClick={() => toImage(1)}>
                                <BsArrowBarRight className="relative right-5" size={40} />
                            </div>
                        : null}
                    </div>
                </div>
                : null}
            </div>
            <div
            onClick={goBack}
            className="h-screen w-screen bg-black/60 absolute top-0 right-0 z-[40]"></div>
        </>
    );
}