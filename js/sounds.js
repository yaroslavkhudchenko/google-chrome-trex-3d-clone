import * as THREE from './libs/three.module.js';
import { camera } from './app.js';

export let backMusicController = null;
export let jumpMusicController = null;
export let collisionMusicController = null;

export const music = () => {
    // create an AudioListener and add it to the camera
    let listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    backMusicController = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    let audioLoader = new THREE.AudioLoader();
    audioLoader.load('./audio/back.mp3', function (buffer) {
        backMusicController.setBuffer(buffer);
        backMusicController.setLoop(true);
        backMusicController.setVolume(0.5);
        // backMusicController.play();
    })

    // create a global audio source
    jumpMusicController= new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    audioLoader.load('./audio/jump.wav', function (buffer) {
        jumpMusicController.setBuffer(buffer);
        jumpMusicController.setLoop(false);
        jumpMusicController.setVolume(1);
    })

    // create a global audio source
    collisionMusicController = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    audioLoader.load('./audio/jump.wav', function (buffer) {
        collisionMusicController.setBuffer(buffer);
        collisionMusicController.setLoop(false);
        collisionMusicController.setVolume(1);
    })

}