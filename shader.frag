uniform float resolution;

void main() {
    // Justice
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy;
    color += step(0.5, st.x/resolution);
    gl_FragColor = vec4(color, 1.0);

    // Display only red
    // gl_FragColor = vec4(1.0, 0, 0, 1.0);
}
