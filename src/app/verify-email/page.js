"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (!token) {
        setMessage("Invalid token.");
        setStatus("error");
        return;
      }

      try {
        const response = await fetch(`/api/auth/sendVerificationEmail?token=${token}`);

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
          setStatus("success");

          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          const errorData = await response.json();
          setMessage(errorData.error || "An error occurred.");
          setStatus("error");
        }
      } catch (error) {
        console.error(error);
        setMessage("An unexpected error occurred.");
        setStatus("error");
      }
    };

    verifyEmail();
  }, [router]);

  return (
      <div className="max-w-[1950px] mx-auto flex flex-col w-screen relative">
        <div className="px-6 md:px-12 lg:px-16 w-full relative">
            <p className="text-base mt-4 text-[#B46632] font-semibold">{message}</p>
            {status == "success" && (
            <p className="mt-2 text-[#B46632] font-semibold">Redirecting to home page...</p>
            )}
        </div>
      </div>
  );
}
