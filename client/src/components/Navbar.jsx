import { Link, useNavigate } from "react-router-dom";
import { GoArrowLeft, GoSearch } from "react-icons/go";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { RiVideoAddLine } from "react-icons/ri";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const { data: user } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className="sticky top-0 bg-[#0f0f0f] z-10">
      <div className="h-[50px] relative flex items-center justify-center">
        <div className="w-full px-4 flex items-center justify-between">
          <h1 className="text-primary text-xl font-normal flex-1">
            <Link to="/" className="w-max">
              Clipstream
            </Link>
          </h1>
          <div className="flex-2 max-w-[550px] border border-white/20 h-10 sm:flex hidden items-center rounded-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent outline-none px-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="px-4 bg-white/10 h-full rounded-r-2xl"
              onClick={() => navigate(`/search?q=${search}`)}
            >
              <GoSearch size={22} />
            </button>
          </div>
          <div className="flex-1 flex gap-3 items-center justify-end">
            <button
              className="text-gray-300 sm:hidden"
              onClick={() => setOpen(true)}
            >
              <GoSearch size={20} />
            </button>
            {user && (
              <button onClick={() => navigate("/newvideo")}>
                <RiVideoAddLine size={23} />
              </button>
            )}
            {user ? (
              <button className="hidden sm:block">
                <img
                  src={`https://avatar.iran.liara.run/username?username=${
                    user.fullName.split(" ")[0]
                  }+${user.fullName.split(" ")[1]}`}
                  alt=""
                  width={33}
                />
              </button>
            ) : (
              <button
                className="sm:flex hidden items-center gap-2 border border-[#1d61e1] text-primary py-1.5 px-2 w-max rounded-2xl"
                onClick={() => navigate("/auth")}
              >
                <IoPersonCircleOutline size={22} />
                <span className="text-sm uppercase">sign in</span>
              </button>
            )}
            {user ? (
              <button className="sm:hidden block">
                <img
                  src={`https://avatar.iran.liara.run/username?username=${
                    user.fullName.split(" ")[0]
                  }+${user.fullName.split(" ")[1]}`}
                  alt=""
                  width={36}
                />
              </button>
            ) : (
              <button
                className="text-primary w-max sm:hidden"
                onClick={() => navigate("/auth")}
              >
                <span className="uppercase">sign in</span>
              </button>
            )}
          </div>
        </div>
        {open && (
          <div className="absolute top-0 left-0 h-full w-full bg-black px-2 flex items-center justify-center gap-2 sm:hidden">
            <button onClick={() => setOpen(false)}>
              <GoArrowLeft size={17} />
            </button>
            <div className="w-full border border-white/20 h-10 flex items-center rounded-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent outline-none px-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="px-3 bg-white/10 h-full rounded-r-2xl">
                <GoSearch size={22} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
