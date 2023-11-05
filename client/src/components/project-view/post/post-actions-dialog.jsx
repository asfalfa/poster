import Dialog from '@mui/material/Dialog';

export default function PostActionsDialog(props) {
    const open = props.open;
    const onClose = props.onClose;
    const data = props.interaction;

    const handleClose = () => {
        onClose(true)
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <div className='bg-neutral-800 py-5 max-h-[300px] overflow-y-auto'>
            {!data[0] ?
                <div className='my-2 mx-8'>There is nothing here...</div>
            :
            data.map(user =>
                <div className='my-2 py-4 px-8 cursor-pointer hover:bg-neutral-600'>
                    { user.nickname ? `${user.nickname}@${user.username}` : `@${user.username}` }
                </div>
            )
            }
            </div>
        </Dialog>
    )
}