//Functions for routes

const axios = require("axios");
const { Pokemon, Type } = require("../../db")
let pokeAll = [];
let allPokemon;
let pokeType = {};
let poke12 = [];
let onePoke = []
let typesIndex = ["normal","fighting","flying","poison","ground","rock","bug","ghost","steel","fire","water","grass","electric","psychic","ice","dragon","dark","fairy","unknown","shadow"];





let pokeMaker = (el, arr) => {
        let {name, height, weight, stats, sprites, types } = el;
        
        pokeType[name] = types.length > 1 ? types.map( (el) => typesIndex.indexOf(el.type.name)+1) : [typesIndex.indexOf(types[0].type.name)+1];

        return (
            {
                name: name,
                height: height,
                weight: weight,
                hp: stats[0].base_stat,
                attack: stats[1].base_stat,
                defense: stats[2].base_stat,
                speed: stats[5].base_stat,
                img: sprites.versions["generation-v"]["black-white"].front_default,
                imgShiny: sprites.versions["generation-v"]["black-white"].front_shiny,
                gif: sprites.versions["generation-v"]["black-white"].animated.front_default ,
                gifShiny: sprites.versions["generation-v"]["black-white"].animated.front_shiny,
        })

        }



const getAllPokemon = async(req,res) => {
    try{
        allPokemon = await Pokemon.findAll({
            include: Type
        })
        if(allPokemon.length) {
            res.json(allPokemon)
        }
        else{

            await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=151")
            .then(async (res) => {
                /*                 for (let i of res.data.results) {
                    await axios.get(`${i.url}`)
                    .then(res => pokeMaker(res.data, pokeAll))
                    .then(async res => {
                        return await Pokemon.create(res)})
                        .then((pokemon) => pokemon.setTypes(pokeAll[pokeAll.length-1].type))
                        console.log(pokeAll[pokeAll.length-1])   
                    } */
                    
                    let promises = [];
                    for(let i of res.data.results) {
                        promises.push(axios.get(`${i.url}`).then(res => pokeMaker(res.data, pokeAll)))
                    }
                    await Promise.all(promises).then(el => Pokemon.bulkCreate(el)).then(pokemon => pokemon.map(el => el.setTypes(pokeType[el.name]))).then(res => Promise.all(res))
                    
                    
                    
                    /* .map(el => el.setTypes(pokeType[el.name]))).then(res => Promise.all(res)).then(el => console.log(el)) */
                    /*                 Pokemon.bulkCreate(pokeAll)
                    .then(()=> Pokemon.findAll())
                    .then(pokemons => pokemons.forEach(el => {
                        el.setTypes(el.types)
                    })) */
                })
                allPokemon = await Pokemon.findAll({
                    include: Type
                })
                res.json(allPokemon)
            }
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}
        
    

const getSomePokemon = async(req,res, next) => {
    try {
        onePoke = [];
        let pokeApi = []
        let pokeDB = []
        let { name } = req.query;
        if (name) {
            name = name.toLowerCase()            

            pokeDB = await Pokemon.findAll({
                where: {name: name},
                include: Type
            })
            res.json(pokeDB)
            }

        else{
            poke12 = []
            for(let i = 1; i <= 1; i++) {
                const pepe = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(res => pokeMaker(res.data, poke12))
                .then(async res => {
                    return await Pokemon.create(res)})
                .then((pokemon) => pokemon.setTypes(poke12[poke12.length-1].type))
            }

            res.status(200).send("se acabó la joda")
            }
            
        
    }
    catch (error) {
        res.status(500).send(error.message);
        }
}



const getOnePokemon = async(req,res) => {
    try {
        onePoke = [];
        let { idPokemon } = req.params;
        
        const onePokemon = await Pokemon.findAll({
            where: {id: idPokemon},
            include: Type
        })
        res.json(onePokemon)
        
    }
    catch (error) {
        res.status(500).send(error.message);
        }
}
    


const createPokemon = async(req,res) => {
    let {name, height, weight, hp, attack, defense, speed, description, img, types } = req.body;
    name = name.toLowerCase()
    try {
        await Pokemon.create({
            name,
            height,
            weight,
            hp,
            attack,
            defense,
            speed,
            description, 
            img,
            gif: img
        })
        .then((pokemon) => pokemon.setTypes(types.map(type => typesIndex.indexOf(type)+1)))
        res.json(types.map(type => typesIndex.indexOf(type)))  
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}



const getTypes = async(req,res) => {
    try{
        const allTypes = await Type.findAll()
        if(allTypes.length > 1) res.json(allTypes)
        else{
            await axios.get("https://pokeapi.co/api/v2/type/")
            .then( async (el) => {
                for (let i of el.data.results) {
                    let name = i.name
                    await Type.create({name})
                }
            })
            Type.findAll()
            .then(types => {
                res.json(types)
            })
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    getAllPokemon,
    getSomePokemon,
    getOnePokemon,
    createPokemon,
    getTypes,
}

    


    
