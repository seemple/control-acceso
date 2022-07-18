import { useEffect, useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import initializeApp from "./data/firebase.js";
import { getStorage, ref,uploadBytes } from "firebase/storage";


function App() {
  const [count, setCount] = useState(0)
  const [isCompat, setCompat ]  = useState(false);
  const [videoSrc,setVideoSrc] = useState(null);
  const [photoSrc,setPhotoSrc] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const deviceConfig = {
    video: {
      width: {
        min: 1280,
        ideal: 1920,
        max: 2560,
      },
      height: {
        min: 720,
        ideal: 1080,
        max: 1440
      },
      facingMode: 'user'
    }
  };

  const Photo = (props) =>{   
    return (<img {...props} />)
  };

  const handleStream = async (videoDevice) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      ...deviceConfig,
      deviceId:{
        exact:videoDevice.deviceId
      }
      });

      const video = videoRef.current;

      if(stream) {
        video.srcObject = stream;
        //video.autoplay = true;
      }
  }; 

  const checkDeviceCompat = async () =>{
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        console.log("Accesing device camera...")
        console.log("Sending stream to output...")
        setCompat(true);
    }
  };

  
  const handleStop = async (e) =>{
    videoRef.current.pause();
  }

  const handlePlay = async (e) =>{
    videoRef.current.play();
  }

  const takePhoto = () =>{
      let video = videoRef.current;
      let canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      setPhotoSrc(canvas.toDataURL('imagejpeg'));

      const storage = getStorage();
      const photoRef = ref(storage, 'images/picture.jpeg');

      canvas.toBlob(function(blob) {
        // blob ready, download it
        uploadBytes(photoRef, blob).then((snapshot) => {
          console.log('Uploaded:'+snapshot);
        });
      }, 'image/jpeg');

      
  }

  async function getDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();

    try {

      if(devices) {
         const videoDevices = devices.filter(device => device.kind === 'videoinput');
         console.log("VIDEO DEVICE:"+JSON.stringify(videoDevices));
         handleStream(videoDevices);
      };
    
    } catch (error){
      console.log("ERROR NUMERATING DEVICES:"+error);
    }
  }

  useEffect( () =>{
    checkDeviceCompat();
    isCompat && getDevices() ; initializeApp();
    setPhotoSrc("https://via.placeholder.com/150/d32776");
  },[isCompat]);

  return (
    <div className="App">
      
      <div className="card">
        {isCompat ?
        <p>Se podrá usar la cámara</p>
        :
        <p>No se podrá usar la cámara</p>
        }
      </div>
      
      <>
        <video ref={videoRef}></video>
        
        <canvas ref={canvasRef} className="d-none"></canvas>

        <Photo src={photoSrc} />

      </>
      <div className="card">
        <button onClick={() => handleStop()} >STOP</button>
        <button onClick={() => handlePlay()} >PLAY</button>
        <button onClick={() => takePhoto()}>TOMAR FOTO</button>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
