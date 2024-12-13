"use client";
import { useState } from "react";
import AuthService from "../services/auth.service";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Page() {
  const [user, setUser] = useState({ username: "", password: "" });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.register(
        user.username,
        user.password
      );
      if (currentUser.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register",
          text: currentUser.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setUser({ username: "", password: "" });
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Register",
        text: error?.response?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-rose-400">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h3 className="card-title">Register</h3>
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
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
