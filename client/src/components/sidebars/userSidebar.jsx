import { BiBookHeart, BiCog } from 'react-icons/bi';
import { RiGroupLine } from 'react-icons/ri';

export default function UserSidebar() {
    return (
      <>
        <div className="fixed w-1/6 bg-neutral-900 h-full flex flex-col">
          <nav className="py-4 px-8">
            <ul>
              <li>
                <a 
                className="rounded-md transition duration-200 bg-gradient-to-r hover:from-sky-400 hover:scale-x-110 text-xl flex p-2 items-center" href={`/contacts/1`}
                >
                  <BiBookHeart size={25} />
                  <span className="ml-4">Saved</span>
                </a>
              </li>
              <li>
                <a 
                className="rounded-md transition duration-200 bg-gradient-to-r hover:from-sky-400 hover:scale-x-110 text-xl flex p-2 items-center" href={`/contacts/2`}
                >
                  <RiGroupLine size={25} />
                  <span className="ml-4">Friends</span>
                </a>
              </li>
              <li>
                <a 
                className="rounded-md transition duration-200 bg-gradient-to-r hover:from-sky-400 hover:scale-x-110 text-xl flex p-2 items-center" href={`/contacts/2`}
                >
                  <BiCog size={25} />
                  <span className="ml-4">Settings</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }