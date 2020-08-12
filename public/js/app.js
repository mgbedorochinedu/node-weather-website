console.log("JavaScript is loaded")

const weatherForm =  document.querySelector("form") 
const search = document.querySelector("input") 

const messageOne = document.querySelector("#message-1") //we selected first paragraph by id of "#message-1"
const messageTwo =  document.querySelector("#message-2") //we selected second paragraph by id of "#message-2"

weatherForm.addEventListener("submit", (e) => { 
        e.preventDefault() 
      const location = search.value  
      messageOne.textContent = "Loading..." //(messageOne must be here. We gave it a textContent "loading..." because
                                          // it will first show when our user submit the form before it then fetch the forecast.)
      messageTwo.textContent = "" //(we leave messageTwo textContent to an empty string, in other to clear any value that has existed
                              //from a previous search.)

 fetch("http://localhost:3000/weather?address=" + location).then( (response) => { 
   response.json().then( (data) => {
    if(data.error){
    messageOne.textContent = data.error //(if there is an error, we want to render the error using textContent instead of console.log) 
    } else{
       messageOne.textContent = data.location //(if everything went well and there was no error,
       messageTwo.textContent = data.forecast // we want to get the "location" and "forecast" rendered on our web page)
      }
   })
})
})

