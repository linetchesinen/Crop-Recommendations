import { useState } from "react"

export default function FarmerChatbot(){

const [message,setMessage] = useState("")
const [chat,setChat] = useState([])

const sendMessage = async ()=>{

if(!message) return

// show user message
setChat(prev => [...prev,{user:message}])

try{

const res = await fetch("http://localhost:5000/api/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message})
})

const data = await res.json()

setChat(prev => [
...prev,
{bot:data.reply}
])

}catch(err){
console.error(err)
}

setMessage("")

}

return(

<div className="p-6">

<h2 className="text-xl font-bold">
Farmer Chatbot
</h2>

<div className="border p-4 h-60 overflow-y-scroll">

{chat.map((c,i)=>(
<div key={i}>
{c.user && <p><b>You:</b> {c.user}</p>}
{c.bot && <p><b>Bot:</b> {c.bot}</p>}
</div>
))}

</div>

<input
value={message}
onChange={(e)=>setMessage(e.target.value)}
placeholder="Ask about crops..."
className="border p-2 w-full"
/>

<button
onClick={sendMessage}
className="bg-green-500 text-white px-4 py-2 mt-2"
>
Send
</button>

</div>

)
}