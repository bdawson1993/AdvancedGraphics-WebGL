float waveWidth = 0.5;
float waveHeight = 0.4;
float speed = 1.0;
uniform float time;
varying float ftime;
varying float fheight;
varying vec2 vUv;


void main()
{
    vUv = uv;
    float t = time * speed;
    ftime = time;
    vec4 height = vec4(position, 1.0);

    
    height.z += (sin(waveWidth * position.x + t * 1.3) * cos(waveWidth * position.y + t * 0.9) * waveHeight) + 
    (cos(waveWidth * 2.0 * position.x + t * -.3) * sin(waveWidth * 4.0 * position.y + t * 3.9) * ( waveHeight / 2.0 ));
    
    //set value of varying
    fheight = v.z;

//final pos
    gl_Position = projectionMatrix * modelViewMatrix * height;
}
