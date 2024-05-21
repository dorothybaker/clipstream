import { useState } from "react";
import Menu from "../components/Menu";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

function Auth() {
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);

  return (
    <div className="flex items-start sm:gap-3 sm:flex-row flex-col">
      <div className="lg:w-[270px] sm:w-[100px] w-full h-[50px] sm:h-[calc(100vh-50px)] sm:sticky top-[50px]">
        <Menu />
      </div>
      <div className="flex-1 w-full sm:border-none border-t border-white/10">
        <div className="flex items-center justify-center sm:h-[calc(100vh-50px)] overflow-y-auto">
          <div className="sm:px-4 px-2 py-4 sm:w-max w-full">
            {login && <Login setRegister={setRegister} setLogin={setLogin} />}
            {register && (
              <Register setRegister={setRegister} setLogin={setLogin} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
