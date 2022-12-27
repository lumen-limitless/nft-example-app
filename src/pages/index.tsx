import type { NextPage } from 'next'
import { Suspense } from 'react'
import { NextSeo } from 'next-seo'
import { Canvas } from '@react-three/fiber'
import Model from '../components/Model'
import Sale from '../components/Sale'
import Section from '../components/ui/Section'
import Container from '../components/ui/Container'
import Grid from '../components/ui/Grid'
import Spinner from '../components/ui/Spinner'

const MintPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Mint" description="Mint your NFT" />
      <Section id="mint" className="py-12">
        <Container>
          <Grid>
            <div className="col-span-12 flex items-center justify-start md:col-span-6">
              <Sale />
            </div>

            <div className=" md:h-144 relative order-first col-span-12 h-80 sm:h-96 md:order-last md:col-span-6 ">
              <div className=" bg-gradient-radial from-blue/10 absolute  -top-10 -right-10 h-[500px]  w-[500px] to-transparent blur-3xl" />
              <div className=" bg-gradient-radial from-pink/10 absolute  -bottom-10 -left-10 h-[500px]  w-[500px] to-transparent blur-3xl" />
              <Canvas>
                <ambientLight intensity={0.1} />
                <spotLight color={[5, 255, 255]} intensity={5} />
                <Suspense>
                  <Model />
                </Suspense>
              </Canvas>
            </div>
          </Grid>
        </Container>
      </Section>
    </>
  )
}

export default MintPage
