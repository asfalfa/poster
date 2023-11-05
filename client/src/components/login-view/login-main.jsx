import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies, Cookies } from 'react-cookie';

export default function LoginMain() {
    const [cookies, setCookie] = useCookies(['poster__googleOAuth_token']);

    const cookieManager = new Cookies();

    const navigate = useNavigate();
    const location = useLocation();

    const userLogin = async () => {
        axios.get('http://localhost:3030/users/auth');
    }
    const userLogout = async () => {
        const token = cookies.poster__googleOAuth_token;
        const googleId = localStorage.getItem('poster__googleOAuth_id');
        const data = {
            token: token,
            googleId: googleId
        };

        await axios.post('http://localhost:3030/users/logout', data).then(res => {
            if(res.data.valid === true){
                cookieManager.remove('poster__googleOAuth_token');
                localStorage.removeItem('poster__googleOAuth_id');
            }
        });
    }

    useEffect(() => {
        const checkToken = () => {
            let token = new URLSearchParams(location.search).get('code');
            let googleId = new URLSearchParams(location.search).get('googleId');

            if(token){
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                setCookie('poster__googleOAuth_token', token, { path: '/', expires: tomorrow });
            } else{
                // now whenever the user accesses the page we check if the cookie is there, maybe in Root or so?
                // if the cookie is there, we send it to the api and check if it corresponds to the db encrypted token
                token = cookies.poster__googleOAuth_token;
            }
            if(googleId){
                localStorage.setItem('poster__googleOAuth_id', googleId);
            } else {
                googleId = localStorage.getItem('poster__googleOAuth_id');
            }
            
            navigate('/');
        }

        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
    <>
        <div className="bg-neutral-900 w-full min-h-full">
           
        </div>
    </>
    );
}