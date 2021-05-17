const path = require('path');
const fs = require('fs');

const isFlowFile = (filename) => filename.endsWith('.js.flow');
const isDirectory = (filepath) => fs.lstatSync(filepath).isDirectory();
const flowHeader = '// @flow\n';
function replaceInDirectory(directory) {
  const filenames = fs.readdirSync(directory);
  const flowFilenames = filenames.filter(isFlowFile);
  for (const flowFilename of flowFilenames) {
    const filepath = path.join(directory, flowFilename);
    console.log(`Replacing headers in ${filepath}...`);
    const contents = fs.readFileSync(filepath).toString();
    if (!contents.startsWith(flowHeader)) {
      fs.writeFileSync(filepath, flowHeader + contents);
    }
  }

  const nestedDirectories = filenames.filter((filename) =>
    isDirectory(path.join(directory, filename))
  );
  for (const nestedDirectory of nestedDirectories) {
    replaceInDirectory(path.join(directory, nestedDirectory));
  }
}

replaceInDirectory('lib');
