import React, { ReactElement } from 'react'
import DashboardLayout from '../layout'
import { ClientListComponent } from '@/components/dashboard_components/ClientList'
import { useRouter } from 'next/router';
// import ClientForm from './ClientForm';


const PartnersPage = () => {
  const router = useRouter();
  const { action } = router.query; // Access action query parameter
  console.log(action);
  
  return (
    <>
    {action === 'new' ? (
    //   <ClientForm /> // Render JobForm if action is "new"
    ) : (
      <ClientListComponent /> // Render JobListComponent otherwise
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