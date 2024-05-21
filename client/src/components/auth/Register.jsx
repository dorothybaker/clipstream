import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { API } from "../../utils/makeRequest";

function Register({ setRegister, setLogin }) {
  const [image, setImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djin7iczh",
        uploadPreset: "r5y9cmqc",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImage(result.info.secure_url);
        }
      }
    );
  }, []);

  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: async ({ fullName, username, email, password, image }) => {
      try {
        const res = await API.post("/auth/signup", {
          fullName,
          username,
          email,
          password,
          image,
        });

        if (res.status === 201) {
          const data = res.data;

          setEmail("");
          setFullName("");
          setUsername("");
          setError("");
          setImage("");
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

  const handleSignup = () => {
    if (password.length < 7) {
      setError("Password must be atlest 7 characters long!");
      return;
    }

    if (!image) {
      setError("Channel image is required!");
      return;
    }

    setError("");
    signup({ fullName, username, email, password, image });
  };

  return (
    <div className="bg-white/5 sm:px-4 px-2 py-6 sm:w-[450px] w-full h-max">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col">
          <h3 className="text-2xl">Sign up</h3>
          <span className="text-gray-400">to continue to ClipStream</span>
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Full Name</label>
            <input
              type="text"
              className="h-11 bg-[#0f0f0f]/40 px-3 rounded-md outline-none w-full"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">
              Username (<span className="text-gray-600">your channel name</span>
              )
            </label>
            <input
              type="text"
              className="h-11 bg-[#0f0f0f]/40 px-3 rounded-md outline-none w-full"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
            type="button"
            className={`${
              image ? "text-green-500" : "text-primary"
            } uppercase text-sm w-max mx-auto`}
            onClick={() => widgetRef.current?.open()}
          >
            {image
              ? "Channel image successfully set"
              : "click to Set channel image"}
          </button>
          <button
            className={`${
              isPending
                ? "bg-primary/40 cursor-not-allowed text-gray-500"
                : "bg-primary cursor-pointer text-white"
            } py-2 rounded-md uppercase`}
            disabled={isPending}
          >
            Sign up
          </button>

          <span className="text-gray-400 text-sm">
            Already have an account?{" "}
            <span
              className="ml-0.5 text-primary cursor-pointer"
              onClick={() => {
                setLogin(true);
                setRegister(false);
              }}
            >
              Sign in!
            </span>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Register;
