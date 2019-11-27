varying vec3 fPosition;
varying vec3 fNormal;

void main()
{
    vec3 light = vec3(0,1,0);
    float lambert = dot(normalize(fNormal), normalize(light));
    vec3 ambient = vec3(1,0,0) * 0.5;
    gl_FragColor = vec4(ambient + lambert * vec3(1,1,1), 1.0);
}