import React from 'react'
import { Form, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const Search: React.FC = () => {
  return (
    <Form className='flex h-10 w-[350px] rounded-lg border border-gray-400 bg-none'>
      <Input
        className='text-md h-full border-none bg-inherit placeholder:text-gray-500 hover:bg-inherit focus:border-gray-400 focus:bg-inherit focus:shadow-inherit'
        placeholder='Search your Tasks here...'
      />
      <button className='w-10 text-xl hover:text-slate-500'>
        <SearchOutlined />
      </button>
    </Form>
  )
}

export default Search
