import React from 'react';
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Vector3,
  PointLight,
  IcosahedronGeometry,
  MeshPhongMaterial,
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
} from 'three';

const headerHeight = 56;

function ThreeIcosahedron() {
  const rootEl = React.createRef<HTMLDivElement>();

  // setup renderer
  const [renderer, setRenderer] = React.useState(null);
  React.useEffect(() => {
    if (renderer) return;

    const _ = new WebGLRenderer({ antialias: true });
    _.setClearColor(0xefefef);
    _.setSize(window.innerWidth, window.innerHeight - headerHeight);

    setRenderer(_);
  }, [renderer]);

  // setup scene
  const [scene, setScene] = React.useState(null);
  React.useEffect(() => {
    if (scene) return;

    const _ = new Scene();

    setScene(_);
  }, [scene]);

  // setup camera
  const [camera, setCamera] = React.useState(null);
  React.useEffect(() => {
    if (camera) return;

    const fov = 75; // vertical field of view in degrees
    const aspectRatio = window.innerWidth / (window.innerHeight - headerHeight);
    const nearPlane = 0.1;
    const farPlane = 1000;

    const _ = new PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);
    _.position.z = 4;
    _.lookAt(new Vector3(0, 0, 0));

    setCamera(_);
  }, [camera]);

  // setup lights
  const [lights, setLights] = React.useState(null);
  React.useEffect(() => {
    if (lights) return;

    const _ = {
      top: new PointLight(0xffffff, 1, 1000, 2),
      right: new PointLight(0xffffff, 1, 1000, 2),
      bottom: new PointLight(0xffffff, 1, 1000, 2),
      left: new PointLight(0xffffff, 1, 1000, 2),
      far: new PointLight(0xffffff, 1, 1000, 2),
      near: new PointLight(0xffffff, 1, 1000, 2),
    };
    _.top.position.set(0, 10, 0);
    _.right.position.set(10, 0, 0);
    _.bottom.position.set(0, -10, 0);
    _.left.position.set(-10, 0, 0);
    _.far.position.set(0, 0, -10);
    _.near.position.set(0, 0, 10);

    setLights(_);
  }, [lights]);

  // setup mesh
  const [mesh, setMesh] = React.useState(null);
  React.useEffect(() => {
    if (mesh) return;

    const geometry = new IcosahedronGeometry(1, 1);
    const phongMaterial = new MeshPhongMaterial({
      color: 0x360082,
      flatShading: true,
      side: DoubleSide,
    });
    const wireframeMaterial = new MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireframe = new Mesh(geometry, wireframeMaterial);

    const _ = new Mesh(geometry, phongMaterial);
    _.add(wireframe);

    setMesh(_);
  }, [mesh]);

  // setup render loop
  const animate = React.useCallback(() => {
    if (!renderer || !mesh) return;
    // rotate mesh (in radians)
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;
    // render
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }, [renderer, scene, camera, mesh]);

  // initialize
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    if (initialized) return;

    if (!renderer || !scene || !camera || !lights) return;
    // add lights and mesh to scene
    scene.add(lights.top);
    scene.add(lights.right);
    scene.add(lights.bottom);
    scene.add(lights.left);
    scene.add(lights.far);
    scene.add(lights.near);
    scene.add(mesh);
    // append renderer to the rendered root element
    if (rootEl.current) rootEl.current.appendChild(renderer.domElement);
    // enable responsive renderer
    window.addEventListener('resize', function() {
      renderer.setSize(window.innerWidth, window.innerHeight - headerHeight);
      camera.aspect = window.innerWidth / (window.innerHeight - headerHeight);
      camera.updateProjectionMatrix();
    });
    // start the animation loop
    animate();

    setInitialized(true);
  }, [initialized, renderer, scene, camera, lights, mesh, rootEl, animate]);

  return <div className="icosahedron" ref={rootEl} />;
}

export default ThreeIcosahedron;
