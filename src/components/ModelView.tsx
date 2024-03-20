import { View, PerspectiveCamera, OrbitControls } from '@react-three/drei'

import * as THREE from 'three'
import Lights from './Lights'
import Loader from './Loader'
import IPhone from './IPhone'
import { Suspense } from 'react'

type ModelProps = {
  index: number
  groupRef: React.Ref<THREE.Group<THREE.Object3DEventMap>> | undefined
  gsapType: string
  controlRef: any
  setRotationState: React.Dispatch<React.SetStateAction<boolean>>
  size: string
  item: string
}

const ModelView = ({
  index, groupRef, gsapType, controlRef, setRotationState, size, item
}: ModelProps) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
    >
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef?.current?.getAzimuthalAngle())}
      />

      <group ref={groupRef} name={`${index === 1 ? 'small' : 'large'}`} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <IPhone scale={index === 1 ? [15, 15, 15] : [17, 17, 17]} size={size} item={item} />
        </Suspense>
      </group>
    </View>
  )
}

export default ModelView
