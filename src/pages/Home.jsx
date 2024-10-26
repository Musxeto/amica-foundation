import React, { useState } from 'react'

import Navbar from '../components/Navbar'
import CustomCarousel from '../components/Carousel'

const imgs = [
    "/placehol.png",
    "https://cdn.wrestletalk.com/wp-content/uploads/2024/09/roman-reigns-september-14-a.jpg"
]

const Home = () => {
    const [images,setImages] = useState(imgs)
  
    return (
    <div>
        <Navbar />
   <CustomCarousel images={images} />
    </div>
  )
}

export default Home
