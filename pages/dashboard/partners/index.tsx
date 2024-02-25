import React, { ReactElement } from 'react'
import DashboardLayout from '../layout'
import { EmployeeListComponent } from '@/components/dashboard_components/EmployeeList'
import { useRouter } from 'next/router';
import EmployeeForm from './EmployeeForm';


const PartnersPage = () => {
  const router = useRouter();
  const { action } = router.query; // Access action query parameter
  console.log(action);
  
  return (
    <>
    {action === 'new' ? (
      <EmployeeForm /> // Render JobForm if action is "new"
    ) : (
      <EmployeeListComponent /> // Render JobListComponent otherwise
    )}
  </>
  )
}

PartnersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default PartnersPage