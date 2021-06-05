let userInput;
let button = document.getElementById("button");

const load = document.querySelector('.spinner')
spinner.classList.add('d-none')
const error = document.querySelector('.errormsg')
error.classList.add('d-none')
const input = document.querySelector('#userInput')
const sortBy= document.getElementById("sortBy");

let GITHUB_URL = "http://localhost:5050/fibonacci/";
let GITHUB_URL_Result = "http://localhost:5050/getFibonacciResults";

async function fibonacci() {

   let ans = await fetch(GITHUB_URL + userInput)
      .then(response => {
         if (!response.ok) {
            throw Error(response.statusText);
         }
         return response.json();
      }).then(data => {
         return data.result;
      }).catch((error) => {

      });
   spinner.classList.remove('d-none')
   return ans;

}

function fibonacciItr() {
   var text = document.getElementById("compout");
   function fibonacciLocal(userInput) {
      var i;
      var fib = [];

      fib[0] = 0;
      fib[1] = 1;
      for (i = 2; i <= userInput; i++) {
         fib[i] = fib[i - 2] + fib[i - 1];

      }
      return fib[userInput]
   }

   compout.innerHTML = fibonacciLocal(userInput);

}

function fibonacciServer() {

   let input = document.querySelector('#userInput')
   if (userInput == 42) {

      compout.classList.add('d-none')
      error.classList.remove('d-none')
      error.innerHTML = "42 is the meaning of life"

      input.style.border = '1px solid #D9534F'
      input.style.color = 'red'
   }

   else if (userInput > 50) {
      compout.classList.add('d-none')
      error.classList.remove('d-none')
      error.innerHTML = "number can't be bigger than 50"

      input.style.border = '1px solid #D9534F'
      input.style.color = 'red'

   }
   else if (userInput < 1) {
      compout.classList.add('d-none')
      error.classList.remove('d-none')
      error.innerHTML = "number can't be smaller than 1"

      input.style.border = '1px solid #D9534F'
      input.style.color = 'red'
   }

   else {
      compout.classList.add('d-none')

      setTimeout(() => {

         spinner.classList.add('d-none')
         compout.classList.remove('d-none')

      }, 5000);
      fibonacci().then(data => document.querySelector("#compout").innerHTML = data);

      fibonacciResult();
   }
}


function fibonacciResult() {
   fetch(GITHUB_URL_Result)
      .then(response => {
         response.json().then(data => {
            let results = document.getElementById('results')

            results.innerHTML=""
            for (let i = 0; i < 3; i++) {
               const li = document.createElement('div')
               let d = new Date(data.results[i].createdDate)
               
               if (sortBy.value==0) {

                   const sortedList = data.results.sort((a, b) => b.createdDate - a.createdDate)
                   
               }
               else if (sortBy.value==1) {
                 
                   const sortedList = data.results.sort((a, b) => a.number - b.number)
                   

               }
               else if (sortBy.value==2) {

                   const sortedList = data.results.sort((a, b) => b.number - a.number)

               }
               else if (sortBy.value==3) {

                   const sortedList = data.results.sort((a, b) => a.createdDate - b.createdDate)

               }
               else if (sortBy.value==4) {

                   const sortedList = data.results.sort((a, b) => b.createdDate - a.createdDate)

               }

               

               li.innerHTML = `The Fibonacci of  <b> ${data.results[i].number} </b>  is  <b> ${data.results[i].result} </b>   calculated at:  ${d}`;

               results.appendChild(li);
               li.classList.add('borderStyle')
            }
         })
      })
}

function disp() {
   saveCheck = document.getElementById("save")

   if (saveCheck.checked == true) {
      fibonacciServer(userInput)
   }
   else {

      fibonacciItr(userInput);
   }
}



function getUserInput() {

   userInput = document.getElementById("userInput").value;
}
function btnClick() {
   document.getElementById("compout").innerHTML = "";
   getUserInput();
   disp();
}

button.addEventListener('click', btnClick);
