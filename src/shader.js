const Shader = {
  vertex: `
  uniform float time;
  
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  fragment: `
  uniform float time;

  void main() { 
    // Take 'time' and return a sine wave ranging from 0.0–1.0
    float timeSine = (sin(time) + 1.0) / 2.0; 
    gl_FragColor = vec4(timeSine, timeSine, timeSine, 1.0);
  }
  `,
};

export default Shader;
