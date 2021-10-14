import tuvi from '../..//utils/gameboy.png'
import gif from '../..//utils/LandingEvee.gif'
import { Link } from "react-router-dom";
import styles from './landing.module.css'


export default function Landing() {    
    return (
        <div className ={styles.background} style={{backgroundImage: `url(${tuvi})`}}>
            <div className={styles.screen} style={{backgroundImage: `url(${gif})`}}>
                <div className={styles.firmBlocker}></div>
                <Link to = {"/home"}>
                <button className = {styles.button}>Start</button>
                </Link>
            </div>
        </div>
    )
}