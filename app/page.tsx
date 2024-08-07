'use client';

import Model from '@/components/model';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

type PageProps = {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
};

const Sale = dynamic(
  () => import('@/components/sale').then((mod) => mod.Sale),
  {
    ssr: false,
  },
);

export default function Page({}: PageProps) {
  return (
    <>
      <section id="mint" className="overflow-x-clip py-12">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12 flex items-center justify-start md:col-span-6">
              <Sale />
            </div>

            <div className="md:h-144 relative -z-[1] order-first col-span-12 h-80 sm:h-96 md:order-last md:col-span-6">
              <div className="pointer-events-none absolute -right-10 -top-5 h-[500px] w-[500px] bg-gradient-radial from-blue-500/20 to-transparent blur-3xl" />
              <div className="pointer-events-none absolute -bottom-5 -left-10 -z-[1] h-[500px] w-[500px] bg-gradient-radial from-purple-500/20 to-transparent blur-3xl" />
              <Canvas>
                <spotLight
                  intensity={500}
                  position={[0, 10, 10]}
                  castShadow={true}
                />
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
