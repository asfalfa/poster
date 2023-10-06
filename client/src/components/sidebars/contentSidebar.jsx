import { HiArrowTrendingUp } from 'react-icons/hi2';
import { BiStar } from 'react-icons/bi';
import { PiCompassLight } from 'react-icons/pi';

export default function ContentSidebar() {
    return (
      <>
        <div className="fixed w-1/6 bg-neutral-900 min-h-full flex flex-col">
          <nav className="py-4 px-8 border-b border-neutral-800">
            <ul>
              <li>
                <a 
                className="rounded-md transition duration-200 bg-gradient-to-l hover:from-sky-400 hover:scale-x-110 text-xl flex items-center justify-end p-2" href={`/contacts/2`}
                >
                  <span className='mr-4'>Popular</span>
                  <BiStar size={25} />
                </a>
              </li>
              <li>
                <a 
                className="rounded-md transition duration-200 bg-gradient-to-l hover:from-sky-400 hover:scale-x-110 text-xl flex items-center justify-end p-2" href={`/contacts/2`}
                >
                  <span className='mr-4'>Rising</span>
                  <HiArrowTrendingUp size={25} />
                </a>
              </li>
              <li>
                <a 
                className="rounded-md transition duration-200 bg-gradient-to-l hover:from-sky-400 hover:scale-x-110 text-xl flex items-center justify-end p-2" href={`/contacts/2`}
                >
                  <span className='mr-4'>Discover</span>
                  <PiCompassLight size={25} />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }