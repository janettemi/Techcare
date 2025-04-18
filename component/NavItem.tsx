import Image from "next/image";

const NavItem = ({
    icon,
    label,
    isActive,
    onClick,
  }: {
    icon: string
    label: string
    isActive: boolean
    onClick: () => void
  }) => (
    <div
    className={`flex items-center gap-2 text-sm px-3 py-1.5 cursor-pointer transition-all duration-200 rounded-full ${
      isActive
        ? "text-black  bg-[#01F0D0]"
        : "text-gray-700 hover:text-black hover:border hover:border-[#01F0D0]"
    }`}
    onClick={onClick}
  >
    <Image src={icon} alt={label} width={15} height={17} />
    <span>{label}</span>
  </div>
  )
  
  
  export default NavItem