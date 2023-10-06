import { useState } from "react";


export default function HomeProjectImageGrid(props) {
    const project = props.project;

    const [lightboxDisplay, setLightBoxDisplay] = useState(false);
    const [imageToShow, setImageToShow] = useState('');

    const showImage = (image) => {
        setImageToShow(image);
        setLightBoxDisplay(true);
    };

    const hideLightBox = () => {
        setLightBoxDisplay(false);
    }

    return (
        <>
            <div className="w-1/2 flex relative justify-center flex-col">
                <a key={project.media[0].url} className="m-auto w-fit block">
                    <img onClick={() => showImage(project.media[0].url)}  alt={project.media[0].url} src={project.media[0].url} className="cursor-pointer transition duration-200 max-w-sm m-auto aspect-video rounded-md border border-neutral-700/80 hover:border-cyan-400 hover:contrast-[1.1]"></img>
                </a>
                <div className="m-auto max-w-sm flex flex-row mt-1">
                    {(project.media).slice(1,10).map(media => (
                        <div key={media.url}>
                            <img onClick={() => showImage(media.url)}  alt={media.url} src={media.url} className="cursor-pointer transition duration-200 m-auto aspect-video border border-neutral-700/80 hover:border-cyan-400 hover:contrast-[1.1]"></img>
                        </div>
                    ))}
                </div>
            </div>
            {/* { lightboxDisplay ?
                <div 
                className="z-[99] fixed top-0 left-0 w-full h-full flex items-center justify-around"
                onClick={hideLightBox}>
                    <img 
                    src={imageToShow}></img>
                </div>
            : '' } */}
        </>
    );
}