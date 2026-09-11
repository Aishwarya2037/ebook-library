// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// import { useLogin } from "../hooks/useAuth";
// import { useEffect, useState } from "react";

// const LoginPage = () => {
//   const navigate = useNavigate();

//   const { mutate, isPending } = useLogin(navigate);

//   const [loginForm, setLoginForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setLoginForm({
//       ...loginForm,
//       [name]: value,
//     });
//   };

//   const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!loginForm.email || !loginForm.password) {
//       alert("Please enter email and password");
//       return;
//     }

//     mutate(loginForm);
//   };

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (token) {
//       navigate("/");
//     }
//   }, [token, navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-5xl">
//         <div className="overflow-hidden rounded-2xl shadow-lg bg-white mb-6">
//           <div className="grid md:grid-cols-2">
//             {/* FORM SIDE */}
//             <form
//               onSubmit={handleLogin}
//               className="flex flex-col justify-center p-6 md:p-10"
//             >
//               <div className="space-y-5">
//                 {/* Heading */}
//                 <div className="flex flex-col gap-2">
//                   <h1 className="text-2xl font-bold">Login</h1>
//                   <p className="text-gray-500">
//                     Enter your email below to login to your account.
//                   </p>
//                   {/* {mutation.isError && (
//                     <span className="text-red-500 text-sm">
//                       {"Something went wrong"}
//                     </span>
//                   )} */}
//                 </div>

//                 {/* Email */}
//                 <div className="space-y-2">
//                   <label htmlFor="email" className="block text-sm font-medium">
//                     Email
//                   </label>
//                   <input
//                     // ref={emailRef}
//                     name="email"
//                     // id="email"
//                     type="email"
//                     placeholder="admin@example.com"
//                     required
//                     onChange={handleChange}
//                     value={loginForm.email}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
//                   />
//                 </div>

//                 {/* Password */}
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="password"
//                     className="block text-sm font-medium"
//                   >
//                     Password
//                   </label>
//                   <input
//                     // ref={passwordRef}
//                     // id="password"
//                     name="password"
//                     type="password"
//                     required
//                     onChange={handleChange}
//                     value={loginForm.password}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
//                   />
//                 </div>

//                 {/* Login Button */}
//                 <button
//                   type="submit"
//                   disabled={isPending}
//                   className="w-full rounded-lg bg-black py-3 text-white hover:opacity-90 transition flex items-center justify-center disabled:opacity-70"
//                 >
//                   {isPending ? (
//                     <>
//                       <FontAwesomeIcon icon={faSpinner} spin />
//                       <span className="ml-2">Loging in...</span>
//                     </>
//                   ) : (
//                     <span>Login</span>
//                   )}
//                 </button>

//                 {/* Signup Link */}
//                 {/* <p className="text-center text-sm text-gray-500">
//                   Don&apos;t have an account?{" "}
//                   <Link
//                     to="/auth/register"
//                     className="underline font-medium text-black"
//                   >
//                     Sign up
//                   </Link>
//                 </p> */}
//               </div>
//             </form>

//             {/* IMAGE SIDE */}
//             <div className="relative hidden md:block">
//               <img
//                 src="/images/login-image.jpg"
//                 alt="Login"
//                 className="absolute inset-0 h-full w-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// import { useEffect, useState } from "react";
// import { loginAdmin } from "../api/axios";

// const LoginPage = () => {
//   const navigate = useNavigate();

//   const [loginForm, setLoginForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [isPending, setIsPending] = useState(false);

//   const FIXED_EMAIL = "admin@gmail.com";
//   const FIXED_PASSWORD = "123456";

//   // If already logged in, go to home
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       navigate("/", { replace: true });
//     }
//   }, [navigate]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setLoginForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!loginForm.email || !loginForm.password) {
//       alert("Please enter email and password");
//       return;
//     }

//     try {
//       setIsPending(true);

//       const data = await loginAdmin({
//         email: loginForm.email,
//         password: loginForm.password,
//       });

//       // Store real JWT
//       localStorage.setItem("token", data.token);

//       // Optional: store admin information
//       localStorage.setItem("admin", JSON.stringify(data.admin));

//       navigate("/", { replace: true });
//     } catch (error: any) {
//       console.error("Login error:", error);

//       alert(error.response?.data?.message || "Invalid email or password");
//     } finally {
//       setIsPending(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-5xl">
//         <div className="overflow-hidden rounded-2xl shadow-lg bg-white mb-6">
//           <div className="grid md:grid-cols-2">
//             {/* FORM SIDE */}
//             <form
//               onSubmit={handleLogin}
//               className="flex flex-col justify-center p-6 md:p-10"
//             >
//               <div className="space-y-5">
//                 {/* Heading */}
//                 <div className="flex flex-col gap-2">
//                   <h1 className="text-2xl font-bold">Login</h1>

//                   <p className="text-gray-500">
//                     Enter your email below to login to your account.
//                   </p>
//                 </div>

//                 {/* Email */}
//                 <div className="space-y-2">
//                   <label htmlFor="email" className="block text-sm font-medium">
//                     Email
//                   </label>

//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="admin@gmail.com"
//                     required
//                     onChange={handleChange}
//                     value={loginForm.email}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
//                   />
//                 </div>

//                 {/* Password */}
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="password"
//                     className="block text-sm font-medium"
//                   >
//                     Password
//                   </label>

//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     placeholder="Enter password"
//                     required
//                     onChange={handleChange}
//                     value={loginForm.password}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
//                   />
//                 </div>

//                 {/* Login Button */}
//                 <button
//                   type="submit"
//                   disabled={isPending}
//                   className="w-full rounded-lg bg-black py-3 text-white hover:opacity-90 transition flex items-center justify-center disabled:opacity-70"
//                 >
//                   {isPending ? (
//                     <>
//                       <FontAwesomeIcon icon={faSpinner} spin />
//                       <span className="ml-2">Logging in...</span>
//                     </>
//                   ) : (
//                     <span>Login</span>
//                   )}
//                 </button>
//               </div>
//             </form>

//             {/* IMAGE SIDE */}
//             <div className="relative hidden md:block">
//               <img
//                 src="/images/login-image.jpg"
//                 alt="Login"
//                 className="absolute inset-0 h-full w-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { loginAdmin } from "../api/axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [isPending, setIsPending] = useState(false);

  // If already logged in, go to dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginForm.email.trim() || !loginForm.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setIsPending(true);

      const data = await loginAdmin({
        email: loginForm.email.trim(),
        password: loginForm.password,
      });

      // Store real JWT token
      localStorage.setItem("token", data.token);

      // Store admin information
      localStorage.setItem("admin", JSON.stringify(data.admin));

      // Go to dashboard
      navigate("/", { replace: true });
    } catch (error: any) {
      console.error("Login error:", error);

      const message =
        error.response?.data?.message || "Invalid email or password";

      alert(message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="grid min-h-[550px] md:grid-cols-2">
            {/* ================= FORM SIDE ================= */}
            <div className="flex items-center justify-center p-6 sm:p-10">
              <form onSubmit={handleLogin} className="w-full max-w-md">
                <div className="space-y-6">
                  {/* Heading */}
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      Admin Login
                    </h1>

                    <p className="text-sm text-gray-500">
                      Enter your credentials to access the dashboard.
                    </p>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@gmail.com"
                      value={loginForm.email}
                      onChange={handleChange}
                      disabled={isPending}
                      autoComplete="email"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:bg-gray-100"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={handleChange}
                      disabled={isPending}
                      autoComplete="current-password"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:bg-gray-100"
                    />
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex w-full items-center justify-center rounded-lg bg-[#F8843F] py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isPending ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} spin />
                        <span className="ml-2">Logging in...</span>
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* ================= IMAGE SIDE ================= */}
            <div className="relative hidden md:block">
              <img
                src="/images/login-image.jpg"
                alt="Admin login"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Optional overlay */}
              <div className="absolute inset-0 bg-black/20" />

              {/* <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-2xl font-bold">E-Book Library</h2>

                <p className="mt-2 text-sm text-white/90">
                  Manage your books and library content from the admin
                  dashboard.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
