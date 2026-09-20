import Navbar from '../../components/layouts/Navbar'
import Features from './Features'
import Hero from './Hero'
import Locations from './Locations'
import PopularDestination from './PopularDestination'
import Testimonials from './Testimonials'

function Home() {
  return (
    <div className='relative'>
        <Hero/>
        <Features/>
        <Locations/>
        <PopularDestination/>
        <Testimonials/>
    </div>
  )
}

export default Home
