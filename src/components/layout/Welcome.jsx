import React from 'react'
import car4 from '../image/roxx.avif'
import s1 from '../image/slide1.webp'
import s2 from '../image/slide2.avif'
import s3 from '../image/slide3.avif'
import { Navbar } from './Navbar'
import { Footer } from './Footer'





export const Welcome = () => {
  return (
    <>
    <Navbar></Navbar>
<div id="carouselExampleDark" className="carousel carousel-dark slide" style={{width:'800px',borderRadius:'5px',position:'relative',left:'25%',marginTop:'80px'}}>
  <div className="carousel-indicators">
    <button
      type="button"
      data-bs-target="#carouselExampleDark"
      data-bs-slide-to={0}
      className="active"
      aria-current="true"
      aria-label="Slide 1"
    />
    <button
      type="button"
      data-bs-target="#carouselExampleDark"
      data-bs-slide-to={1}
      aria-label="Slide 2"
    />
    <button
      type="button"
      data-bs-target="#carouselExampleDark"
      data-bs-slide-to={2}
      aria-label="Slide 3"
    />
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval={10000} >
      <img src={s1} className="d-block w-100" alt="..." style={{borderRadius:'5px'}}  />
      <div className="carousel-caption d-none d-md-block">
        <h5>Welcome To Vehicle Vault</h5>
        <p>your ultimate destination for exploring, comparing, buying, and selling cars with ease.</p>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval={2000}>
      <img src={s2} className="d-block w-100" alt="..." style={{borderRadius:'5px'}}/>
      <div className="carousel-caption d-none d-md-block" style={{color:'bisque'}}>
        <h5>Compare & Choose the Best</h5>
        <p>With our advanced comparison feature, you can evaluate multiple cars based on specifications, price, and performance.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={s3} className="d-block w-100" alt="..." style={{borderRadius:'5px'}}/>
      <div className="carousel-caption d-none d-md-block" style={{color:'bisque'}}>
        <h5>Buy & Sell with Confidence
        </h5>

        <p>Vehicle Vault ensures secure and hassle-free transactions for both buyers and sellers.</p>
      </div>
    </div>
  </div>
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExampleDark"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleDark"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>

</div> <br />
<Footer></Footer>

    </>
    
  )
}
