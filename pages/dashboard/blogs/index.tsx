import React, { ReactElement } from 'react'
import DashboardLayout from '../layout'
import { BlogListComponent } from '@/components/dashboard_components/BlogList'
import BlogForm from './BlogForm'
import { useRouter } from 'next/router'


const BlogsPage = () => {
  const router = useRouter();
  const { action } = router.query; // Access action query parameter
  console.log(action);
  
  return (
    <>
      {action === 'new' ? (
        <BlogForm /> // Render JobForm if action is "new"
      ) : (
        <BlogListComponent /> // Render JobListComponent otherwise
      )}
    </>
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