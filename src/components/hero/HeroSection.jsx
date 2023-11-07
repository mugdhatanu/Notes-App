import HeroImg from './../../assets/hero.png'
import LockImg from './../../assets/lock.png'
import styles from './Hero.module.css'


const HeroSection = () => {
  return (
    <div className= {styles["hero-section"]}>
        <img src={HeroImg} alt="Hero Image" />
        <div className= {styles["text-section"]}>
            <h2>Pocket Notes</h2>
            <p>
            Send and receive messages without keeping your phone online.
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
        </div>
        
        <div className= {styles.watermark}>
            <img src={LockImg} alt="Lock Icon" />
            <p>end-to-end encrypted</p>
        </div>
    </div>
  )
}

export default HeroSection
