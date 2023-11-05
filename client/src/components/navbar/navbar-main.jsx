import NavbarUserMenu from './navbar-user-menu';

import { BiHomeAlt2, BiPyramid } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';

export default function NavbarMain(props) {
    const handleCallback = (userExists) => {
      if(userExists === false){
        props.parentCallback(false);
      }
    }

    return (
      <>
        <div className="z-50 sticky top-0 bg-neutral-900/90 h-14 border-b border-neutral-700/80">
          <nav className="flex flex-row justify-between h-full">
            <a className="z-10 relative left-0 transition duration-500 bg-gradient-to-r hover:from-sky-800 hover:scale-x-110 baumans pl-10 flex flex-row items-center" href={`/`}>
                <BiPyramid size={20} className='text-sky-400' />
                <div className='ml-2 flex flex-col'>
                  <span className='text-xl uppercase text-sky-400'>Poster</span>
                  <span>Connect Your Ideas</span>
                </div>
            </a>
            <ul className="z-0 absolute w-full justify-center mx-auto px-8 flex flex-row h-full">
              <li className='mx-4'>
                <a 
                className="transition duration-200 hover:bg-sky-800 hover:scale-x-110 flex items-center justify-between p-2 h-full" 
                href={`/`}
                > 
                    <BiHomeAlt2 size={40}/> 
                </a>
              </li>
              <li className='mx-4'>
                <a 
                className="transition duration-200 hover:bg-sky-800 hover:scale-x-110 flex items-center justify-between p-2 h-full" 
                href={`/following`}
                >
                    <AiOutlineHeart size={40}/> 
                </a>
              </li> 
            </ul>
            <div className='flex z-20'>
              <NavbarUserMenu  parentCallback={handleCallback} />
              <div className="right-0 relative px-5 flex items-center gap-4 transition duration-500 bg-gradient-to-l hover:from-sky-800">
                <form className="flex h-14 relative w-full items-center" id="search-form" role="search">
                <input
                    className="w-full rounded-full bg-neutral-800"
                    id="q"
                    aria-label="Search contacts"
                    placeholder="Search"
                    type="search"
                    name="q"
                />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
}