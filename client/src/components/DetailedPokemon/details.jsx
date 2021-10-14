import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Nav from '../Nav/Nav'
import styles from './details.module.css';
import pokedex from '../../utils/pokedex.jpg'
import pokeTypes from './types'
import LoadingImg from '../../utils/LoadingEevee.gif'




export default function PokeDetail() {
    const [pokemon, setPokemon] = useState({});
    const [description, setDescription] = useState("");
    const {id} = useParams();
    const [loading, setLoading] = useState(true)



    let getPokemonById = (id) => {
        if(id > 151) {

            axios.get('http://localhost:3001/api/pokemon/' + id)
            .then(poke => {
                setDescription(poke.data[0].description)
                setPokemon(...poke.data)
                setLoading(false)
            })
        }
        else{
            axios.get('http://localhost:3001/api/pokemon/' + id)
            .then(poke => {
                setPokemon(...poke.data)
                setLoading(false)
            })
            axios.get('https://pokeapi.co/api/v2/pokemon-species/' + id)
            .then(pokemon => {
                setDescription(pokemon.data.flavor_text_entries[12].flavor_text)
            })

        }
    }

    useEffect(() => {
            getPokemonById(id);
    }, [])

    const handleGifClick = () => {
        setPokemon(prevState => {
            return {
                ...prevState,
                gif: prevState.gifShiny,
                gifShiny: prevState.gif
            }
        })
    }

    
    return (
        <div style={{overflow:'hidden'}}>
            {   
            <div>


                <Nav/>    
                {!pokemon.gif? <div style={{backgroundImage:`url(${LoadingImg})`, position:"absolute", top:"7.5vh", width:"100vw", height:"92vh", zIndex:"4", backgroundColor:'white', backgroundRepeat:'no-repeat', backgroundSize:"contain", backgroundPosition:"center"}}></div> : null}

                <div className={styles.pokedex} style={{backgroundImage: `url(${pokedex})`}}>
            

                    <div className={styles.id}>{pokemon.id}</div>
                    <div className = {styles.name}>{pokemon.name}</div>
                    <div className={styles.stats}>
                        <div style={{display:'flex'}}>
                            <div style={{width:"2vw"}}>HP:</div><label className={styles.statValues}>{pokemon.hp}</label>
                        </div>

                        <div style={{display:'flex'}}>
                            <div style={{width:"2vw"}}>ATT:</div><label className={styles.statValues}>{pokemon.attack}</label>
                        </div>
                           
                        <div style={{display:'flex'}}>
                            <div style={{width:"2vw"}}>DEF:</div><label className={styles.statValues}>{pokemon.defense}</label>
                        </div>

                        <div style={{display:'flex'}}>
                            <div style={{width:"2vw"}}>SP:</div><label className={styles.statValues}>{pokemon.speed}</label>
                        </div>
                    </div>
                    <div className={styles.weightDiv}>
                        <div className={styles.weight}>{pokemon.height}</div><div style={{width:'2vw'}}>lbs.</div></div>
                    <div className={styles.heightDiv}>
                        <div className={styles.height}>{pokemon.weight}</div><div>in.</div> </div>
                    <div className={styles.description}>{description}</div>
                    <div style={{display:'flex'}}>{pokemon.Types?.map((type,i) => {
                        return <div className={styles[`s${i}`]} style={{backgroundImage: `url(${pokeTypes[type.name]})`}}></div>

                    })}
                    </div>
                    <div className={styles.gif} style={{backgroundImage: `url(${pokemon.gif})`}}></div>
                    <div className={styles.gifShiny} onClick={() => handleGifClick()} style={{backgroundImage: `url(${pokemon.gifShiny})`}}></div>
            
                </div>
            </div>
            }
        </div>
    )
}