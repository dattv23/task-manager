import React from 'react'
import { Outlet } from 'react-router-dom'

import { cn } from '~/utils'

const Header = React.lazy(() => import('~/components/organisms/Header'))
const SidebarLeft = React.lazy(() => import('~/components/organisms/Sidebar/SidebarLeft'))
const SidebarRight = React.lazy(() => import('~/components/organisms/Sidebar/SidebarRight'))

const DashboardTemplate: React.FC = () => {
  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 flex min-h-screen'>
      <SidebarLeft />
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
