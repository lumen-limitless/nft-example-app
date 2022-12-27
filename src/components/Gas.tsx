import { useGasPrice } from '@usedapp/core'
import { formatUnits } from 'ethers/lib/utils'
import React from 'react'
import cn from 'clsx'
import Spinner from './ui/Spinner'
interface Props {
  className?: string
}

export default function Gas({ className }: Props) {
  const gasPrice = useGasPrice()
  return (
    <div className={cn(' flex items-center justify-center gap-1', className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="M8 10h7v2H8z" />
        <path
          fill="currentColor"
          d="m28.414 8l-5-5L22 4.414l3 3V12a2.002 2.002 0 0 0 2 2v10.5a1.5 1.5 0 0 1-3 0V16a1 1 0 0 0-1-1h-4V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v21H2v2h19v-2h-2v-9h3v7.4a3.564 3.564 0 0 0 2.765 3.525A3.506 3.506 0 0 0 29 24.5V9.414A2 2 0 0 0 28.414 8ZM17 26H6V6h11Z"
        />
      </svg>
      <span>{gasPrice ? formatUnits(gasPrice, 'gwei') : <Spinner />}</span>
    </div>
  )
}
