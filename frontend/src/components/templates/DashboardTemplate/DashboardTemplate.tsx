import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, SidebarLeft, SidebarRight } from '~/components/organisms'
import { cn } from '~/utils'

const DashboardTemplate: React.FC = () => {
  const [collapse, setCollapse] = useState<boolean>(false)

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 flex min-h-screen'>
      <SidebarLeft collapse={collapse} setCollapse={setCollapse} />
      <section
        className={cn(
          'fixed left-20 right-0 h-full overflow-y-auto bg-slate-200 px-2 scrollbar scrollbar-none scrollbar-track-slate-100 scrollbar-thumb-slate-400 hover:scrollbar-thin lg:left-[280px] lg:right-[340px] lg:px-12'
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

export default DashboardTemplate
