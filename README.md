# Auto Log time

## Instruction
1. Clone this project
2. run `npm install`
3. Add username and password in `src/config.json`
4. Config `projectSettings` in `src/config.json`
5. run `npm run build`
6. If you use Windows System, create a Task scheduler with this command `node path\to\dist\folder\index.js`. If you use Unix system, add a cronjob by using `crontab -e` and add new job as `node path/to/dist/directory/index.js`
