import React from 'react';
import {Link} from 'react-router-dom'
import styles from './Nav.module.css';
import eevees from './eevees'


export default function Nav() {

    let eevolutions = [...eevees]
    return (
        <div className={styles.nav} style={{height:'7.5vh'}}>
           <Link to={'/home'}>
            <div className={styles.home} style={{backgroundImage:'url(https://fontmeme.com/permalink/210911/1a34868d4345e8adbd6b53e3be6b5ec4.png)'}}></div>
            <div className={styles.eevees}>
                {
                    eevolutions.map(el => {
                        return <div className={styles.eevolutions}style={{backgroundImage:`url(${el})`}}></div>
                    })
                }
            </div>
            </Link>

            <div style={{height:'100%', display:'flex', alignItems:'center'}}>
                <Link className={styles.createLink} to={'/create'} > <button className={styles.createBtn}style={{height:'100%', width:'100%'}}>Create PKM</button> </Link>
            </div>
        </div>
    )
}