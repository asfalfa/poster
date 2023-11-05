import { useEffect, useState } from 'react';
import PostMain from '../post/post-main';
import BranchActions from './branch-actions';

export default function BranchMain(props) {
    const project = props.project;
    const [branch, setBranch] = useState(props.branch);

    useEffect(() => {
        setBranch(props.branch);
    }, [props.branch]);

    return (
        <>
        <div className="bg-neutral-900 w-full min-h-full">
            {branch ?
                <div className='grid'>
                    <div className='grid gap-y-4'>
                    {(branch.posts).map(post => (
                        <PostMain key={post.id} project={project} branch={branch} post={post} />
                    ))}
                    </div>
                    <div className='flex flex-col fixed bottom-5 w-fit m-auto justify-self-center'>
                        <BranchActions project={project} branch={branch} />
                    </div>
                </div>
            : null}
        </div>
        </>
    );
}