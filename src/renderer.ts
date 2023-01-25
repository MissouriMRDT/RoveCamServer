/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import Peer from 'peerjs';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

const PEERSERVERPORT = 9001;
const PEERSERVERIP = 'localhost';
const ROVERPEERID = 'rover';

const peer = new Peer(ROVERPEERID, { host: PEERSERVERIP, port: PEERSERVERPORT });
peer.on('open', (id) => {
    console.log(`my id is ${id}`);
});

peer.on('call', async (call) => {    
    const media = await navigator.mediaDevices.getUserMedia({video: true})
    console.log(media)
    call.answer(media);
    peer.listAllPeers((peers: any[]) => {
        console.log(peers);
      });
    call.on('stream', (s) => {console.log('got stream', s)})
    //call.addStream(media);

//     navigator.mediaDevices.getUserMedia({video: true}).then((stream) => 
//     {call.answer(stream)
//     console.log("answered");
// console.log(stream)});
    console.log('got call from ' + call.peer)
    console.log(call)
})