import React from 'react'
import { Form, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const Search: React.FC = () => {
  return (
    <Form className='flex h-12 w-[350px] rounded-lg bg-white'>
      <Input
        className='h-full border-none text-lg placeholder:text-gray-500 focus:border-none'
        placeholder='Search your Tasks here...'
      />
      <button className='w-10 text-xl hover:text-slate-500'>
        <SearchOutlined />
      </button>
    </Form>
  )
}

export default Search
