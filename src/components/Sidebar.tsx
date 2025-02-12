import { signOutIcon } from "../data";

interface SidebarProps {
    items: {
        icon: string;
        name: string;
        link: string;
    }[]
    onSignOutClick?: () => void
    showSignout?: boolean
}
const Sidebar = ({ items, onSignOutClick, showSignout = false }: SidebarProps) => {
    const path = window.location.pathname // This is the path that will be used to get the current path
    return (
        <div className='w-[90px] h-[calc(100vh-64px)] shadow-lg drop-shadow-md flex flex-col items-start group gap-2 p-4 hover:w-[200px] transition-all duration-300 ease-in-out'>
            <div className="w-full h-full flex flex-col flex-grow gap-2">
                {
                    items.map((item, index) => {
                        let isActive = path === item.link
                        return (
                            <a
                                href={item.link}
                                key={index}
                                className={`flex w-full items-center space-x-4 px-4 py-2 cursor-pointer rounded transition-all duration-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"
                                    } ${!isActive && "hover:bg-blue-500 hover:text-white"}`}
                            >
                                <img src={item.icon} alt={item.name} className='w-6 h-6' />
                                <span
                                    className={`whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100`}
                                >
                                    {item.name}
                                </span>
                            </a >
                        )
                    })
                }
            </div>
            {
                showSignout &&
                <div 
            onClick={() => {
                if (onSignOutClick) {
                    onSignOutClick()
                }
            }}
            className="flex w-full items-center space-x-4 px-4 py-2 cursor-pointer rounded transition-all duration-200 bg-red-600">
                <img src={signOutIcon} alt="signout" className="w-6 h-6 invert" />
                <span
                    className={`whitespace-nowrap text-white text-[14px] font-semibold transition-opacity duration-300 opacity-0 group-hover:opacity-100`}
                >
                    Sign Out
                </span>
            </div>
            }
        </div>
    )
}

export default Sidebar