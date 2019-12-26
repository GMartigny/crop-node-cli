#!/usr/bin/env node

const { dirname } = require("path");
const { writeFile, mkdir } = require("fs").promises;
const meow = require("meow");
const crop = require("crop-node");

const run = async (cli) => {
    const { input, flags } = cli;
    const { path, outputFormat, silent } = flags;

    if (!input.length) {
        cli.showHelp();
        return;
    }

    const log = (...args) => {
        if (!silent) {
            console.log(...args);
        }
    };

    const buffer = await crop(input[0], {
        outputFormat,
    });

    const outputPath = dirname(path);
    await mkdir(outputPath, {
        recursive: true,
    });

    await writeFile(path, buffer);
    log("✔️ Cropped file created");
};

const index = meow(`
    Usage
        $ crop-node <path> [<options>]

    Options
        --path, -p              Destination path of the output  (default: cropped.png)
        --outputFormat, -f      Result image format             (default: png)
        --silent, -s            Don't log success               (default: false)

    Example
        $ crop-node image.png --path image-cropped.png
`, {
    flags: {
        path: {
            alias: "p",
            type: "string",
            default: "cropped.png",
        },
        outputFormat: {
            alias: "f",
            type: "string",
            default: "png",
        },
        silent: {
            alias: "s",
            type: "boolean",
            default: false,
        },
    },
});

run(index);
