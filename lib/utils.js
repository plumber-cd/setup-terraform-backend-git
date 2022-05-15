const os = require('os');
const path = require('path');

// arch in [arm, x32, x64...] (https://nodejs.org/api/os.html#os_os_arch)
// return value in [amd64, 386, arm]
function mapArch(arch) {
  const mappings = {
    x32: '386',
    x64: 'amd64'
  };
  return mappings[arch] || arch;
}

// os in [darwin, linux, win32...] (https://nodejs.org/api/os.html#os_os_platform)
// return value in [darwin, linux, windows]
function mapOS(os) {
  const mappings = {
    win32: 'windows'
  };
  return mappings[os] || os;
}

function getDownloadObject(version) {
  // https://github.com/plumber-cd/terraform-backend-git/releases/download/v0.1.2/terraform-backend-git-darwin-amd64
  const platform = os.platform();
  const filename = `terraform-backend-git-${ mapOS(platform) }-${ mapArch(os.arch()) }`;
  const extension = platform === 'win32' ? '.exe' : '';
  const binPath = platform === 'win32' ? 'bin' : path.join(filename, 'bin');
  const url = `https://github.com/plumber-cd/terraform-backend-git/releases/download/v${ version }/${ filename }${ extension }`;
  return {
    url,
    binPath
  };
}

module.exports = { getDownloadObject }
