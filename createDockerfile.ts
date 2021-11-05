import * as fs from 'fs';
let imgName: string = "testDockerImg"
let programVersion: string = "node:6.2.2"
let author: string = "tobesoft@tobesoft.com"
let workDir: string = "/app"
let setScripts: string = "npm start"



fs.writeFile('../workspace/Dockerfile',`
FROM ${programVersion}
LABEL name="${author}"
RUN mkdir -p /app
WORKDIR ${workDir}
ADD . /app
RUN npm install
ENV NODE_ENV development
EXPOSE 3000 80
CMD ${setScripts}
`, function (err) {
	if (err === null) {
		console.log('success');
	} else {
		console.log('fail');
	}
});

