"use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   router.replace("/home");
//   return (
//     <div className="d-flex items-center justify-content-center h-[100vh] mb-5 mt-5">
//       <Image
//         src={"/images/about-img.jpg"}
//         width={100}
//         height={100}
//         alt="logo"
//       />
//     </div>
//   );
// }

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // Assuming you're redirecting to "/home"
  useEffect(() => {
    // This ensures the code only runs on the client side
    router.replace("/home");
  }, [router]);

  return (
    <div className="d-flex flex-column items-center justify-content-center h-screen mb-5 mt-5">
      <h1 className="text-4xl font-bold text-center mb-5 pt-5">
        Book Your Airport Ride with Ease
      </h1>
      <p className="text-lg text-center">
        Welcome to The Riders Booking App, where booking your airport transportation is
        simple and hassle-free.
      </p>
    </div>
  );
}
