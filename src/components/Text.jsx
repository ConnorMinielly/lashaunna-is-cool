import * as THREE from 'three';
import React, { useMemo } from 'react';
import { useLoader, useUpdate } from 'react-three-fiber';

export default function Text({
  children,
  vAlign = 'center',
  hAlign = 'center',
  size = 1,
  color = '#000000',
  ...props
}) {
  const font = useLoader(
    THREE.FontLoader,
    '/assets/suez-one-regular-limited.json'
  );
  const config = useMemo(
    () => ({
      font,
      size: 20,
      height: 80,
      curveSegments: 32,
      bevelEnabled: false,
    }),
    [font]
  );
  const mesh = useUpdate(
    (self) => {
      const size = new THREE.Vector3();
      self.geometry.computeBoundingBox();
      self.geometry.boundingBox.getSize(size);
      self.position.x =
        hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x;
      self.position.y =
        vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y;
    },
    [children]
  );
  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh} castShadow receiveShadow>
        <textGeometry attach="geometry" args={[children, config]} />
        <meshNormalMaterial attach="material" />
      </mesh>
    </group>
  );
}
