import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '~/components/Header/Header'
import SidebarLeft from '~/components/Sidebar/SidebarLeft'
import SidebarRight from '~/components/Sidebar/SidebarRight'
import { cn } from '~/utils'

const DashboardLayout: React.FC = () => {
  const [collapse, setCollapse] = useState<boolean>(false)

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 flex min-h-screen'>
      <SidebarLeft collapse={collapse} setCollapse={setCollapse} />
      <section
        className={cn(
          'fixed left-20 right-0 h-full overflow-y-auto bg-slate-200 px-4 lg:left-[280px] lg:right-[340px] lg:px-12'
        )}
      >
        <Header />
        <main className='overflow-y-auto'>
          <Outlet />
        </main>
      </section>
      <SidebarRight />
    </div>
  )
}

export default DashboardLayout
