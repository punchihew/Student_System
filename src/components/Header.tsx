import { useState } from "react";
import { closeIcon, menuIcon } from "../data";
import { bookmeiLogoWhite } from "../assets/logo";

interface HeaderProps {
  title?: string;
  leftChildren?: React.ReactNode;
  onMenuOpen?: (value: boolean) => void;
  notificationSmallDevice?: React.ReactNode;
}
const Header = ({ title, leftChildren, onMenuOpen, notificationSmallDevice}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // This is the state that will be used to open the menu
  const path = window.location.pathname // This is the path that will be used to get the current path
  return (
    <>
      <div className='w-full flex flex-row items-center justify-between p-4 bg-blue-400 shadow-md max-h-[64px] font-inter'>
        {
          path.startsWith('/biz/manage') ?
            <img src={bookmeiLogoWhite} alt="logo" className="w-auto h-5 sm:w-auto sm:h-8" />
            :
            <img src="https://bookmei-bucket.s3.ap-south-1.amazonaws.com/frontend/provider/public/logo.png" alt="logo" className="w-auto h-5 sm:w-auto sm:h-8" />
        }

        <div className="hidden sm:block">
          <h1 className='text-[#292929] font-bold text-[20px]'>
            {title}
          </h1>
        </div>
        <div className="sm:flex flex-row gap-x-5 items-center hidden">
          {leftChildren}
        </div>
        <div className="flex sm:hidden flex-row gap-3">
          {notificationSmallDevice}
          <div
            onClick={() => {
              setIsMenuOpen(!isMenuOpen)
              if (onMenuOpen) {
                onMenuOpen(!isMenuOpen)
              }
            }}
            className="flex items-center justify-center cursor-pointer">
            {
              isMenuOpen ?
                <img src={closeIcon} alt="menu" className="w-5 h-5" />
                :
                <img src={menuIcon} alt="menu" className="w-5 h-5" />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Header