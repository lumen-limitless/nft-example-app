'use client';

import Model from '@/components/model';
import { Sale } from '@/components/sale';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

type PageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({}: PageProps) {
  return (
    <>
      <section id="mint" className="overflow-x-clip py-12">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12 flex items-center justify-start md:col-span-6">
              <Sale />
            </div>

            <div className="md:h-144 relative order-first col-span-12 h-80 sm:h-96 md:order-last md:col-span-6">
              <div className="absolute -right-10 -top-5 h-[500px] w-[500px] bg-gradient-radial from-blue-500/20 to-transparent blur-3xl" />
              <div className="absolute -bottom-5 -left-10 h-[500px] w-[500px] bg-gradient-radial from-purple-500/20 to-transparent blur-3xl" />
              <Canvas>
                <ambientLight intensity={1.0} />
                <spotLight intensity={25} position={[0, 33, 33]} />
                <Suspense>
                  <Model />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
