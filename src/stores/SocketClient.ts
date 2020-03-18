import socketIOClient from 'socket.io-client';
import config from './Config'

const socket = socketIOClient(config.socketHost);
export default socket;