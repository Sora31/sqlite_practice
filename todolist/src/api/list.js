import Axios from 'axios'

const url = 'http://localhost:2019/todolist'
  
export const getList = () => {
    return Axios.get(url)
    .then((res) => {
      console.log(res)     
      return Promise.resolve(res.data)
    })
}

export const postList = (data) => {
    return Axios.post(url, data)
    .then((res) => {
        console.log(res)
        return Promise.resolve(res.data)
    })
}