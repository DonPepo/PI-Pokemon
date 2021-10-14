import React, {useEffect} from 'react'
import { Route, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllPokemon, getTypes } from './actions/index'
import './App.css';
import Landing from "./components/Landing/landing"
import Home from "./components/Home/home"
import Details from "./components/DetailedPokemon/details"
import Create from "./components/CreatePokemon/createPokemon"



function App() {

  
  const dispatch = useDispatch();
  useEffect(() => {
    const getStarted = async() =>{
      await dispatch(getTypes());
      dispatch(getAllPokemon())
    }
    getStarted()

  }, [dispatch])


  return (
    <BrowserRouter> 
      <Route exact path = '/' component ={Landing} />
      <Route exact path = '/home' component ={Home} />
      <Route exact path = '/create' component ={Create} />
      <Route exact path = '/pokemon/:id' component ={Details} />
    </BrowserRouter>
  );
}

export default App;
