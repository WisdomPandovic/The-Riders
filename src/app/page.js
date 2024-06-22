"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // This ensures the code only runs on the client side
    router.replace("/home");
  }, [router]);

  return (
    <div className="d-flex flex-column items-center justify-content-center h-screen mt-3 mb-5">
      <div className="text-center mb-5">
        <h1 className="text-4xl font-bold">Book Your Airport Ride with Ease</h1>
        <p className="text-lg">
          Welcome to The Riders Booking App, where booking your airport transportation is
          simple and hassle-free.
        </p>
      </div>

      <div className="d-flex justify-content-center">
        <Image
          src={"/images/the-riders.jpg"}
          width={100}
          height={100}
          alt="logo"
          className="rounded-circle"
        />
      </div>
    </div>
  );
}
