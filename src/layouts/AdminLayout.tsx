import  { useState } from 'react'
import { signOutIcon, userIcon } from '../data'
import NotificationBar from '../components/NotificationBar'
import MobileSideBar from '../components/MobileSideBar'
import CurrentDate from '../components/CurrentDate'
import CurrentTime from '../components/CurrentTime'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { bellIcon } from '../assets/icons'
import UserProfile from '../components/UserProfile'

const AdminDashboardLayout = () => {
    const [showNotification, setShowNotification] = useState(false); 
    const navList = [
      {
        name: "Home",
        icon: "https://bookmei-bucket.s3.ap-south-1.amazonaws.com/frontend/provider/public/home_icon.png",
        link: "/Admin/adminhome",
      },
      {
        name: "Class Link",
        icon: "https://bookmei-bucket.s3.ap-south-1.amazonaws.com/frontend/provider/public/calendar_icon.png",
        link: "/Admin/classlink",
      },
      {
        name: "Student",
        icon: "https://bookmei-bucket.s3.ap-south-1.amazonaws.com/frontend/provider/public/calendar_icon.png",
        link: "/Admin/student",
      },
      {
        name: "SMS Campaign",
        icon: "https://bookmei-bucket.s3.ap-south-1.amazonaws.com/frontend/provider/public/calendar_icon.png",
        link: "/Admin/sms",
      },
      {
        name: "Chat Student",
        icon: "https://bookmei-bucket.s3.ap-south-1.amazonaws.com/frontend/provider/public/calendar_icon.png",
        link: "/Admin/studentQA",
      },
      {
        name: "Attendance",
        icon: "https://bookmei-bucket.s3.ap-south-1.amazonaws.com/frontend/provider/public/calendar_icon.png",
        link: "/Admin/attendce",
      },
      {
        name: "Setting",
        icon: "https://bookmei-bucket.s3.ap-south-1.amazonaws.com/frontend/provider/public/calendar_icon.png",
        link: "/Admin/setting",
      },
    ];
    const [openSideBar, setOpenSideBar] = useState(false)
    return (
        <>
            <div className="w-full flex items-center justify-center h-full bg-white">
                <div className="w-full max-w-[1920px] h-full flex flex-col  bg-white">
                    <div className="w-full flex flex-col sticky top-0 z-[100] bg-white">
                        <Header
                            title="Administator"
                            leftChildren={
                                <>
                                    <CurrentDate />
                                    <CurrentTime />
                                    <div
                                        onClick={() => setShowNotification(!showNotification)}
                                        className='flex items-center justify-center relative cursor-pointer'>
                                        <img src={bellIcon} alt='bell-icon' className="w-[20px] h-auto invert" />
                                        <div className='w-2 h-2 rounded-full bg-red-600 absolute top-0 right-0' />
                                    </div>
                                    <UserProfile />
                                </>
                            }
                            onMenuOpen={(value) => { setOpenSideBar(value) }}
                            notificationSmallDevice={
                                <>
                                    <div
                                        onClick={() => setShowNotification(!showNotification)}
                                        className='flex items-center justify-center relative cursor-pointer'>
                                        <img src={bellIcon} alt='bell-icon' className="w-[16px] h-auto invert" />
                                        <div className='w-1.5 h-1.5 rounded-full bg-red-600 absolute top-1 right-0' />
                                    </div>
                                </>
                            }
                        />
                    </div>
                    <div className="w-full grid md:grid-cols-[80px_1fr]">
                        <aside className="self-start sticky top-[64px] w-fit bg-white z-[4000] hidden sm:flex">
                            <Sidebar items={navList} onSignOutClick={() => { }} />
                        </aside>
                        <div className="w-full h-full px-3 ">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <NotificationBar open={showNotification} onClose={() => { setShowNotification(false) }} />
            <MobileSideBar
                date={<CurrentDate />}
                time={<CurrentTime />}
                navList={navList}
                title="Administrator"
                open={openSideBar}
                sidebarButtons={
                    <>
                        <a
                            className="w-full flex flex-row justify-start items-center gap-4 h-[50px] text-gray-700 rounded-md p-4">
                            <div className='flex items-center justify-center size-[24px]'>
                                <img src={userIcon} alt="switch" className="w-4 h-4" />
                            </div>
                            <p className='text-[14px] font-medium'>
                                Switch Employee Account
                            </p>
                        </a>
                        <div
                            onClick={() => { }}
                            className="w-full flex flex-row justify-start items-center gap-4 h-[50px] text-gray-700 rounded-md p-4">
                            <div className='flex items-center justify-center size-[24px]'>
                                <img src={signOutIcon} alt="signout" className="w-4 h-4" />
                            </div>
                            <p className='text-[16px] font-medium'>
                                Sign Out
                            </p>
                        </div>
                    </>
                }

            />
        </>
    )
}

export default AdminDashboardLayout