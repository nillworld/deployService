import * as fs from 'fs';
let test: string = "node:6.2.2"
fs.writeFile('../workspace/Dockerfile',`
FROM ${test}
RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install
ENV NODE_ENV development
EXPOSE 3000 80
CMD ["npm", "start"]
`, function (err) {
	if (err === null) {
		console.log('success');
	} else {
		console.log('fail');
	}
});