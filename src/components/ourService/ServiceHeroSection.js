import styles from "./service.module.css"

function ServiceHeroSection(){
    return(
        <div className={`${styles['hero-section']} text-center mt-3`}>
      <div className="container">
        <h1 className="text-white text-uppercase l-spacing">Our Service</h1>
      </div>
    </div>
    )
}
export default ServiceHeroSection;