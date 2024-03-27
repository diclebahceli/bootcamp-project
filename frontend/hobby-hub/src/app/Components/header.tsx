"use client";
import Link from "next/link";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { ClearLocalStorage, Revoke, RevokeAll } from "../services/AuthService";

export default function Header({
  accessToken,
  role,
}: {
  accessToken: string;
  role: string;
}) {
  const handleLogout = async () => {
    ClearLocalStorage();
    const email = localStorage.getItem("email");
    if (!email) {
      redirect("/pages/login");
    }
    await Revoke(email);
    redirect("/pages/login");
  };

  return (
    <div className="d-flex justify-content-between align-items-center p-2 pe-4 ps-4 bg-black">
      <h3>Hobby Hub</h3>
      <div>
        {role === "Admin" ? <Link href={"/pages/admin"}>Admin</Link> : null}
        {role === "User" ? <Link href={"/pages/home"}>Home</Link> : null}
        {accessToken ? (
          <>
            <Link href={"/pages/profile"}>Profile</Link>
            <Link href={"/pages/login"} onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <Link href={"/pages/login"}>Login</Link>
        )}
      </div>
    </div>
  );
}
