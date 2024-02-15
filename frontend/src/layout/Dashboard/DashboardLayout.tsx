import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '~/components/Header/Header'
import SidebarLeft from '~/components/Sidebar/SidebarLeft'
import SidebarRight from '~/components/Sidebar/SidebarRight'

const DashboardLayout: React.FC = () => {
  return (
    <Layout className='flex min-h-screen flex-row'>
      <SidebarLeft />
      <Layout className='bg-neutral-300 px-12 '>
        <Header />
        <Outlet />
      </Layout>
      <SidebarRight />
    </Layout>
  )
}

export default DashboardLayout
