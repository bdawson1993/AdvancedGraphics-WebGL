float waveWidth = 3.0;
float waveHeight = 0.04;
float speed = 1.0;
uniform float time;
varying float ftime;
varying float fheight;
varying vec2 vUv;


void main()
{
    vUv = uv;
    ftime = time;
    float t = time * speed;
    vec4 v = vec4(position, 1.0);

    
    v.z += (
	    // Add some offset to the waves to make it slightly less regular
	    sin(waveWidth * position.x + t * 1.3) *
	    cos(waveWidth * position.y + t * 0.9) * waveHeight
    ) + (
        // Extra waves to add interest
	    cos(waveWidth * 2.0 * position.x + t * -.3) *
	    sin(waveWidth * 4.0 * position.y + t * 3.9) * ( waveHeight / 2.0 )
    );
    fheight = v.z;

    gl_Position = projectionMatrix * modelViewMatrix * v;
}