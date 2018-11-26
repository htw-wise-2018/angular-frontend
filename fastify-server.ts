import * as commandLineArgs from 'command-line-args';
import * as fastify from 'fastify';
import * as fastifyStatic from 'fastify-static';
import { IncomingMessage, Server, ServerResponse } from 'http';
import * as path from 'path';

interface CommandLineArgs {
  port: number;
  publicDir: string;
}

const argsDefinitions = [
  { name: 'port', alias: 'p', type: Number, defaultValue: 3030 },
  { name: 'publicDir', alias: 'd', type: String, defaultValue: path.join(__dirname, 'htw-berlin-ecco-webapp') }
];

const args: CommandLineArgs = commandLineArgs(argsDefinitions);
const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify();

server.register(fastifyStatic, {
  root: args.publicDir
});

server.listen(args.port)
  .then(console.log)
  .catch(console.error);
