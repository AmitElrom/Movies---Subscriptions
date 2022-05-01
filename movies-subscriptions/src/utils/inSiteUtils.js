// for different routers

import {getAll, getById, addItem, updateItem, deleteItem} from "./generalUtils";

const port = "1938/";

const getItems = (urlEnding) => getAll(port + urlEnding)

const getItem = (urlEnding,id) => getById(port + urlEnding,id)

const add = (urlEnding,obj) => addItem(port + urlEnding,obj)

const update = (urlEnding,id,obj) => updateItem(port + urlEnding,id,obj)

const deletes = (urlEnding,id) => deleteItem(port + urlEnding,id)

export {getItems, getItem, add, update, deletes}