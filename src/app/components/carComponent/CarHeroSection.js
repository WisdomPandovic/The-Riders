import styles from "./car.module.css"

function CarHeroSection(){
    return(
        <div className={`${styles['hero-section']} text-center`}>
      <div className="container">
        <h1 className="text-white text-uppercase l-spacing">Our Classes</h1>
      </div>
    </div>
    )
}
export default CarHeroSection;