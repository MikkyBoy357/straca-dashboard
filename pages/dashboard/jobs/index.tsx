import React, { ReactElement } from 'react'
import DashboardLayout from '../layout'
import { JobListComponent } from '@/components/dashboard_components/JobList'
import { useRouter } from 'next/router';
import JobForm from './JobForm';


const JobsPage = () => {
  const router = useRouter();
  const { action } = router.query; // Access action query parameter
    console.log(action);

  return (
    <>
      {action === 'new' ? (
        <JobForm /> // Render JobForm if action is "new"
      ) : (
        <JobListComponent /> // Render JobListComponent otherwise
      )}
    </>
  )
}

JobsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default JobsPage