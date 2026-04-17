import { Link, useNavigate } from "react-router-dom";
// import { login } from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useLogin } from "../hooks/useAuth";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useLogin(navigate);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      alert("Please enter email and password");
      return;
    }

    mutate(loginForm);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl">
        <div className="overflow-hidden rounded-2xl shadow-lg bg-white mb-6">
          <div className="grid md:grid-cols-2">
            {/* FORM SIDE */}
            <form
              onSubmit={handleLogin}
              className="flex flex-col justify-center p-6 md:p-10"
            >
              <div className="space-y-5">
                {/* Heading */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">Login</h1>
                  <p className="text-gray-500">
                    Enter your email below to login to your account.
                  </p>
                  {/* {mutation.isError && (
                    <span className="text-red-500 text-sm">
                      {"Something went wrong"}
                    </span>
                  )} */}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    // ref={emailRef}
                    name="email"
                    // id="email"
                    type="email"
                    placeholder="admin@example.com"
                    required
                    onChange={handleChange}
                    value={loginForm.email}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
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
                    required
                    onChange={handleChange}
                    value={loginForm.password}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
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
                      <span className="ml-2">Loging in...</span>
                    </>
                  ) : (
                    <span>Login</span>
                  )}
                </button>

                {/* Signup Link */}
                {/* <p className="text-center text-sm text-gray-500">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="underline font-medium text-black"
                  >
                    Sign up
                  </Link>
                </p> */}
              </div>
            </form>

            {/* IMAGE SIDE */}
            <div className="relative hidden md:block">
              <img
                src="/images/login-image.jpg"
                alt="Login"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
