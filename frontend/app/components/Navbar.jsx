"use client";
import Link from "next/link";
import React from "react";
import NavProfile from "./NavProfile";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  let user;
  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost font-semibold text-lg">
          MERN Blogs
        </Link>
      </div>
      <div className="navbar-end gap-2">
        {user ? (
          <NavProfile />
        ) : (
          <div className="gap-2">
            <button
              onClick={() => router.push("/register")}
              className="btn btn-ghost"
            >
              Sign up
            </button>
            <button
              onClick={() => router.push("/login")}
              className="btn btn-ghost"
            >
              Sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
