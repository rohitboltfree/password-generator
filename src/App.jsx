import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [color, setColor] = useState("white")
  const [length, setLength] = useState("8")
  const [specialCharacterAllowed, setSpecialCharacterAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed ] = useState(false)
  const [password, setPassword] = useState()

  const passwordRef = useRef(null)

  const generatePassword = useCallback( () => {
 
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    //used to add number and special character in string
    if(numberAllowed) str +="0123456789"
    if(specialCharacterAllowed) str +="!@#$%^&*-_+=[]{}~`"
    //used to generate random password
    for(let i=0; i<= length; i++){
      let char = Math.floor(Math.random()* str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  } , [length,specialCharacterAllowed,numberAllowed, setPassword ])

  //use effect for generate password
  useEffect(
    () => {
      generatePassword()
     }, 
    [length,specialCharacterAllowed,numberAllowed, setPassword ]   
  )

  const selectPassword = useCallback(
    () => {
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password)
    },[password]
  )

  return (
    <>
    <div className='flex flex-wrap justify-center  text-black p-5 rounded-xl'>

      

    <div 
        className= ' justify-center bg-green-200 text-black p-5 rounded-xl  my-5 mx-5'>
    
    <h2 className='bg-green-200 text-black text-center my-3'>BackgroundColor  changes</h2>
    <div className='flex  justify-center bg-grey-100 text-black p-10 rounded-xl'
          style={{backgroundColor: color}} >
     <button className='justify-center bg-red-100 text-black p-1  rounded-xl h-10 w-15 m-2'
      onClick={() => setColor("blue")}
      >blue</button>
    <button className=' justify-center bg-red-100 text-black p-1 rounded-xl h-10 w-15 m-2 ' 
      onClick={() => setColor("black")}>black </button>
    <button className=' justify-center bg-red-100 text-black p-1 rounded-xl h-10 w-15 m-2' 
          onClick={() => setColor("green")}>green </button> 
    </div>
    </div>
    
    <div className=' bg-blue-200 text-center  justify-center  text-black p-5 rounded-xl  my-5 mx-5'>
    <h4 className='text-black text-center my-3'>Password generator</h4>
    <div 
        className="text-white text-center flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button  
              className='bg-gray-300 py-4 rounded-s-none text-black'
              onClick={ () => {selectPassword()}}
        >copy</button>
    </div>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className="cursor-pointer  outline-none w-full py-1 px-3"
            placeholder="length"
           
            onChange={ (e) => { setLength(e.target.value) }}
        />
        <label> length {length}</label>
    </div>

    <div className='flex flex-text  '>
    <div>
        <input  
            type="checkbox"
            value={numberAllowed}
            placeholder='number'
            onChange={ () => {
              setNumberAllowed((prev) => !prev )
            }}      
      />
      <label> number </label>
    </div>
    <div>
    <input  
            type="checkbox"
            value={specialCharacterAllowed}
            placeholder='specialCharacter'
            onChange={ () => {
              setSpecialCharacterAllowed((prev) => !prev )
            }}      
      />
      <label> specialCharacter </label>
    </div>
    </div>
    
    </div>
    
    </div>
    </>
  )
}

export default App
