const $round1 = document.querySelector('.round_cursor')
const mouse = { x: 0.5, y: 0.5 }




// CANVAS //

const renderer = new THREE.WebGLRenderer({ alpha: true })

renderer.setSize( window.innerWidth, window.innerHeight )
document.getElementById('container').appendChild(renderer.domElement)

window.addEventListener('resize', () =>
    {
        // Save width and height
        windowWidth = window.innerWidth
        windowHeight = window.innerHeight
    
        // Update camera
        camera.aspect = windowWidth / windowHeight
        camera.updateProjectionMatrix()
        
    
        // Update renderer
        renderer.setSize(windowWidth, windowHeight)
    })

const scene = new THREE.Scene()


const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set(0, 0, 100);
scene.add(camera);


//  BB8  //

const bodyDown = new THREE.SphereGeometry( 1.8, 32, 32 )
const bodyUp = new THREE.SphereGeometry( 1.3, 32, 32 )

const textureDown = new THREE.TextureLoader().load( 'images/bb8.jpg' )
const materialDown = new THREE.MeshBasicMaterial( { map: textureDown } )
const textureUp = new THREE.TextureLoader().load( 'images/bb8.jpg' )
const materialUp = new THREE.MeshBasicMaterial( { map: textureUp } )
meshBodyDown = new THREE.Mesh( bodyDown, materialDown )
meshBodyUp = new THREE.Mesh( bodyUp, materialUp )
meshBodyDown.position.set(0, 0, 0)
meshBodyUp.position.set(0, 2.6, 0)
//scene.add( meshBodyUp )
scene.add( meshBodyDown )


//  PATH BB8  //


//const curveDown = new THREE.CatmullRomCurve3([
//    new THREE.Vector3( -100, 0, 0 ),
//    new THREE.Vector3( 100, 0, 0 ),
//])
//
//const pointsDown = curveDown.getPoints( 100 );
//const geometryPathDown = new THREE.BufferGeometry().setFromPoints( pointsDown );
//
//const materialPathDown = new THREE.LineBasicMaterial( {color: 0xf000000 } );
//
//// Create the final object to add to the scene
//var splineObjectDown = new THREE.Line( geometryPathDown, materialPathDown );
//splineObjectDown.visible = false
//// on effectue le rendu de la scène     
//scene.add(splineObjectDown)
//
//const curveUp = new THREE.CatmullRomCurve3([
//    new THREE.Vector3( -100, 1.6, 0 ),
//    new THREE.Vector3( 100, 1.6, 0 ),
//])
//
//const pointsUp = curveUp.getPoints( 100 );
//const geometryPathUp = new THREE.BufferGeometry().setFromPoints( pointsUp );
//
//const materialPathUp = new THREE.LineBasicMaterial( {color: 0xf000000 } );
//
//// Create the final object to add to the scene
//var splineObjectUp = new THREE.Line( geometryPathUp, materialPathUp );
//splineObjectUp.visible = false
//// on effectue le rendu de la scène     
//scene.add(splineObjectUp)
//
//scene.background = new THREE.CubeTextureLoader()
//	.setPath( 'images/' )
//	.load( [
//		'px.jpg',
//		'nx.jpg',
//		'py.jpg',
//        'ny.jpg',
//        'nz.jpg',
//        'pz.jpg'
//    ])

scene.background = new THREE.CubeTextureLoader()
.setPath( 'images/' )
.load( [
	'px.jpg',
	'nx.jpg',
	'py.jpg',
    'ny.jpg',
    'nz.jpg',
    'pz.jpg'
])


const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.target.set(0, 10, 0);
controls.enableZoom = true;

controls.zoomSpeed = 1.2;
controls.update()




//  DAT GUI  //


const controlator = new function() 
{
   this.rotationSpeed = .1
   this.bouncingSpeed = .1
}

const gui = new dat.gui.GUI();
      gui.add(controlator, 'rotationSpeed',0,0.5);
      gui.add(controlator, 'bouncingSpeed',0,0.5);





// CURSOR //


window.addEventListener('mousemove', function(e)
{
    mouse.x = e.clientX 
    mouse.y = e.clientY 
})


//  FUNCTIONS //

const render = () =>
{
    meshBodyDown.rotation.x += controlator.rotationSpeed;
    meshBodyDown.rotation.y += controlator.rotationSpeed;
    meshBodyDown.rotation.z += controlator.rotationSpeed;
    //step+=controlator.bouncingSpeed;
    //meshBodyDown.position.x = 20+( 10*(Math.cos(step)));
    //meshBodyDown.position.y = 2 +( 10*Math.abs(Math.sin(step)));
    renderer.render(scene, camera)
}

const animate = () =>
{
    requestAnimationFrame(animate)
    render()

    let currentSeconds = Date.now();
    let timestamp = Date.now()
    $round1.style.left = mouse.x - 0.5 + 'px'
    $round1.style.top = mouse.y - 0.5 + 'px'
    $round1.style.transform = 'translateX(-50%) translateY(-50%)'

    //if(meshBodyUp.position.x < 100)
    //{
    //let pointDown = curveDown.getPointAt(timestamp / 5000 % 1)
    //meshBodyDown.position.copy(pointDown)
    //let pointUp = curveUp.getPointAt(timestamp / 5000 % 1)
    //meshBodyUp.position.copy(pointUp)
    //}
}

animate()





