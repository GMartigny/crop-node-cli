import { promises } from "fs";
import test from "ava";
import execa from "execa";

const { readFile } = promises;

test("main", async (t) => {
    await execa("./index.js", ["./test/fixtures/drawing.png", "-p", "./test"]);

    t.snapshot(await readFile("./test/drawing.cropped.png"));
});
