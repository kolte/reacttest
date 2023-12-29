"use client";
import { useEffect } from "react";
import { checkAuthentication } from "../../helper/checkAuthentication";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (checkAuthentication()) router.push("/dashboard");
    else router.push("/login");
  }, []);

  return <></>;
}
