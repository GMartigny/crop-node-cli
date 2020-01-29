# crop-node-cli

[![Package version](https://flat.badgen.net/npm/v/crop-node-cli)](https://www.npmjs.com/package/crop-node-cli)
[![Package size](https://badgen.net/bundlephobia/minzip/crop-node-cli)](https://bundlephobia.com/result?p=crop-node-cli)

CLI for [crop-node](https://github.com/gmartigny/crop-node).


## Installation

    npm install --global crop-node-cli


## Usage

    $ crop-node <path> [<options>]


### Options

    --path, -p              Destination path of the output  (default: cropped.png)
    --outputFormat, -f      Result image format             (default: png)
    --silent, -s            Don't log success               (default: false)


## Example

    $ crop-node image.png --path image-cropped.png


## License

[MIT](license)
