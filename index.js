#!/usr/bin/env node

import { parse, relative } from "path";
import { promises } from "fs";
import meow from "meow";
import crop from "crop-node";

const { mkdir, writeFile } = promises;

const run = async (cli) => {
    const started = performance.now();
    const { input, flags } = cli;
    const { path, format, silent } = flags;

    if (!input.length) {
        cli.showHelp();
        return;
    }

    // Custom logger
    const log = (...args) => {
        if (!silent) {
            console.log(...args);
        }
    };

    const outputPath = relative(process.cwd(), path);
    if (outputPath) {
        await mkdir(outputPath, {
            recursive: true,
        });
    }

    await Promise.all(input.map(async (file) => {
        const { name } = parse(file);
        const output = relative(process.cwd(), `${outputPath || "."}/${name}.cropped.${format}`);
        const buffer = await crop(file, {
            outputFormat: format,
        });
        await writeFile(output, buffer);
        log(`✔️ ${output} file created`);
    }));

    log(`Done in ${Math.round(performance.now() - started).toLocaleString()} ms`);
};

const cli = meow(`
    Usage
        $ crop-node <path> [<options>]

    Options
        --path, -p              Destination path of the output  (default: ./)
        --format, -f            Result image format             (default: png)
        --silent, -s            Don't log success               (default: false)

    Example
        $ crop-node src/*.png --path dist/
`, {
    importMeta: import.meta,
    flags: {
        path: {
            shortFlag: "p",
            type: "string",
            default: "./",
        },
        format: {
            shortFlag: "f",
            type: "string",
            default: "png",
        },
        silent: {
            shortFlag: "s",
            type: "boolean",
            default: false,
        },
    },
});

await run(cli);
