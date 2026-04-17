import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useRegister } from "../hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useRegister(navigate);

  //   const nameRef = useRef<HTMLInputElement>(null);
  //   const emailRef = useRef<HTMLInputElement>(null);
  //   const passwordRef = useRef<HTMLInputElement>(null);

  //   const mutation = useMutation({
  //     mutationFn: register,
  //     onSuccess: (data) => {
  //       console.log("login successful", data);

  //       localStorage.setItem("token", data.token);

  //       navigate("/dashboard/home");
  //     },
  //     onError: (error) => {
  //       console.error("login failed", error);
  //     },
  //   });

  //   const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const name = nameRef.current?.value;
  //     const email = emailRef.current?.value;
  //     const password = passwordRef.current?.value;

  //     if (!name || !email || !password) {
  //       return alert("Please enter email and password.");
  //     }

  //     console.log("sending data", { name, email, password });
  //     mutation.mutate({ name, email, password });
  //   };

  // 1
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 2
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterForm({ ...registerForm, [name]: value });
  };

  // const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!registerForm.name || !registerForm.email || !registerForm.password) {
  //     alert("please enter name, email and password.");
  //     return null;
  //   }

  //   // localStorage.setItem("authToken", JSON.stringify(registerForm));
  //   // navigate("/home");
  //   try {
  //     await api.post("/auth/register", registerForm);

  //     navigate("/login");
  //   } catch (error) {
  //     console.error(error);
  //     alert("User already exist with this email.");
  //   }
  // };
  // console.log("registerForm", registerForm);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      alert("Please enter name, email and password.");
      return;
    }

    mutate(registerForm);
  };

  //   4
  const token = localStorage.getItem("token");
  // const tokenParsed = authToken ? JSON.parse(authToken) : null;
  console.log(token);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl">
        <div className="overflow-hidden rounded-2xl shadow-lg bg-white mb-6">
          <div className="grid md:grid-cols-2">
            {/* FORM SIDE */}
            <form
              onSubmit={handleRegister}
              className="flex flex-col justify-center p-6 md:p-10"
            >
              <div className="space-y-5">
                {/* Heading */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">Sign up</h1>
                  <p className="text-gray-500">
                    Enter your information to create an account.
                  </p>
                  {/* {mutation.isError && (
                    <span className="text-red-500 text-sm">
                      {"Something went wrong"}
                    </span>
                  )} */}
                </div>

                {/* name */}
                <div className="space-y-0.5">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    // ref={nameRef}
                    // id="name"
                    name="name"
                    type="text"
                    placeholder="enter username"
                    onChange={handleChange}
                    value={registerForm?.name}
                    // required
                    className="w-full rounded-lg border border-gray-300 px-4 py-1 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    // ref={emailRef}
                    // id="email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    onChange={handleChange}
                    value={registerForm?.email}
                    // required
                    className="w-full rounded-lg border border-gray-300 px-4 py-1 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    // ref={passwordRef}
                    // id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    value={registerForm?.password}
                    // required
                    className="w-full rounded-lg border border-gray-300 px-4 py-1 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full rounded-lg bg-black py-3 text-white hover:opacity-90 transition flex items-center justify-center disabled:opacity-70"
                >
                  {isPending ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin />
                      <span className="ml-2">Signing in...</span>
                    </>
                  ) : (
                    <span>Create an account</span>
                  )}
                </button>

                {/* Signup Link */}
                <p className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="underline font-medium text-black"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>

            {/* IMAGE SIDE */}
            <div className="relative hidden md:block">
              <img
                src="/images/login-image.jpg"
                alt="register"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
