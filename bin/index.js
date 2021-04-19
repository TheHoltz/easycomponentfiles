#! /usr/bin/env node
var fs = require("fs");
const yargs = require("yargs");

const options = yargs.usage("Usage: -n <name>").option("n", {
  alias: "name",
  describe: "Absolute name or the relative path with the name.",
  type: "string",
  demandOption: true,
}).argv;

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
const createFiles = ({ name }) => {
  let dir = "./components/";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  if (/.*\//.test(name)) {
    let newDir = /.*\//.exec(name)[0];
    dir = newDir[0] === "/" ? "./components" + newDir : dir + newDir;
    name = /\/([a-zA-Z0-9]+)$/.exec(name)[1];
  }

  if (!fs.existsSync(`${dir}${name}`)) {
    fs.mkdirSync(`${dir}${name}`, { recursive: true });
  } else {
    return console.error(
      "\nOoops, something went wrong: \nThe component already exists, delete the folder or create with another name.\n"
    );
  }

  fs.writeFile(
    `${dir}${name}/index.ts`,
    `export { default } from './${name}'
export { ${name}Props } from './interfaces'
`,
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );

  fs.writeFile(
    `${dir}${name}/interfaces.ts`,
    `export interface ${name}Props {

}
`,
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );

  fs.writeFile(
    `${dir}${name}/${name}.tsx`,
    `
import React from 'react';
import { ${name}Props } from '.'
import s from "./${name}.module.css";


const ${capitalizeFirstLetter(name)}: React.FC<${name}Props> = ({}) => {
    return(
        <>
            
        </>
    )
}

export default ${capitalizeFirstLetter(name)};
`,
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );

  fs.writeFile(
    `${dir}${name}/${name}.module.css`,
    `.root {

}
`,
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );

  return console.log(
    `\nSuccess: \nThe component ${name} was created successfully.\n`
  );
};

createFiles(options);
