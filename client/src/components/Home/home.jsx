import React, { useState, useEffect, useRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import PokeCard from '../Cards/pokemon'
import {Link} from 'react-router-dom'
import eveeGif from '../../utils/eevee-evolution.gif'
import eevees from './utils/eevees';
import Nav from '../Nav/Nav'
import styles from './home.module.css';

import eeveeColors from './utils/eeveeColors'
import LoadingImg from '../../utils/LoadingEevee.gif'
import eeveeBg from './utils/eeveeBackground';
import pokeCard from '../../utils/pokecard.jpg'
import eeveeCard from './utils/eeveeCards';



export default function Home() {

    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [pokeSort, setPokeSort] = useState([])

    const [sort, setSort] = useState({})
    const [filters, setFilters] = useState([])
    const [origin, setOrigin] = useState("")
    let types = useSelector(state => state.types)
    types = types.slice(0,18)
    const [pag, setPag] = useState(0);
    const [background, setBackground] = useState("");
    const [nameColor, setNameColor] = useState("black");
    const [btnColor, setBtnColor] = useState("");
    const [card, setCard] = useState(pokeCard);

    let eeveeArray = [...Array(Math.ceil(9) ).keys()]

    
    useEffect(() => {
        const getPokemon = async() => {
            axios.get('http://localhost:3001/api/pokemon/all')
            .then(pokemons => pokemons.data.sort((a,b) => a.id - b.id < 0 ? -1 : 1))
            .then(poke =>{
                setPokemon([...poke])
                setPokeSort([...poke])

                setLoading(false);

            })          
        }
        getPokemon()

    },[])

    //Resetear el scroll del Div de cartas
    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView() 
    const handlePagClick = (e) => {
        executeScroll()
        setPag(e)
    }


//Reset de filters y sort
    const handleReset = () => {
        setPokeSort([...pokemon])
        setSort({})
        setFilters([])
        setSearchInput("")
        setPag(0)
    }
    

    
    const handleTypeFilter = (filter) => {
        let filtersAux = [...filters]

        if(filtersAux.includes(filter)) {
            let aux = filtersAux.indexOf(filter);
            filtersAux.splice(aux,1)
            setFilters([...filtersAux])

            if(filtersAux.length>0) {  
                setPokeSort([...filtersAux.reduce((acc,filter) => {
                    return acc.filter(el=> el.Types.map(el => el.name).includes(filter))
                },pokemon)])

            }
            else{
                setPokeSort([...pokemon])
            }
        }
        else{
            setFilters([...filters,filter])

            setPokeSort(prevState => {
                return prevState.filter(el=> el.Types.map(el => el.name).includes(filter))
            })
        }
        setPag(0)
    }


    const handleCreateFilter = (e) => {
        if(origin === e) {
            setOrigin("")
            if(filters.length>0){

                setPokeSort([...filters.reduce((acc,filter) => {
                    return acc.filter(el=> el.Types.map(el => el.name).includes(filter))
                },pokemon)])
            }
            else{

                setPokeSort([...pokemon])
            }
        }
        else{
            if(e === "original") {
                setPokeSort([...filters.reduce((acc,filter) => {
                    return acc.filter(el=> el.Types.map(el => el.name).includes(filter))
                },pokemon)])
                setPokeSort(prevState => prevState.filter(el => el.id < 152))
                setOrigin("original")
            }
            else{
                setPokeSort([...filters.reduce((acc,filter) => {
                    return acc.filter(el=> el.Types.map(el => el.name).includes(filter))
                },pokemon)])
                setPokeSort(prevState => prevState.filter(el => el.id > 151))
                setOrigin("created")
            }
        }
        setPag(0)
    }



//hacer un state del sort con propiedad booleana,  si es ese, cambia a false y hace reverse, si es false, se resetea el sort y el poke sort
    const handleSort = (sorted) => {
        if(sort.current === sorted) {
            if(sort.order === 2) {
                setPokeSort(prevState=> {
                    return [...prevState.sort((a,b) => a.id - b.id < 0 ? -1 : 1)]
                })
                setSort({})
            }
            else if (sort.order === 1) {
                setPokeSort(prevState=> {
                    return [...prevState.reverse()]
                })
                setSort({
                    current: sorted,
                    order: 2
                })
            }
            else{
                setPokeSort(prevState => {
                    return prevState.sort((a,b) => a[sorted] - b[sorted] > 1 ? 1 : -1)
                })
            }
        }
        else{
            setPokeSort(prevState => {
                return prevState.sort((a,b) => a[sorted] > b[sorted] ? 1 : -1)
            })
            setSort({
                current: sorted,
                order: 1
            })
        }
        setPag(0)
 
        }


        const [searchInput,setSearchInput] = useState("");
        const onSearch = (e) => {
            let auxPokemon = [...pokemon]
          if(Number(e)>0) {
            setPokeSort(auxPokemon.filter(el => el.id === Number(e)))
          }
          else{
            setPokeSort(auxPokemon.filter(el => el.name.includes(e.toLowerCase())))
          }
        }
        const onIdenticalSearch = async(name) => {
            await axios.get(`http://localhost:3001/api/pokemon?name=${name}`)
            .then(poke => setPokeSort([poke.data]))
        }
        const handleChange = (e) => {
            setSearchInput(e.target.value)
            onSearch(e.target.value)
            setPag(0)
            
        }
        const handleSubmit = (e) => { 
          e.preventDefault();
          setPokeSort([...pokemon])
          alert(searchInput)
          onIdenticalSearch(searchInput)
          setSearchInput("")
        };
        

            //Handlers de los temas de bgrnd y cartas
    const handleBgChange = (e) => {
        setBackground(eeveeBg[e])
        setBtnColor(eeveeColors[e])
    }
 
    const handleCardChange = (e) => {
        if(e === 1) {
            setNameColor("black")
        }
        else if(e === 2) {
            setNameColor("#FFD447")
        }
        else if(e === 6) {
            setNameColor("#33EEFF")
        }
        else{
            setNameColor(eeveeColors[e+1])
        }
        setCard(eeveeCard[e])
    }
    const handleBgReset = () => {
        setBackground("")
        setCard(pokeCard)
        setBtnColor("")
        setNameColor("black")
    }
    
    
    let sorts = ["id", "name", "height", "weight", "hp", "attack", "defense", "speed"]
    
    return (
        
        <div style={{height:'100%', overflow:"hidden"}}> 
        {loading? <div style={{backgroundImage:`url(${LoadingImg})`, position:"absolute", top:"7.5vh", width:"100vw", height:"92vh", zIndex:"4", backgroundColor:'white', backgroundRepeat:'no-repeat', backgroundSize:"contain", backgroundPosition:"center"}}></div> : null}
         <Nav/>
            <div style={{display: 'flex',height:'92.3vh'}}>
                <div  className={styles.gif}style={{backgroundImage: `url(${eveeGif})`}}></div>

                <div className={styles.bigDiv} style={{backgroundImage:`url(${background})`}}>
                    <div className={styles.header} ref={myRef}>
                        <div>
                            <form onSubmit= {handleSubmit}>
                                <div className = {styles.searcher}>
                                <input className = {styles.searchBar} type="text" value={searchInput} onChange={(e)=>handleChange(e)} placeholder="  Search Pokemon..."/>
                                </div>
                            </form>
                        </div>
                        <div className={styles.filters}> 
                            <div className = {styles.dropDownBtn}>
                                <button className={styles.filtersButtons} style={{backgroundColor:`${btnColor}`}}>Filters</button>
                                <div className={styles.dropDownFilters}>
                                    <div>
                                        <div className={styles.filterTitle}>Origin</div>
                                        <div className={styles.dropDownFiltersBtn} onClick={() => handleCreateFilter("original")}>Original</div>
                                        <div className={styles.dropDownFiltersBtn} onClick={() => handleCreateFilter("created")}>Created</div>
                                    </div>
                                    <div>
                                        <div className={styles.filterTitle}>Types</div>
                                        {
                                            types.map(el => (<div className={styles.dropDownFiltersBtn} onClick={()=> handleTypeFilter(el.name)}>{el.name}</div>))
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className = {styles.dropDownBtn}>
                                <button className={styles.filtersButtons} onClick ={() => handleSort("hp")} style={{backgroundColor:`${btnColor}`}}>Sort</button>
                                <div className={styles.dropDownFilters}>
                                    <div>
                                        <div className={styles.filterTitle}>By</div>
                                        {
                                            sorts.map(el => (<div className={styles.dropDownFiltersBtn} onClick={()=> handleSort(el)}>{el}</div>))
                                        }
                                    </div>
                                </div>
                            </div>
                            <button className={styles.filtersButtons} onClick={() => handleReset()} style={{backgroundColor:`${btnColor}`}}>Reset</button>
                        </div>
                        <div  className={styles.filters}>
                            <div className = {styles.dropDownBtn}>
                                <button  className={styles.filtersButtons} style={{backgroundColor:`${btnColor}`}}>Bg</button>
                                <div className={styles.eeveeFilters}>
                                    {
                                        eeveeArray.map((el,i) => (<div className={styles.eevees} style={{backgroundImage:`url(${eevees[i]})`}} onClick={() => handleBgChange(i)}></div>))
                                    }
                                </div>
                            </div>
                            <div className = {styles.dropDownBtn}>
                                <button  className={styles.filtersButtons} style={{backgroundColor:`${btnColor}`}}>Cards</button>
                                <div className={styles.eeveeFilters}>
                                    {
                                        eeveeArray.slice(1).map((el,i) => (<div className={styles.eevees} style={{backgroundImage:`url(${eevees[i+1]})`}} onClick={() => handleCardChange(i)}></div>))
                                    }
                                </div>
                            </div>
                            <div>
                                <button className={styles.filtersButtons} onClick={() => handleBgReset()} style={{backgroundColor:`${btnColor}`}}>Reset</button>

                            </div>

                        </div>

                    </div>



                    <div className={styles.cards} >
                        {
                            pokeSort.slice(12*pag, 12*pag+12).map(poke => { 
                                return <div style={{width: '23vw', height: '54.5vh', position:'relative', display: 'flex', justifyContent: 'center'}}>
                                    <Link to ={`/pokemon/${poke.id}`} style={{width:'14vw',height:'85%',display: 'flex', justifyContent: 'center',textDecoration: 'none', color:`${nameColor}`,position:"relative", backgroundImage:`url(${card})`, backgroundSize:"cover", backgroundPosition:"bottom center"}}>
                                        <PokeCard id={poke.id} name={poke.name} img={poke.img} gif={poke.gif}/>
                                    </Link> 
                                </div>
                            })
                        }
                    </div>
                    <div className={styles.pagination}>
                        {
                           [...Array(Math.ceil(pokeSort.length/12) ).keys()].map(el=> {
                               return <button className={styles.pagButton} style={{backgroundColor:`${btnColor}`}} onClick={() => handlePagClick(el)}>{el+1}</button>
                           }) 
                        }
                    </div>
                </div>
                <div className={styles.gif} style={{backgroundImage: `url(${eveeGif})`}}></div>

            </div>
        </div>
    )
}