import * as THREE from 'three';
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';

import { a, useSpring } from 'react-spring/three';
import { Html, Stars, OrbitControls } from '@react-three/drei';
import Text from '../components/Text';
import Loader from 'react-loader-spinner';
import {
  EffectComposer,
  Bloom,
  SSAO,
  Noise,
  DepthOfField,
  Vignette,
} from '@react-three/postprocessing';

const state = {
  top: 0,
  pages: 2,
};

function Grid() {
  const group = useRef();
  const vec = new THREE.Vector3();
  useFrame(() => group.current.position.lerp(vec.set(0, state.top, 0), 0.1));
  useFrame(
    ({ clock }) =>
      (group.current.rotation.x = group.current.rotation.y =
        Math.sin(clock.getElapsedTime()) * 0.2)
  );

  return (
    <group ref={group} rotation={[0, 0, 0.3]}>
      <Text size={18} position={[0, 45, 0]}>
        Lashaunna
      </Text>
      <Text size={10} position={[0, 0, 0]}>
        Is The Coolest
      </Text>
      <Text size={10} position={[0, -35, 0]}>
        Girl You Know
      </Text>
    </group>
  );
}

export default function App() {
  return (
    <>
      <Canvas shadowMap camera={{ position: [0, 70, 200] }}>
        <fog attach="fog" args={['#E6E6FA', 10, 80]} />
        <ambientLight intensity={0.8} />
        <OrbitControls enableZoom={false} />
        <Suspense
          fallback={
            <Html center style={{ color: 'snow' }}>
              <Loader type="Triangle" color="#FFF" height={100} width={100} />
            </Html>
          }
        >
          <Grid />
        </Suspense>
        <Stars count={10000} />
        <EffectComposer>
          <SSAO />
          <Bloom luminanceThreshold={0.6} />
          <DepthOfField focusDistance={0} focalLength={1} height={720} />
          <Noise opacity={0.025} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </>
  );
}
