uniform sampler2D texture;
uniform float xCoord;
varying float ftime;
varying float fheight;
varying vec2 vUv;
float time = 0.1;


void main()
{
    float t = ftime * 1.0 * 0.01;
    vec3 color = texture2D(texture, vUv + vec2(sin(t), cos(t))).rgb + fheight * 1.0 * vec3(1,1,1);
    gl_FragColor = vec4(color, 1.0);
}