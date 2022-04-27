import React from 'react'
import Header from '../component/Common/Header'
import Banner from '../component/Common/Banner'
import Reset from '../component/Login/Reset'
import Footer from '../component/Common/Footer'
const reset = () => {
    return (
        <>
            <Header />
            <Banner title="reset" />
            <Reset />
            <Footer />
        </>
    )
}

export default reset