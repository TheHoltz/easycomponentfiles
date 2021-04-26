#! /usr/bin/env node
var fs = require("fs");
const yargs = require("yargs");

const options = yargs.usage("Usage: -n <name>").option("n", {
  alias: "name",
  describe: "Absolute name or the relative path with the name.",
  type: "string",
  demandOption: true,
}).argv;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const createFile = (dir, name, file, content) => {
  return fs.writeFile(`${dir}${name}/${file}`, content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const fileExists = (dir) => {
  return fs.existsSync(dir);
};

const createDirectory = (dir, ...args) => {
  return fs.mkdirSync(dir, ...args);
};

const create = ({ name }) => {
  let dir = "./components/";

  if (!fileExists(dir)) {
    createDirectory(dir);
  }

  if (/.*\//.test(name)) {
    let newDir = /.*\//.exec(name)[0];
    dir = newDir[0] === "/" ? "./components" + newDir : dir + newDir;
    name = /\/([a-zA-Z0-9]+)$/.exec(name)[1];
  }

  if (!fileExists(`${dir}${name}`)) {
    createDirectory(`${dir}${name}`, { recursive: true });
  } else {
    return console.error(
      "\nOoops, something went wrong: \nThe component already exists, delete the folder or create with another name.\n"
    );
  }

  createFile(
    dir,
    name,
    "index.ts",
    `export { default } from './${name}'
export { ${name}Props } from './types'
`
  );

  createFile(
    dir,
    name,
    "types.ts",
    `export interface ${name}Props {

}
    `
  );

  createFile(
    dir,
    name,
    `${name}.tsx`,
    `import React from 'react';
import { ${name}Props } from '.'
import s from "./${name}.module.css";


const ${capitalizeFirstLetter(name)}: React.FC<${name}Props> = ({}) => {
    return(
        <>
            
        </>
    )
}

export default ${capitalizeFirstLetter(name)};
`
  );

  createFile(
    dir,
    name,
    `${name}.module.css`,
    `.root {

}
    `
  );

  return console.log(
    `\nSuccess: \nThe component ${name} was created successfully.\n`
  );
};

create(options);
