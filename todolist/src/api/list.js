import Axios from 'axios'

const url = 'http://localhost:2019/todolist'
  
export const readList = () => {
    return Axios.get(url)
    .then((res) => {
      console.log(res)     
      return Promise.resolve(res.data)
    })
}

export const createList = (data) => {
    return Axios.post(url, data)
    .then((res) => {
        console.log(res)
        return Promise.resolve(res.data)
    })
}

export const deleteList = (id) => {
    return Axios.delete(url, {data: { id }})
    .then(res => {
        console.log(res)
        return Promise.resolve(res.data)
    })
}

export const updateList = (data) => {
    return Axios.put(url, data)
    .then(res => {
        console.log(res)
        return Promise.resolve(res.data)
    })
}