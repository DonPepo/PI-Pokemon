import React, { useState } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import pokedex from '../../utils/create.png'
import eveelife from '../../utils/eveelife.gif'
import styles from './createPokemon.module.css';
import typesImg from '../DetailedPokemon/types'
import grayscale from './greyscales';
import Nav from '../Nav/Nav'

export default function CreatePokemon() {
    const [pokemon, setPokemon] = useState({
        name:"",
        hp:0,
        attack:0,
        defense:0,
        speed:0,
        img:"",
        description:"",
        types:[],
        height:0,
        weight:0,

    })
    let types = useSelector(state => state.types)
    types = types.slice(0,18)
    
    const [grayscales, setGrayscales] = useState({...grayscale})
    let grayscaleOriginal = {...grayscale}

    const onInputChange = (e) => {
        setPokemon(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const typeHandler = (type) => {
        if(pokemon.types.includes(type)) {
            setGrayscales(prevState => {
                return{
                    ...prevState,
                    [type]: 0
            }}) 
            let deleteType = pokemon.types.indexOf(type)
            let aux = pokemon.types
            aux.splice(deleteType,1)
            setPokemon(prevState => {
                return{
                    ...prevState,
                    types: aux
            }}) 
        }
        else{
            if(pokemon.types.length===2){
                let aux2 = pokemon.types[0]
                setPokemon(prevState => {
                    return{
                        ...prevState,
                        types: [prevState.types[1], type]
                    }})
                    setGrayscales(prevState => {
                        return{
                            ...prevState,
                            [aux2]: 0,
                            [type]: 1
                    }}) 
                }
            else{

                setGrayscales(prevState => {
                    return{
                        ...prevState,
                        [type]: 1
                    }}) 
                    setPokemon(prevState => {
                        return{
                            ...prevState,
                            types: [...prevState.types, type]
                        }})
                    }
                            
        }  
    }

    const resetButt = () => {
        setGrayscales({...grayscaleOriginal}) 

        setPokemon({
        name:"",
        hp:0,
        attack:0,
        defense:0,
        speed:0,
        img:"",
        gif:"",
        description:"",
        types:[],   
        height:0,
        weight:0,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(pokemon.name.length<1 || pokemon.hp < 1 || pokemon.attack < 1 || pokemon.defense < 1 || pokemon.speed < 1 || pokemon.height < 1 || pokemon.weight < 1 || pokemon.types.length < 1){
            alert("Complete all areas correctly to continue your creation")
        }
        else{

            axios.post('http://localhost:3001/api/pokemon', pokemon)
            .then(alert("Pokemon successfully added"))
        }

    }
    return (
        <div style={{overflow:'hidden'}}>
            <Nav/>
            <form onSubmit={handleSubmit}>
                <div >
                    <div className={styles.eveeGif1} style ={{backgroundImage:`url(${eveelife})`}}></div>
                        <div>{pokemon.types?.map(el=> {
                            return (
                                <div>{el}</div>
                            )
                        })}</div>
                    <div className={styles.pokedex} style={{backgroundImage:`url(${pokedex})`}}>

                    <div className={styles.stats}>
                            <div className={styles.statsAlone} >
                                <label className={styles.label} style={{marginLeft:"0.25vw", marginRight:"-0.25vw"}} htmlFor="">Name</label>
                                <input className={styles.stringInput} spellcheck="false" type="text" name="name" autoComplete="off" value={pokemon.name} onChange={onInputChange}/>        
                            </div>
                            
                            <div className={styles.statsPair}>
                                <div className = {styles.statsSingle}>
                                    <label className={styles.label} htmlFor="">Weight</label>
                                    <input className={styles.numberedInput}type="number" name="weight" value={pokemon.weight} onChange={onInputChange}/>                    
                                </div>
                                <div className = {styles.statsSingle}>
                                    <label className={styles.label} htmlFor="">Height</label>
                                    <input className={styles.numberedInput} type="number" name="height" value={pokemon.height} onChange={onInputChange}/>
                                </div>
                            </div>

                            <div className={styles.statsPair}> 
                                <div className = {styles.statsSingle}>
                                    <label className={styles.label} htmlFor="">HP</label>
                                    <input className={styles.numberedInput} type="number" name="hp" value={pokemon.hp} onChange={onInputChange}/>       
                                </div>
                                <div className = {styles.statsSingle}>
                                    <label className={styles.label} htmlFor="">Speed</label>
                                    <input className={styles.numberedInput} type="number" name="speed" value={pokemon.speed} onChange={onInputChange}/>
                                </div>
                            </div>

                            <div className={styles.statsPair}>
                                <div className = {styles.statsSingle}>
                                    <label className={styles.label} htmlFor="">Attack</label>
                                    <input className={styles.numberedInput} type="number" name="attack" value={pokemon.attack} onChange={onInputChange}/>
                                </div>
                                <div className = {styles.statsSingle}>
                                    <label className={styles.label} htmlFor="">Defense</label>
                                    <input className={styles.numberedInput} type="number" name="defense" value={pokemon.defense} onChange={onInputChange}/>
                                </div>
                            </div>

                            <div className={styles.statsAlone}>
                                <label className={styles.label} style={{marginLeft:"0.25vw", marginRight:"-0.25vw"}} htmlFor="">Image</label>
                                <input className={styles.stringInput}autoComplete="off" spellcheck="false" type="text" name="img" value={pokemon.img} onChange={onInputChange}/>
                            </div>
                        </div>
                        {
                            pokemon.img ? <div className={styles.pokeImg}style={{backgroundImage:`url(${pokemon.img})`}}></div> :null                        
                        }
                        <textarea className={styles.descriptionInput } spellcheck="false" name="description" onBlur={onInputChange}>Description...</textarea>
                        
                        <div className={styles.types}>
                            {
                                types.map(types =>{
                                    return (
                                        <button className={styles.typeButton} type="button" style={{backgroundImage:`url(${typesImg[types.name]})`, backgroundSize:"100% 100%", filter:`grayscale(${grayscales[types.name]})`}}onClick={() => typeHandler(types.name)}></button>
                                        )
                                    })
                                }
                        </div>

                        <button className={styles.resetButton} onClick={()=> resetButt()} type="reset">Reset</button>
                        <button className={styles.createButton} type="submit">Create</button>
                    
                    </div>
                    <div className={styles.eveeGif2}style ={{backgroundImage:`url(${eveelife})`}}></div>
    

                </div>
            </form>
        </div>
    )
}