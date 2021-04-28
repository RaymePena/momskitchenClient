import {http} from '../Services/HttpService'


export function createGrocery(item){
    // console.log(item);
    return http().post('/grocery', item)
}

export function getGroceryById(id){
    return http().get(`/grocery/${id}`)
}
export function getAllGrocery(){
    return http().get(`/grocery`)
}

export function deleteGrocery(id){
    return http().delete(`/grocery/${id}`)
}

export function updateItem(recipe) {
    return http().put("/grocery", recipe);
}

// export function updateRating(id){
//     return http().put( `/rating/:${id}`)
// }
