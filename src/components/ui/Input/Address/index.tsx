import cn from 'clsx'
import React from 'react'

export const Input = React.memo(
  ({
    value,
    onUserInput,
    placeholder = 'Address',
    className,
    ...rest
  }: {
    value: string
    onUserInput: (input: string) => void
    error?: boolean
    fontSize?: string
  } & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) => {
    return (
      <>
        <div className="relative flex w-full items-center justify-center">
          <input
            value={value}
            onChange={(event) => {
              onUserInput(event.target.value)
            }}
            // universal input options
            inputMode="text"
            title="Address"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder={placeholder}
            pattern="^(0x[a-fA-F0-9]{40})$"
            // text-specific options
            type="text"
            className={cn(
              'focus:border-ascend-purple focus:ring-ascend-purple relative block w-full rounded-md border-gray-500 bg-transparent shadow-sm hover:border-gray-400 sm:text-sm',
              className
            )}
            {...rest}
          />
          {value !== '' && (
            <button
              onClick={() => onUserInput('')}
              className="absolute right-3 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8L4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          )}
        </div>
      </>
    )
  }
)

Input.displayName = 'Address'

export default Input
