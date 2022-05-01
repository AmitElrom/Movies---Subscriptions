import { getItems, getItem, add, update, deletes } from "./inSiteUtils";

const api = "movies";

const getMovies = () => getItems(api)

const getMovie = (id) => getItem(api,id)

const addMovie = (obj) => add(api,obj)

const updateMovie = (id,obj) => update(api,id,obj)

const deleteMovie = (id) => deletes(api,id)

export {getMovies,getMovie,addMovie,updateMovie,deleteMovie}


