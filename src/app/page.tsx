"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Intro from "@/components/Intro";
export default function Home() {
  const [dark, setDark] = useState(true);

  useEffect(()=>{
    const res = localStorage.getItem('dark');
    if(res !== null && res !== undefined){
      const result = JSON.parse(res);
      setDark(result);
    }
    else{
      setDark(true);
    }
  },[])

  return (
    <div
      className="w-screen flex flex-col justify-center"
      style={
        dark === true
          ? { background: "black", color: "white" }
          : { background: "white", color: "black" }
      }
    >
      <Header dark={dark} setDark={setDark} pre = {'details/'}/>
      <Intro dark={dark} />
      <Footer />
    </div>
  );
}
