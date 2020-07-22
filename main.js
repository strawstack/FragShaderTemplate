import * as THREE from './build/three.module.js';
var camera, scene, renderer, controls;
const SIZE = 500;

function init(shader_content) {
	// Camera
	camera = new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, 1, 2 );

	// Scene
	scene = new THREE.Scene();

	// Plane
	var geometry = new THREE.PlaneGeometry(1, 1);
	var material = new THREE.ShaderMaterial({
		vertexShader: shader_content[0],
		fragmentShader: shader_content[1],
		uniforms: {
			resolution: {
				value: SIZE * window.devicePixelRatio
			}
		}
	});
	var plane = new THREE.Mesh( geometry, material );
	scene.add( plane );
	plane.position.z = -1;

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( SIZE, SIZE );
	document.body.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
}

// Window resize
function onWindowResize() {
	camera.aspect = SIZE / SIZE;
	camera.updateProjectionMatrix();
	renderer.setSize( SIZE, SIZE );
}

// Animate
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

// Shaders
let shader_names = ["shader.vert", "shader.frag"];
let promises = shader_names.map(shader_name => loadShader(shader_name));
Promise.all(promises).then(shader_content => {
	init(shader_content);
	animate();
});
function loadShader(url) {
	return new Promise(resolve => {
		new THREE.FileLoader().load(url, resolve);
	});
}
