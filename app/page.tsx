///import Image from "next/image";

import Navbar from "@/component/Nav";
import Patients from "./patient/page";

export default function Home() {
  return (
    <div className="bg-[#F6F7F8] w-[1600px] h-[1195px]">
      <Navbar />
      <Patients />
    </div>
  );
}
