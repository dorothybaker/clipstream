import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { API } from "../../utils/makeRequest";

function Login({ setRegister, setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const queryClient = useQueryClient();
  const { mutate: signin, isPending } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const res = await API.post("/auth/signin", {
          email,
          password,
        });

        if (res.status === 200) {
          const data = res.data;

          setEmail("");

          setError("");
          setPassword("");

          return data;
        }
      } catch (error) {
        console.log(error);
        setError(error?.response?.data);
      }
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      }
    },
  });

  const handleSignin = () => {
    signin({ email, password });
  };

  return (
    <div className="bg-white/5 px-4 py-6 sm:w-[450px] w-full mx-auto">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h3 className="text-2xl">Sign in</h3>
          <span className="text-gray-400">to continue to ClipStream</span>
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignin();
          }}
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Email address</label>
            <input
              type="email"
              className="h-11 bg-[#0f0f0f]/40 px-3 rounded-md outline-none w-full"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Password</label>
            <input
              type="password"
              className="h-11 bg-[#0f0f0f]/40 px-3 rounded-md outline-none w-full"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className={`${
              isPending
                ? "bg-primary/40 cursor-not-allowed text-gray-500"
                : "bg-primary cursor-pointer text-white"
            } py-2 rounded-md uppercase`}
            disabled={isPending}
          >
            Sign in
          </button>

          <span className="text-gray-400 text-sm">
            First time using Clipstream?{" "}
            <span
              className="ml-0.5 text-primary cursor-pointer"
              onClick={() => {
                setLogin(false);
                setRegister(true);
              }}
            >
              Sign up!
            </span>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
