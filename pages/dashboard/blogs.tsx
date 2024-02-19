import React, { ReactElement } from 'react'
import DashboardLayout from './layout'
import { BlogListComponent } from '@/components/dashboard_components/BlogList'


const BlogsPage = () => {
  return (
    <BlogListComponent />
  )
}

BlogsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default BlogsPage