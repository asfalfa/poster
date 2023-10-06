import PostActions from './post-actions';
import PostStatus from './post-status';
import PostImageGrid from './post-imageGrid';

export default function PostMain(props) {

    const post = props.post;

    return (
        <>
            <div className="transition duration-200 border-t border-b border-neutral-800 bg-neutral-900 hover:border-cyan-400 hover:scale-110 px-8 py-4 mb-4">
                <div key={post.id}>
                    <div className="justify-around flex flex-row">
                        <div className="w-1/2 relative">
                            <div className="text-lg">
                                <span className="font-semibold">{post.user.nickname}</span>
                                <span className="text-gray-400 ml-2">@{post.user.username}</span>
                            </div>
                            <div className="text-justify my-2 pr-4 text-xl h-[200px] overflow-y-auto">
                                {post.content}
                            </div>
                        </div>
                        <PostImageGrid post={post} />
                    </div>
                    <div className='flex flex-row justify-between w-1/2'> 
                        <PostActions post={post} />
                        <PostStatus post={post} />
                    </div>
                </div>
            </div>
        </>
    );
}