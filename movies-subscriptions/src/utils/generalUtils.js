// for different ports (servers)

import axios from 'axios';

const urlPrefix = "http://localhost:";

const getAll = (url) => axios.get(urlPrefix + url)

const getById = (url,id) => axios.get(`${urlPrefix}${url}/${id}`)

const addItem = (url,obj) => axios.post(urlPrefix + url,obj)

const updateItem = (url,id,obj) => axios.put(`${urlPrefix}${url}/${id}`,obj)

const deleteItem = (url,id) => axios.delete(urlPrefix + url + "/" + id)

export {getAll, getById, addItem, updateItem, deleteItem}
