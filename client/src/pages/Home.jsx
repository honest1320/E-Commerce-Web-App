import React from 'react'
import Announcements from '../components/Announcements'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/ProductsComponent'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Announcements />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home