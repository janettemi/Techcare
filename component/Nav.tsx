"use client"

"use client"

import Image from "next/image"
import React, { useState } from "react"
import NavItem from "./NavItem"
import { MenuItem } from "@/type"

const navItems: MenuItem[]= [
  { icon: "/icons/Home.png", label: "Overview",href:""},
  { icon: "/icons/group.png", label: "Patients",href:"/patients" },
  { icon: "/icons/calendar.png", label: "Schedule" ,href:""},
  { icon: "/icons/chat.png", label: "Message",href:"/patients" },
  { icon: "/icons/credit.png", label: "Transactions" ,href:"/patients"},
]

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Overview")

  return (
    <div className="absolute top-[18px] left-[18px] w-[1564px] h-[72px] bg-white rounded-[70px] opacity-100 shadow-md px-6">
      <div className="flex justify-between items-center h-full w-full">
        {/* Logo */}
        <Image src="/icons/TestLogo.png" alt="Test Logo" width={98} height={34} />

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={item.label === activeItem}
              onClick={() => setActiveItem(item.label)}
            />
          ))}
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <Image src="/icons/senior-woman.png" alt="Dr. Jose Simmons" width={32} height={32} className="rounded-full" />
          <div className="flex flex-col text-sm">
            <p className="font-bold text-gray-800">Dr. Jose Simmons</p>
            <p className="text-gray-500">General Practitioner</p>
          </div>
          <Image src="/icons/settings.png" alt="Settings" width={20} height={20} />
          <Image src="/icons/more.png" alt="More options" width={3} height={3} />
        </div>
      </div>
    </div>
  )
}



export default Navbar
