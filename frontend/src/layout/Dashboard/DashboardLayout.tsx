import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '~/components/Header/Header'
import SidebarLeft from '~/components/Sidebar/SidebarLeft'
import SidebarRight from '~/components/Sidebar/SidebarRight'

const DashboardLayout: React.FC = () => {
  return (
    <div className='flex min-h-screen'>
      <SidebarLeft />
      <section className='w-full overflow-y-auto bg-slate-200 px-4 lg:px-12'>
        <Header />
        <main>
          <Outlet />
        </main>
      </section>
      <SidebarRight />
    </div>
  )
}

export default DashboardLayout
