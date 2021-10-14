import styles from './card.module.css'

import pokeball from '../../utils/pokeball2.png'

export default function Pokemon({id, name, img, types, color}) {
    return (

            <div className={styles.card}>
                
                    
                        <div className={styles.pokeball} style={{backgroundImage: `url(${pokeball})`}}></div>
                
                        <span className ={styles.id}>{id}</span>
                
                
                <p className={styles.name} style ={{color:`${color}`}}>{name}</p>
                <div className={styles.img} style={{backgroundImage: `url(${img})`}}></div>

                
                <div>{types}</div>
            </div>

    )
}