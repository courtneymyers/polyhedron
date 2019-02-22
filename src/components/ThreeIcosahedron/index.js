// @flow

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

// --- components
type Props = {};

type State = {
  renderer: any,
  scene: any,
  camera: any,
  lights: any,
  mesh: any,
  complete: boolean,
};

class ThreeIcosahedron extends React.Component<Props, State> {
  state = {
    renderer: null,
    scene: null,
    camera: null,
    lights: null,
    mesh: null,
    complete: false,
  };

  setupRenderer() {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xefefef);
    renderer.setSize(window.innerWidth, window.innerHeight);

    this.setState({ renderer }, this.setupScene());
  }

  setupScene() {
    this.setState({ scene: new Scene() }, this.setupCamera());
  }

  setupCamera() {
    const fov = 75; // vertical field of view in degrees
    const aspectRatio = window.innerWidth / window.innerHeight;
    const nearPlane = 0.1;
    const farPlane = 1000;
    const camera = new PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);
    camera.position.z = 4;
    camera.lookAt(new Vector3(0, 0, 0));

    this.setState({ camera }, this.setupLights());
  }

  setupLights() {
    const lights = {
      top: new PointLight(0xffffff, 1, 1000, 2),
      right: new PointLight(0xffffff, 1, 1000, 2),
      bottom: new PointLight(0xffffff, 1, 1000, 2),
      left: new PointLight(0xffffff, 1, 1000, 2),
      far: new PointLight(0xffffff, 1, 1000, 2),
      near: new PointLight(0xffffff, 1, 1000, 2),
    };
    lights.top.position.set(0, 10, 0);
    lights.right.position.set(10, 0, 0);
    lights.bottom.position.set(0, -10, 0);
    lights.left.position.set(-10, 0, 0);
    lights.far.position.set(0, 0, -10);
    lights.near.position.set(0, 0, 10);

    this.setState({ lights }, this.setupMesh());
  }

  setupMesh() {
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

    const mesh = new Mesh(geometry, phongMaterial);
    const wireframe = new Mesh(geometry, wireframeMaterial);
    mesh.add(wireframe);

    this.setState({ mesh });
  }

  animate = () => {
    const { renderer, scene, camera, mesh } = this.state;
    // rotate mesh (in radians)
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;
    // render
    renderer.render(scene, camera);
    requestAnimationFrame(this.animate);
  };

  componentDidMount() {
    this.setupRenderer();
  }

  componentDidUpdate() {
    // this.state.complete flag is set to true at the end of cDU(),
    // ensuring the following code only runs once...
    if (this.state.complete) return;

    const { renderer, scene, camera, lights, mesh } = this.state;
    // add lights and mesh to scene
    scene.add(lights.top);
    scene.add(lights.right);
    scene.add(lights.bottom);
    scene.add(lights.left);
    scene.add(lights.far);
    scene.add(lights.near);
    scene.add(mesh);
    // append renderer to the rendered root element
    this.root.appendChild(renderer.domElement);
    // enable responsive renderer
    window.addEventListener('resize', function() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
    // start the animation loop
    this.animate();
  }

  render() {
    return <div className="icosahedron" ref={(el) => (this.root = el)} />;
  }
}

export default ThreeIcosahedron;
