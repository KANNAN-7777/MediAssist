import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import TrustStats from '../components/TrustStats'
import WhyChooseUs from '../components/WhyChooseUs'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import QuickAccess from '../components/QuickAccess'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <main className="w-full">
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <TrustStats />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <QuickAccess />
      <Banner />
    </main>
  )
}

export default Home