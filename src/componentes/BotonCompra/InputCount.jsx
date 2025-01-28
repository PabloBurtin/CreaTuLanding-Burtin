import React from 'react'
import { useState } from 'react';

const InputCount = ({onConfirm, maxQuantity}) => {
    const [value, setValue] = useState(0)

    const handleChange = (e) => {
        const inputValue = parseInt (e.target.value);
        setValue (inputValue > maxQuantity ? maxQuantity : inputValue);
    }

    const handleClick = ()=>{
        onConfirm(value)
    }

  return (
    <>
    <input type="number"
    max={maxQuantity}
    min={0}
    value={value}
    onChange={handleChange}/>
    <input type="button" value="ADD" onClick={handleClick} />
    </>
  )
}

export default InputCount