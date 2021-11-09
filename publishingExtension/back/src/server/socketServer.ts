import * as WebSocket from 'ws';
import { functions } from '../functions';
import { RpcExtensionWebSockets } from '../lib/rpc-extension-ws';

class socketServer {
	private rpc: RpcExtensionWebSockets | undefined;

	init() {
		//소켓 설정

		const port: number = 8081;
		const server = new WebSocket.Server({ port: port }, () => {
		console.log(`start, ${port}`);
		});

		server.on('listening', () => {
		console.log(`listening, ${port}`);
		});

		server.on('error', (error) => {
		console.log(`error,${error}`);
		});

		server.on('connection', (socket: any) => {
		console.log('connect');
		this.rpc = new RpcExtensionWebSockets(socket);
		this.initRpc(this.rpc);
		});
	}

	private async initRpc(rpc: RpcExtensionWebSockets) {
		console.log('init');
		Object.keys(functions).forEach((key) => {
		rpc.registerMethod({ func: functions[key] });
		});
	}
}

const server = new socketServer();
server.init();
