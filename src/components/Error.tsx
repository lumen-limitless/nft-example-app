import Section from './ui/Section'

export default function Error({ message }: { message: string }) {
  return (
    <Section fullscreen>
      {' '}
      <div className="flex flex-col items-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width={256}
          height={256}
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 48 48"
          className="text-yellow animate-pulse fill-current stroke-current"
        >
          <mask id="svgIDa">
            <g fill="none" strokeWidth="4">
              <path
                fillRule="evenodd"
                strokeLinejoin="round"
                d="M24 5L2 43h44L24 5Z"
                clipRule="evenodd"
              />
              <path strokeLinecap="round" d="M24 35v1m0-17l.008 10" />
            </g>
          </mask>
          <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#svgIDa)" />
        </svg>
        <h1>{message}</h1>
      </div>
    </Section>
  )
}
