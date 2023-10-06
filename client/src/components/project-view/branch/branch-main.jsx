import PostMain from '../post/post-main';

export default function BranchMain(props) {
    const branch = props.branch;
    // find branch in project, get the posts in that branch and display them

    return (
        <>
        <div className="bg-neutral-900 w-full min-h-full">
            <div className="pt-8 pb-6">
            {(branch.posts).map(post => (
                <PostMain post={post} />
            ))}
            </div>
        </div>
        </>
    );
}