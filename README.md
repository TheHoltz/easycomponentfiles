# easycomponentfiles

A simple package to help create all new component boilerplate to a typescript NextJS project.

## Installation

NPM

```cmd
npm i https://github.com/TheHoltz/easycomponentfiles -g
```

Yarn

```cmd
yarn global add https://github.com/TheHoltz/easycomponentfiles
```

## Simple Example

```cmd
cnc -n navbar
```

The cnc are the initials of "create new component", and then you can provide the name of the component with the argument -n.

The result of the command are the creation of the following files:

![Files created](https://i.imgur.com/2An50mK.png "Files created")

## Example with path relative to components folder

```cmd
cnc -n utils/text/title
```

With the above code, the files will be created relative to the components folder, as follows:

![](https://i.imgur.com/q0PahOJ.png)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
