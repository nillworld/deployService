import * as fs from 'fs';

let data=fs.readFileSync('option.json', 'utf8');
let options = JSON.parse(data);

fs.writeFile('../workspace/Dockerfile',`
FROM ${options.programVersion}
LABEL name="${options.author}"
RUN mkdir -p /app
WORKDIR ${options.workDir}
ADD . /app
RUN npm install
ENV NODE_ENV development
EXPOSE 3000 80
CMD ${options.setScripts}
`, function (err) {
	if (err === null) {
		console.log('success');
	} else {
		console.log('fail');
	}
});

