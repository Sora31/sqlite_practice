const input = function input(){
    axios({
        url: 'http://192.168.0.17:2019/postdata',
        method: 'post',
        data: {
            data: 'hello'
        }
    })
    .then(() => {
        console.log('world')
    })
    .error(err => {
        console.error('axios error', err)
    })
}

document.getElementById('input_data').onclick = function(){
    input();
}


module.exports = input