import * as commandLineArgs from 'command-line-args';
import * as express from 'express';

import * as path from 'path';
var fs = require("fs");

interface CommandLineArgs {
  port: number;
  publicDir: string;
}

const argsDefinitions = [
  { name: 'port', alias: 'p', type: Number, defaultValue: 3030 },
  { name: 'publicDir', alias: 'd', type: String, defaultValue: path.join(__dirname, 'htw-berlin-ecco-webapp') }
];

const args: CommandLineArgs = commandLineArgs(argsDefinitions);

const app = express();

app.use(express.static(args.publicDir));

app.use(function(req, res){
  fs.readFile(path.join(args.publicDir, "index.html"), 'utf-8', function(err, data){
      if(err)
          throw err;
      res.end(data);
  });
});



app.listen(args.port, '0.0.0.0', () => console.log("listening on port " + args.port));
