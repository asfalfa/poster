import PostActions from './post-actions';
import PostImageGrid from './post-imageGrid';

export default function PostMain(props) {
    const project = props.project;
    const branch = props.branch;
    const post = props.post;

    return (
        <>
            <div className="min-h-[350px] transition duration-200 border-t border-b border-neutral-800 bg-neutral-900 hover:border-cyan-400 hover:scale-110 px-8 py-4">
                <div key={post.id}>
                    <div className="flex flex-row">
                        <div className="w-1/2 relative">
                            <div className="text-lg">
                                <span className="font-semibold">{post.user.nickname}</span>
                                <span className="text-gray-400 ml-2 cursor-pointer">@{post.user.username}</span>
                            </div>
                            <div className="text-justify my-2 pr-4 text-xl h-[200px] overflow-y-auto">
                                {post.content}
                            </div>
                        </div>
                        <PostImageGrid post={post} />
                    </div>
                    <div className='flex flex-row justify-between w-1/2 relative'> 
                        <PostActions post={post} project={project} branch={branch} />
                    </div>
                </div>
            </div>
        </>
    );
}