uniform sampler2D texture;
varying float ftime;
varying float fheight;
varying vec2 vUv;
float time = 0.1;


void main()
{
    float t = ftime * 1.0 * 0.01;
    vec3 color = texture2D(texture, vUv).rgb + fheight * 6.0 * vec3(1,1,1);
    gl_FragColor = vec4(color, 1.0);
}