import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

import ShaderAsChild from './shaderAsChild.js';
import ShaderAsProps from './shaderAsProps.js';

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    this.state = {
      cubeRotation: new THREE.Euler(),
      time: 0,
      uniformsAsChild: 0,
      uniformsAsProps: 0,
    };

    this._onAnimate = () => {

      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.1,
          this.state.cubeRotation.y + 0.1,
          0
        ),
        time: this.state.time + 0.05,
        uniformsAsChild: this.uniformsAsChild.uniforms.time.value,
        uniformsAsProps: this.uniformsAsProps.uniforms.time.value,
      });
      
    };

  }

  componentDidMount() {
    // console.log();
  }

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return (<div>
      <div className="uniform-log">
        <div>uniformsAsChild time value: {this.state.uniformsAsChild} </div>
        <div>uniformsAsProps time value: {this.state.uniformsAsProps} </div>
      </div>
      <React3
        mainCamera="camera"
        width={width}
        height={height}
        onAnimate={this._onAnimate}
      >
        <scene>
          <perspectiveCamera
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}

            position={this.cameraPosition}
          />
          <mesh
            position={new THREE.Vector3(-2, 0, 0)}
            rotation={this.state.cubeRotation}
          >
            <boxGeometry
              width={1}
              height={1}
              depth={1}
            />
            <shaderMaterial
              vertexShader={ShaderAsChild.vert}
              fragmentShader={ShaderAsChild.frag}
              ref={(el) => { this.uniformsAsChild = el; }}
            >
              <uniforms>
                <uniform type="f" name="time" value={this.state.time} />
              </uniforms>
            </shaderMaterial>
          </mesh>          
          <mesh
            position={new THREE.Vector3(2, 0, 0)}
            rotation={this.state.cubeRotation}
          >
            <boxGeometry
              width={1}
              height={1}
              depth={1}
            />
            <shaderMaterial
              vertexShader={ShaderAsProps.vert}
              fragmentShader={ShaderAsProps.frag}
              ref={(el) => { this.uniformsAsProps = el; }}
              uniforms={{ time: { value: this.state.time } }}
            />
          </mesh>
        </scene>
      </React3>
    </div>);
  }
}

ReactDOM.render(<Simple/>, document.getElementById('react-root'));