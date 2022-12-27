import React from 'react'
import makeBlockie from 'ethereum-blockies-base64'
import Image from 'next/image'

export default function Avatar({ size = 24, address = '0x0' }) {
  return (
    <Image
      src={makeBlockie(address)}
      alt="Blockie"
      width={size}
      height={size}
      className="inline-block rounded-full"
      unoptimized
    />
  )
}
