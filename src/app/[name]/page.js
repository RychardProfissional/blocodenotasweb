'use server'
import { destroyCookie, parseCookies } from "nookies"
import Logged from "./logged"
import NotLoggedIn from "./notloggedIn"
import { redirect } from "next/navigation"

export default async function Page({ params }) {
  const urlName = params.name
  const cookies = await parseCookies('/')
  console.log(cookies)
  const [name, password] = [cookies['INPUT_NAME'], cookies['INPUT_PASSWORD']]
  var login = false
  console.log(name)
  console.log(password)

  if(name && password){    
    const queryApi = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        password: password, 
      })
    }
    try{
      const res = await (await fetch(`${process.env.URL_ROUTE_BASE}/api/user/check`, queryApi)).json().ok
      
      if(res) login = true
      else {
        // destroyCookie('INPUT_NAME')
        // destroyCookie('INPUT_PASSWORD')
      }
    }
    catch(err){
      console.log(err)
    }
  }
  
  return login? <Logged name={urlName} />: <NotLoggedIn name={urlName} />
}