<script lang="ts">
  import { T } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls } from '@threlte/extras'
  import { spring } from 'svelte/motion'
  import { Pane, Checkbox } from 'svelte-tweakpane-ui'
  import { showCollider, autoRotate, playPause } from './state'
  import Stars from './Stars.svelte'

  console.log("autoRotate ",autoRotate)

  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  

  let play = () => {
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    })
    .then((stream) => {
      console.log("stream",stream);
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.getByteTimeDomainData(dataArray);
        for (let i = 0; i < dataArray.length; i++) {
          console.log("dataArray["+i+"]"+dataArray[i]);
        }
        console.log("dataArray[100]"+dataArray[100]);
        console.log("dataArray[512]"+dataArray[512]);
        console.log("dataArray[800]"+dataArray[800]);
      /* use the stream */
    })
    .catch((err) => {
      /* handle the error */
      console.log("err",err);
    });
  }




  // const size = 20
  // const count = size ** 3
  // const positions = new Float32Array(count * 3)

  //  // 3D math squiggles
  //  for (let i = 0; i < count; i++) {
  //   // 1D to 3D array
  //   let x = i / (size * size)
  //   let y = (i / size) % size
  //   let z = i % size
  //   const vx =
  //     Math.sin(Math.abs(size - x) * 0.1) * Math.sin(Math.abs(size - y) * 0.1) * 10
  //   const vy =
  //     Math.sin(Math.abs(size - x) * 0.3) * Math.sin(Math.abs(size - y) * 0.3) * 10
  //   const vz = y + z
  //   //x
  //   positions[i * 3 + 0] = vx
  //   //y
  //   positions[i * 3 + 1] = vy
  //   //z
  //   positions[i * 3 + 2] = vz
  // }

  // const pos = spring({ x: 0, z: 0 })
  // const setRandomPos = () => {
  //   pos.set({
  //     x: Math.random() * 10 - 5,
  //     z: Math.random() * 10 - 5
  //   })
  // }

</script>

<T.PerspectiveCamera
  makeDefault
  position={[1, 1, 10]}
  fov={30}
>
  <OrbitControls
    autoRotate
    autoRotateSpeed{0}
    enableZoom={true}
    enableDamping
    target.y={1}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={0.8}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={0.2} />

<!-- <Grid
  position.y={-0.001}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={10}
  fadeDistance={25}
  cellSize={5}
/> -->

<ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5}
/>




<!-- <T.Points>
  <T.BufferGeometry>
    <T.BufferAttribute
      args={[positions, 3]}
      attach={(parent, self) => {
        parent.setAttribute('position', self)
        return () => {
          // cleanup function called when ref changes or the component unmounts
          // https://threlte.xyz/docs/reference/core/t#attach
        }
      }}
    />
  </T.BufferGeometry>
  <T.PointsMaterial size={0.25} />
</T.Points> -->

<!-- <Pane
  title="controls"
  position="fixed"
>
<Checkbox
label="playPause"
bind:value={$playPause}
on:change={play}
/>

  <Checkbox
    label="AutoRotate"
    bind:value={$autoRotate}
  />

</Pane> -->

<Stars />