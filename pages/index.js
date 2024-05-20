import Hero from "@/components/Hero";
import Showtemplates from "@/components/Showtemplates";
import Image from "next/image";


export default function Home() {
  return (
    <div>
      <Hero/>
      <div className="my-5 mt-2">
      <Showtemplates/>
      </div>
      
    </div>
  );
}
