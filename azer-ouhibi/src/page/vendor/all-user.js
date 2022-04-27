import React from 'react'
import Header from '../../component/Common/Header'
import Layout from '../../component/VendorDashboard/Layout'
import AllUser from '../../component/VendorDashboard/AllUser'
import Banner from '../../component/Common/Banner'
import Footer from '../../component/Common/Footer'
const AllUsers = () => {
    return (
        <>
             <Header />
            <Banner title="Vendor" />
            <Layout>
             <AllUser/>
             </Layout>
            <Footer />
        </>
    )
}

export default AllUsers
