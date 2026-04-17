import { useMutation } from "@tanstack/react-query";
import { api } from "../api/axios";

type LoginPayload = {
  email: string;
  password: string;
};

// type RegisterPayload = {
//   name: string;
//   email: string;
//   password: string;
// };

export const useLogin = (navigate: (path: string) => void) => {
  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      console.log("LOGIN REQUEST START");
      const res = await api.post("/auth/login", data);
      console.log("LOGIN RESPONSE", res.data);
      return res.data;
    },

    onSuccess: (data) => {
      console.log("SUCCESS CALLBACK", data);
      localStorage.setItem("token", data.token);

      navigate("/");
    },

    onError: (error) => {
      console.log("ERROR CALLBACK", error);
      alert("Invalid email or password");
    },
  });
};

// export const useRegister = (navigate: (path: string) => void) => {
//   return useMutation({
//     mutationFn: async (data: RegisterPayload) => {
//       const res = await api.post("/auth/register", data);
//       return res.data;
//     },

//     onSuccess: (data) => {
//       localStorage.setItem("token", data.token);
//       navigate("/");
//     },

//     onError: () => {
//       alert("User already exists with this email");
//     },
//   });
// };
