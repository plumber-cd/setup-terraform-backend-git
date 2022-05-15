const path = require('path');
const fs = require('fs').promises;
const io = require('@actions/io');
const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const { getDownloadObject } = require('./lib/utils');

async function setup() {
  try {
    // Get version of tool to be installed
    const version = core.getInput('version', { required: true });

    // Download the specific version of the tool
    const download = getDownloadObject(version);
    const pathToCLI = await tc.downloadTool(download.url);

    // Expose the tool by adding it to the PATH
    const target = path.join(pathToCLI, 'bin')
    const targetCLI = path.join(target, 'terraform-backend-git')
    await io.mkdirP(target)
    await io.mv(pathToCLI, targetCLI);
    fs.chmodSync(targetCLI, "777");
    core.addPath(target);
  } catch (e) {
    core.setFailed(e);
  }
}

module.exports = setup

if (require.main === module) {
  setup();
}
