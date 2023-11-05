import Dialog from '@mui/material/Dialog';
import { useNavigate } from "react-router-dom";

export default function HomeProjectLoginDialog(props) {
    const navigate = useNavigate(); 
    const open = props.open;
    const onClose = props.onClose;

    const handleClose = () => {
        onClose(true)
    };

    const redirectToLogin = () => {
        navigate(`/login`);
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <div className='bg-neutral-800 p-4 max-h-[300px] overflow-y-auto'>
                <div>You need to be logged in to do this.</div>
                <div 
                className='p-4 uppercase flex justify-center border border-neutral-700 hover:border-neutral-600 rounded-md mt-5 hover:bg-neutral-700 cursor-pointer transition duration-200 font-semibold' 
                onClick={redirectToLogin}>
                    <span>Proceed to Log In</span>
                </div>
                <div
                className='flex justify-center mt-4 uppercase hover:bg-neutral-700 cursor-pointer transition duration-200 rounded-md py-1 text-sm'
                onClick={handleClose}>
                    <span>Back</span>
                </div>
            </div>
        </Dialog>
    )
}