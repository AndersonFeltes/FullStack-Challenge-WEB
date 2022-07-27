import { useState } from 'react'

import { Home } from './Home/index'
import { Login } from './Login'
import { Signup } from './Signup'

export function App(){
    const [user, setUser] = useState()
    /* 
    if(user == null){
        return window.location.pathname === '/signup'
        ? <Signup singnUser = {setUser} />
        : <Login singnUser = {setUser} />
        
    }else{
        return <Home/>
    }
    */
      
    
    //return <Login/>

    
    if(user){
        return <Home />
    }
    
    return window.location.pathname === '/signup'
        ? <Signup singnUser = {setUser} />
        : <Login singnUser = {setUser} />
    
}