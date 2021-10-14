import axios from "axios"



export const getAllPokemon = () => {
    return (dispatch)=>{
        return axios.get('http://localhost:3001/api/pokemon/all')
        .then(pokemon =>{
            dispatch ({
                type: "getAllPokemon",
                payload: pokemon.data.sort((a,b) => a.id - b.id < 0 ? -1 : 1)
            })
        })
    }
    
};

export const getTypes = () => {
    return (dispatch)=>{
        return axios.get('http://localhost:3001/api/types')
        .then(types =>{
            dispatch ({
                type: "getTypes",
                payload: types.data
            })
        })
    }
    
};



export const addPokemon = (el) => {
    return {
        type: "AddPokemon",
        payload: {
            ...el
        }
    }
};



export const removePokemon = (el) => {
    return{
        type:"RemovePokemon",
        payload: el
        }
    };



/* export const addItem = (id, n) => {
    return {
        type: "AddItem",
        payload: {
            quantity: n,
            id: id
        }
    }
};


export const removeItem = (id, n) => {
    return {
        type: "RemoveItem",
        payload: {
            quantity: n,
            id: id
        }
    }
}; */

    
export const removePoints = (n) => {
    return {
        type: "RemovePoints",
        payload: n,
    }
};


export const addPoints = (n) => {
    return {
        type: "AddPoints",
        payload: n,
    }
};



/* export const addMyPokemon = (el) => {
    return {
        type: "AddMyPokemon",
        payload: {
            ...el,
        }
    }
};

export const lvlMyPokemon = (id,n) => {
    return {
        type: "LvlMyPokemon",
        payload: {
            quantity: n,
            id: id
        }
    }
};

export const EvolveMyPokemon = (id, el) => {
    return {
        type: "EvolveMyPokemon",
        payload: {
            id: id,
            info: {
                ...el,
            }
        }
    }
};




export const removeMyPokemon = (id) => {
    return {
        type: "RemoveMyPokemon",
        payload: id
    }
}; */