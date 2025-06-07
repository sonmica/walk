# Walk

# Setup
Add a `.env` file and paste in the variables found in the discord. Then:
* `npm i`
* `npm run dev` to run locally and watch for changes

Optionally, you can run `npm run type-check` at any time to run type checker. Not sure why it doesn't run by default but the GitHub pipeline **hates** type errors so good to catch them locally first.

Also not sure if this affects anyone else, but I was getting no red squigglies or type hints from VS until I edited `walk\.vscode\settings.json` to add:
* `"typescript.validate.enable": true`