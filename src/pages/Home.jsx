import React, { useState } from 'react'
import Carousel from '../components/Carousel'

const imgs = [
    "https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1920&q=60&fm=webp",
    "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
]

const Home = () => {
    const [images,setImages] = useState(imgs)
  
    return (
    <div>
     <Carousel images={imgs}/>
    </div>
  )
}

export default Home
