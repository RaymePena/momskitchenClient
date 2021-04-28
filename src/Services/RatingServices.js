import {http} from '../Services/HttpService'


export function createRating(rating){
    console.log(rating);
    return http().post('/rating', rating)
}

export function getRatingById(id){
    return http().get(`/rating/${id}`)
}
export function getAllRating(id){
    return http().get(`/rating/${id}`)
}

export function deleteRating(id){
    return http().delete(`/rating/:${id}`)
}

export function updateRating(id){
    return http().put( `/rating/:${id}`)
}

