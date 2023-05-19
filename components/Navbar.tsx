import React from "react";
import { useRouter } from "next/router";
import { MdOutlineHorizontalSplit } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { BsFillPersonFill } from "react-icons/bs";
import routes from "../lib/routes";

interface IProps {
  open: boolean;
  setOpen: () => void;
}

const Header: React.FC<IProps> = (props: IProps) => {
  const router = useRouter();
  const session = useSession();

  return (
    <div className="navbar-container">
      <nav className="navbar px-5 py-3 ">
        <div className="block lg:hidden" onClick={props.setOpen}>
          <MdOutlineHorizontalSplit size="35" />
        </div>
        <div
          className="mx-5 lg:mx-0 flex-grow font-bold text-2xl text-brand cursor-pointer"
          onClick={() => router.push(routes.ADMIN_HOME)}
        >
          SightsFootball
        </div>
        <div className="">
          <span
            className="text-sm text-lightGrey cursor-pointer hover:text-brand mx-5 hidden lg:inline"
            onClick={() => router.push(routes.HOME)}
          >
            Visit Website
          </span>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-light bg-gray-800 hover:bg-grey font-medium text-sm rounded-full lg:rounded-md p-2 lg:px-4 py-1.5 text-center inline-flex items-center"
            type="button"
          >
            <span className="block lg:hidden">
              <BsFillPersonFill size="20" />
            </span>
            <span className="hidden lg:block">{session.data?.user.email} </span>
          </button>
          <div
            id="dropdown"
            className="z-10 hidden divide-y divide-gray-100 rounded-lg shadow w-44 bg-grey"
          >
            <ul
              className="py-2 text-sm text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-midnight hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="block px-4 py-2 hover:bg-midnight hover:text-white"
                  onClick={() =>
                    signOut({ redirect: true, callbackUrl: routes.ADMIN_LOGIN })
                  }
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
