"use client";
import AuthService from "../services/auth.service";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuthContext } from "../contexts/auth.context";

export default function Page() {
  const { login } = useAuthContext();
  const router = useRouter();
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.login(user.username, user.password);
      if (currentUser.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login",
          text: currentUser.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        login(currentUser.data);
        setUser({ username: "", password: "" });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login",
        text: error?.response?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-500 to-emerald-400">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h3 className="card-title">Login</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              className="input input-bordered"
              required
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-control mt-6">
            <button
              onClick={handleSubmit}
              className="btn bg-black text-white hover:bg-gray-800"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
