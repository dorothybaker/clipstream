import {
  MdOutlineExplore,
  MdOutlineGames,
  MdOutlineHelp,
  MdOutlineHistory,
  MdOutlineLibraryMusic,
  MdOutlineNewspaper,
  MdOutlinePodcasts,
  MdOutlineReport,
  MdOutlineSettings,
  MdOutlineSports,
  MdOutlineSubscriptions,
  MdOutlineTrendingUp,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { IoHomeOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function Menu() {
  const navItems = [
    { name: "Home", icon: IoHomeOutline, route: "/" },
    { name: "Explore", icon: MdOutlineExplore, route: "/explore" },
    {
      name: "Subscriptions",
      icon: MdOutlineSubscriptions,
      route: "/subscriptions",
    },
    { name: "Library", icon: MdOutlineVideoLibrary },
    { name: "History", icon: MdOutlineHistory },
    { name: "Latest", icon: MdOutlineNewspaper },
    { name: "Music", icon: MdOutlineLibraryMusic },
    { name: "Sports", icon: MdOutlineSports },
    { name: "Gaming", icon: MdOutlineGames },
    { name: "Trending", icon: MdOutlineTrendingUp },
    { name: "Podcasts", icon: MdOutlinePodcasts },
    { name: "Settings", icon: MdOutlineSettings },
    { name: "Report", icon: MdOutlineReport },
    { name: "Help", icon: MdOutlineHelp },
  ];

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data: user } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className="sm:h-full w-full sm:overflow-y-auto overflow-x-auto px-4 flex sm:flex-col flex-row gap-2 sm:divide-y divide-white/10 sm:py-4 pt-1 sm:border-none border-t border-white/10">
      <ul className="flex sm:flex-col gap-1">
        {navItems.slice(0, 3).map((item) => (
          <li
            key={item.name}
            className={`flex items-center lg:px-5 px-3 justify-center lg:justify-normal py-2.5 sm:gap-6 gap-2 cursor-pointer hover:bg-white/10 rounded-md  ${
              pathname === item.route && "bg-white/10"
            }`}
            onClick={() => {
              item.route && navigate(`${item.route}`);
            }}
          >
            <button className="hidden sm:block">
              <item.icon size={21} />
            </button>
            <button className="sm:hidden block">
              <item.icon size={17} />
            </button>
            <span className="sm:text-base text-sm  lg:block sm:hidden block">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
      <ul className="flex sm:flex-col gap-1 sm:pt-2">
        {navItems.slice(3, 5).map((item) => (
          <li
            key={item.name}
            className="flex items-center lg:px-5 px-3 justify-center lg:justify-normal py-2.5 sm:gap-6 gap-2 cursor-pointer hover:bg-white/10 rounded-md "
          >
            <button className="hidden sm:block">
              <item.icon size={21} />
            </button>
            <button className="sm:hidden block">
              <item.icon size={17} />
            </button>
            <span className="sm:text-base text-sm  lg:block sm:hidden block">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
      {!user && (
        <div className="lg:flex hidden flex-col gap-1 sm:pt-2">
          <span className="text-base text-gray-400">
            Sign in to like videos, comment and subscribe.
          </span>
          <button
            className="flex items-center gap-2 border border-[#1d61e1] text-primary py-1.5 px-4 w-max rounded-2xl"
            onClick={() => navigate("/auth")}
          >
            <IoPersonCircleOutline size={22} />
            <span className="text-sm uppercase">sign in</span>
          </button>
        </div>
      )}
      <ul className="flex sm:flex-col gap-1 sm:pt-2">
        <span className="text-[13px] text-gray-500 uppercase px-5 lg:block hidden">
          best of Clipstream
        </span>
        {navItems.slice(5, 11).map((item) => (
          <li
            key={item.name}
            className="flex items-center lg:px-5 px-3 justify-center lg:justify-normal py-2.5 sm:gap-6 gap-2 cursor-pointer hover:bg-white/10 rounded-md "
          >
            <button className="hidden sm:block">
              <item.icon size={21} />
            </button>
            <button className="sm:hidden block">
              <item.icon size={17} />
            </button>
            <span className="sm:text-base text-sm  lg:block sm:hidden block">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
      <ul className="flex sm:flex-col gap-1 sm:pt-2">
        {navItems.slice(11).map((item) => (
          <li
            key={item.name}
            className="flex items-center lg:px-5 px-3 justify-center lg:justify-normal py-2.5 sm:gap-6 gap-2 cursor-pointer hover:bg-white/10 rounded-md "
          >
            <button className="hidden sm:block">
              <item.icon size={21} />
            </button>
            <button className="sm:hidden block">
              <item.icon size={17} />
            </button>
            <span className="sm:text-base text-sm  lg:block sm:hidden block">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
