import { Outlet } from "react-router-dom";
import UserSidebar from "../components/sidebars/userSidebar";
import ContentSidebar from "../components/sidebars/contentSidebar";
import Navbar from "../components/navbar";

import { ThemeProvider, createTheme } from '@mui/material/styles';

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
    return (
      <ThemeProvider theme={theme}>
        <div className="flex flex-col w-screen h-fit">
          <Navbar />
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
      </ThemeProvider>
    );
  }