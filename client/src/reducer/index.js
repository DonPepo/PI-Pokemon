const initialState = {
    allPokemon: [],
    types: [],
    points: 0,
};

//En nuestro estado guardaremos objetos con `todos`. Cada todo tendra: title, description, place, date, id y un status;
const todos = (state = initialState, action) => {
  switch(action.type) {
    // Aca va tu codigo;
    case "getAllPokemon":
      return {
          ...state,
          allPokemon: action.payload

      }
    case "getTypes":
      return {
          ...state,
          types: action.payload

      }
    case "RemoveTodo":
      return state.filter(el => el.id !== action.payload)

    default:
      return state
  }
}

export default todos;


    


    
    



