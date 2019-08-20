function input(text){
    console.log('input_text is this', text)
    axios({
        method: 'post',
        url: 'http://localhost:2019/postdata',
        data: { data: text }
    })
    .then(() => {
        location.reload()
    })
}

function delete_data(id){
    console.log('deleteID is this', id)
    let data = { data: id }
    axios({
        method: 'delete',
        url: 'http://localhost:2019/deletedata',
        data
    })
    .then(() => {
        location.reload()
    })
}

// function add_rows(data){
//     for(let i = 0; i< data.length; i++){
//         $('#result_data > tbody:last').append(`<tr><td>${i+1}</td><td>${data[i].data}</td><td><button>삭제</button></td></tr>`)
//     }
// }

// function deleteData(button){
//     console.log('button', button)
//     button.parents('tr').remove()
// }

$('.deleteData').click(function(){
   let deleteID = $(this).parent().parent().find('td').eq(0).html()
   console.log('delete id ', deleteID)
   delete_data(deleteID)
})

$('#input_data').click(function(){
    let input_text = $('#input_text').val()
    if(input_text){
        input(input_text);
    }
    else alert('값을 입력해주세요.')
})
