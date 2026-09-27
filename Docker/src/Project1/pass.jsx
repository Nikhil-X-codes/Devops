import React, {
  useState,
  useCallback,
  useEffect,
  useRef
} from 'react'

function Pass() {

  const [len, setlength] = useState(8)
  const [numallow, setnumallow] = useState(false)
  const [charallow, setcharallow] = useState(false)
  const [pass, setpass] = useState('')

  
  const passwordRef = useRef(null)


  // useCallback → memoizes the password generation function
  const passwordgenerator = useCallback(() => {

    let password = ''

    let string =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let number = '0123456789'
    let specialchar = '!@#$%^&*()_+'

    if (numallow) {
      string += number
    }

    if (charallow) {
      string += specialchar
    }

    for (let i = 0; i < len; i++) {
      let index = Math.floor(Math.random() * string.length)
      password += string[index]
    }

    setpass(password)

  }, [len, numallow, charallow])


  useEffect(() => {
    passwordgenerator()
  }, [passwordgenerator])


//  useref persist the values betweeen renders and prevents unncessary re renders
  const copyPassword = () => {

    passwordRef.current.select()

    navigator.clipboard.writeText(passwordRef.current.value)
  }


  return (
    <div>

      <h1>Password Generators</h1>


      {/* Password Input */}
      <input
        ref={passwordRef}
        type="text"
        value={pass}
        readOnly
      />

      <button onClick={copyPassword}>
        Copy
      </button>


      {/* Length */}
      <div>

        <label>
          Length: {len}
        </label>

        <input
          type="range"
          min="4"
          max="40"
          value={len}
          onChange={(e) => setlength(Number(e.target.value))}
        />

      </div>


      {/* Numbers */}
      <div>

        <input
          type="checkbox"
          checked={numallow}
          onChange={(e) => setnumallow(e.target.checked)}
        />

        <label>
          Include Numbers
        </label>

      </div>


      {/* Special Characters */}
      <div>

        <input
          type="checkbox"
          checked={charallow}
          onChange={(e) => setcharallow(e.target.checked)}
        />

        <label>
          Include Special Characters
        </label>

      </div>


      {/* Generate */}
      <button onClick={passwordgenerator}>
        Generate Password
      </button>

    </div>
  )
}

export default Pass
