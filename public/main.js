// var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
// var thumbDown = document.getElementsByClassName("fa-thumbs-down")
let result = document.getElementsByClassName("result")

// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('messages', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('messagesAlt', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

//document.getElementById("calories").value =

// function findCalorieTotal(){
//   let arr = document.querySelectorAll('#calories')
//   let totalCalories = 0
//   for(let i = 0; i < arr.length; i++){
//     if (parseInt(arr[i].value)){
//       totalCalories += parseInt(arr[i].value)
//     }
//   }
//   document.getElementById('total').value = totalCalories
// }



Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const food = this.parentNode.parentNode.childNodes[1].innerText
        const calories = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'food': food,
            'calories': calories
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
