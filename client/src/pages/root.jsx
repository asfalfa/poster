import axios from "axios";

import { Outlet } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';

import UserContext from "../components/login-view/userContext";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import UserSidebar from "../components/sidebars/userSidebar";
import ContentSidebar from "../components/sidebars/contentSidebar";
import NavbarMain from "../components/navbar/navbar-main";

const theme = createTheme({
  palette: {
      // action: {
      //   selected: '#E7A615',
      //   hover: '#525252',
      //   disabled: '#9B9B9B'
      // },
      primary: {
          main: '#262626',
      },
      secondary: {
          main: '#262626',
      },
      background: {
        default: '#52525200',
        paper: '#52525200',
      },
      text: {
        primary: '#ffffff',
      },
  },
});

export default function Root() {
  const [user, setUser] = useState();
  const cookieManager = new Cookies();

  const handleCallback = () => {
    setUser(null);
  }
  
  useEffect(() => {
    const checkUser = async() => {
        const token = cookieManager.get('poster__googleOAuth_token');
        const googleId = localStorage.getItem('poster__googleOAuth_id');
        if(token && googleId){
          const data = {
              token: token,
              googleId: googleId
          };
          await axios.post('http://localhost:3030/users/check', data).then(res => {
              if(res.data.valid === true){
                  setUser(res.data.user);
              }
          })
        }
    }

    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        <div className="flex flex-col w-screen h-fit">
          <NavbarMain parentCallback={handleCallback} />
          <div className="flex flex-row">
            <div className="w-1/6">
              <UserSidebar />
            </div>
            <div className="w-4/6">
              <Outlet />
            </div>
            <div className="w-1/6">
              <ContentSidebar />
            </div>
          </div>
        </div>
      </UserContext.Provider>
    </ThemeProvider>
  );
}