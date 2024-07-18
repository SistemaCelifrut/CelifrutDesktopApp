/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

// Lee la versión del archivo JSON
const versionData = require('../../package.json')
const version = versionData.version;
console.log(path.join(__dirname, '..', 'docs', 'Empezar', 'Instalación.md'))

// Lee el archivo Markdown
const markdownFilePath = path.join(__dirname, '..', 'docs', 'Empezar', 'Instalación.md');
let markdownContent = fs.readFileSync(markdownFilePath, 'utf8');

// Actualiza el contenido del archivo Markdown
const updatedMarkdownContent = markdownContent.replace(/celifrutdesktopapp-[\d.]+-setup\.exe/, `celifrutdesktopapp-${version}-setup.exe`);

// Escribe el contenido actualizado de nuevo en el archivo Markdown
fs.writeFileSync(markdownFilePath, updatedMarkdownContent, 'utf8');

console.log('El archivo Markdown ha sido actualizado con la versión:', version);