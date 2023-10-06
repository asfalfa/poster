import { BiHomeAlt2, BiPencil, BiPyramid } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';

export default function Navbar() {
    return (
      <>
        <div className="z-50 sticky top-0 bg-neutral-900/90 h-14 border-b border-neutral-700/80">
          <nav className="flex flex-row h-full">
            <a className="transition duration-500 bg-gradient-to-r hover:from-sky-800 hover:scale-x-110 baumans pl-10 flex flex-row items-center" href={`/`}>
                <BiPyramid size={20} className='text-sky-400' />
                <div className='ml-2 flex flex-col'>
                  <span className='text-xl uppercase text-sky-400'>Poster</span>
                  <span>Connect Your Ideas</span>
                </div>
            </a>
            <ul className="w-[300px] justify-around mx-auto px-8 flex flex-row h-full">
              <li>
                <a 
                className="transition duration-200 bg-gradient-to-tl hover:from-sky-800 hover:scale-x-110 flex items-center justify-between p-2 h-full" href={`/contacts/1`}
                > 
                    <BiHomeAlt2 size={40}/> 
                </a>
              </li>
              <li>
                <a 
                className="transition duration-200 bg-gradient-to-t hover:from-sky-800 hover:scale-x-110 flex items-center justify-between p-2 h-full" href={`/contacts/2`}
                >
                    <AiOutlineHeart size={40}/> 
                </a>
              </li>   
              <li>
                <a 
                className="transition duration-200 bg-gradient-to-tr hover:from-sky-800 hover:scale-x-110 flex items-center justify-between p-2 h-full" href={`/contacts/1`}
                > 
                    <BiPencil size={40}/> 
                </a>
              </li>  
            </ul>
            <div className="h-14 relative px-5 flex items-center gap-4 transition duration-500 bg-gradient-to-l hover:from-sky-800">
                <form className="relative w-full" id="search-form" role="search">
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
          </nav>
        </div>
      </>
    );
}