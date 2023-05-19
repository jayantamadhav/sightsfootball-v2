import React from "react";
import routes from "../lib/routes";
import { TbGridDots } from "react-icons/tb";
import { RiMenu4Line, RiArticleLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { CgUserList } from "react-icons/cg";
import { useRouter } from "next/router";

interface IProps {
  open: boolean;
  setOpen: () => void;
}

const Sidebar = (props: IProps) => {
  const router = useRouter();
  return (
    <aside
      id="logo-sidebar"
      className={`sidebar ${
        props.open ? "open" : ""
      } top-0 left-0 z-40 h-screen`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        {props.open && (
          <div className="flex">
            <div
              onClick={() => router.push(routes.ADMIN_HOME)}
              className="flex items-center pl-2.5 mb-5 flex-grow"
            >
              <span className="self-center text-lg whitespace-nowrap text-lightGrey">
                Console
              </span>
            </div>
            <div
              className="flex items-center mb-5 text-brand cursor-pointer"
              onClick={props.setOpen}
            >
              <RiMenu4Line color="orangey" size="25" />
            </div>
          </div>
        )}

        {!props.open && (
          <div
            className="flex justify-center items-center mb-5 cursor-pointer text-brand"
            onClick={props.setOpen}
          >
            <TbGridDots color="orangey" size="27" />
          </div>
        )}

        <ul className="space-y-2 font-medium">
          <li>
            <div
              onClick={(e) => router.push(routes.ADMIN_HOME)}
              className={`flex ${
                !props.open ? "justify-center " : " "
              } items-center p-2 rounded-lg text-white hover:bg-grey cursor-pointer`}
            >
              <RxDashboard size="23" color={"#aaa"} />
              {props.open && <span className="ml-3">Dashboard</span>}
            </div>
          </li>

          <li>
            <div
              onClick={() => router.push(routes.ADMIN_POSTS_LIST)}
              className={`flex ${
                !props.open ? "justify-center " : " "
              } items-center p-2 rounded-lg text-white hover:bg-grey cursor-pointer`}
            >
              <RiArticleLine size="23" color={"#aaa"} />
              {props.open && <span className="ml-3">Posts</span>}
            </div>
          </li>

          <li>
            <div
              onClick={() => router.push(routes.ADMIN_HOME)}
              className={`flex ${
                !props.open ? "justify-center " : " "
              } items-center p-2 rounded-lg text-white hover:bg-grey cursor-pointer`}
            >
              <CgUserList size="23" color={"#aaa"} />
              {props.open && <span className="ml-3">Users</span>}
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
