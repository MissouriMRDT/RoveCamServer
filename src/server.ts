
import { PeerServer } from 'peer';
const PEERSERVERPORT = 9001;
const peerServer = PeerServer({ port: PEERSERVERPORT, allow_discovery: true });