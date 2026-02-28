import React, { Suspense, useRef, Component, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

class ErrorBoundary extends Component {
    constructor(props) { super(props); this.state = { err: null }; }
    static getDerivedStateFromError(e) { return { err: String(e) }; }
    render() { if (this.state.err) return null; return this.props.children; }
}

const MODEL_PATH = '/cute robot 3d model.glb';
useGLTF.preload(MODEL_PATH);

/* ── Robot with original GLB textures ───────────────────────────── */
function Robot() {
    const { scene } = useGLTF(MODEL_PATH);
    const groupRef = useRef();

    // Enhance materials for a premium look
    useEffect(() => {
        if (!scene) return;
        scene.traverse((child) => {
            if (child.isMesh && child.material) {
                // Ensure materials react well to the HDR environment
                child.material.roughness = 0.15; // Make it glossy
                child.material.metalness = 0.2;  // Slight metallic sheen for plastic
                child.material.envMapIntensity = 1.5; // Boost reflections
                child.material.needsUpdate = true;
            }
        });
    }, [scene]);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const t = clock.elapsedTime;
        groupRef.current.position.y = 0.3 + Math.sin(t * 0.8) * 0.12;
        groupRef.current.rotation.y += 0.006;
    });

    return (
        <primitive
            ref={groupRef}
            object={scene}
            scale={2.2}
            position={[0, 0.3, 0]}
        />
    );
}

/* ── Canvas ──────────────────────────────────────────────────────── */
export default function RobotCanvas() {
    return (
        <ErrorBoundary>
            <div className="robot-canvas-container">
                <Canvas
                    camera={{ position: [0, 0.5, 5], fov: 40 }}
                    gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
                    style={{ background: 'transparent' }}
                >
                    <Suspense fallback={null}>
                        {/* High-quality HDR environment reflections */}
                        <Environment preset="city" />

                        {/* Lighting to match the reference — soft studio feel */}
                        <ambientLight intensity={1.2} />
                        <directionalLight
                            position={[3, 5, 4]}
                            intensity={2.5}
                            color="#ffffff"
                        />
                        <directionalLight
                            position={[-3, 2, -2]}
                            intensity={0.6}
                            color="#c0d8ff"
                        />
                        <hemisphereLight
                            skyColor="#e8eeff"
                            groundColor="#334466"
                            intensity={0.8}
                        />

                        {/* Ground reflection shadow for realism */}
                        <ContactShadows
                            position={[0, -2.5, 0]}
                            opacity={0.4}
                            scale={10}
                            blur={2}
                            far={4.5}
                            resolution={256}
                            color="#000000"
                        />

                        <Robot />
                    </Suspense>

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.8}
                    />
                </Canvas>
            </div>
        </ErrorBoundary>
    );
}