import { useState } from 'react'
import { useEffect } from 'react'

import { HeartIcon } from '@heroicons/react/outline'
import axios from 'axios'

function TweetForm(){

    const MAX_TWEET_CHAR = 140
    const [text, setText] = useState('')

    function changeText(e){
      setText(e.target.value)
    }

  return(
    <div className="border-b border-brandColors-silver p-4 space-y-6">
      <div className='flex space-x-5'>
        <img src="/src/icon-user.png" className='w-7'/>
        <h1 className="font-bold text-xl">Página inicial</h1>
      </div>

      <form className='pl-12 text-lg flex flex-col'>
        <textarea 
          value={text}
          name="text" 
          className='bg-transparent outline-none disabled:opacity-50'
          placeholder="O que está acontecendo?"
          onChange={changeText}
        />
        <div className='flex justify-end items-center space-x-2'>
          <span className='text-sm'>
            <span>{text.length}</span> / <span className="text-brandColors-birdBlue">{MAX_TWEET_CHAR}</span>
          </span>
          <button className="bg-brandColors-birdBlue px-5 py-2 rounded-full disabled:opacity-50" disabled={text.length > MAX_TWEET_CHAR}>
            Tweet
          </button>
        </div>
      </form>
    </div>
  )
}

function Tweet({name, userName, avatar, children}){
  return(
    <div className="flex space-x-3 p-4 border-b border-brandColors-silver">
            <div>
                <img src={avatar}/>
            </div>
            <div className="-space-y-1">
                <span className="font-bold text-sm">{name}</span>{' '}
                <span className="text-sn text-brandColors-silver">{userName}</span>
                <p>{children}</p> 
                <div className="flex space-x-1 text-brandColors-silver text-sm items-center">
                  <HeartIcon className="w-6 stroke-1"/>
                  <span>1.2k</span>
                </div>
            </div>
    </div>
  )
}

export const Home = ({loggedInUser}) =>{
  const [data, setData] = useState([])

  async function getData(){
    const res = await axios.get('http://localhost:9901/tweets', {
      headers: {
        'authorization':`Bearer ${loggedInUser.accessToken}`
      }
    })
    console.log("!!!! "+res)

    setData(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return(
    <>
      <TweetForm/>
      <div>
        {data.length && data.map(tweet => (
          <Tweet key={tweet.id} name={tweet.user.name} userName={tweet.user.userName} avatar="/src/icon-user.png">
            {tweet.text}
          </Tweet>
        ))}
      </div>
    </>
  )
}
