"use client"

import { ICONS } from '@/app/assets/Assets'
import Image from 'next/image'
import React from 'react'

const Radio = ({label, isChecked}) => {

    const [checked, setChecked] = useState(isChecked)

    const handleOnclick = () => {
        console.log(checked)
        setChecked(!checked)
    }

  return (
    <div className='flex items-center gap-2'>
      <Image src={checked ? ICONS.arrowRight : ICONS.logoutIcon} alt='value' className='size-6' 
        onClick={handleOnclick}
      />
      <span>{label}</span>
    </div>
  )
}

export default Radio
