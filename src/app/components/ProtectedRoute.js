"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const apiKey = localStorage.getItem("apiKey");
    if (!apiKey) router.push("/login"); // redirect to login
  }, []);

  return children;
}
