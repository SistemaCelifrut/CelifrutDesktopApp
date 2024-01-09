/* eslint-disable prettier/prettier */
const edge = require('electron-edge-js')

var about
var openport
var sendcommand
var clearbuffer
var printerfont
var barcode
var printlabel
var closeport
var printer_status
var sendcommand_utf8
var sendcommand_binary
var windowsfont
var formfeed
var nobackfeed
var setup

try {
  openport = edge.func({
    assemblyFile: './tsclibnet.dll',
    typeName: 'TSCSDK.node_usb',
    methodName: 'openport'
  })
} catch (error) {
  console.log(error)
}

try {
  setup = edge.func({
    assemblyFile: './tsclibnet.dll',
    typeName: 'TSCSDK.node_usb',
    methodName: 'setup'
  })
} catch (error) {
  console.log(error)
}
try {
  formfeed = edge.func({
    assemblyFile: './tsclibnet.dll',
    typeName: 'TSCSDK.node_usb',
    methodName: 'formfeed'
  })
} catch (error) {
  console.log(error)
}

try {
  nobackfeed = edge.func({
    assemblyFile: './tsclibnet.dll',
    typeName: 'TSCSDK.node_usb',
    methodName: 'nobackfeed'
  })
} catch (error) {
  console.log(error)
}

try {
  about = edge.func({
    assemblyFile: './tsclibnet.dll',
    typeName: 'TSCSDK.node_usb',
    methodName: 'about'
  })
} catch (error) {
  console.log(error)
}

try {
  sendcommand = edge.func({
    assemblyFile: './tsclibnet.dll',
    typeName: 'TSCSDK.node_usb',
    methodName: 'sendcommand'
  })
} catch (error) {
  console.log(error)
}

try {
  clearbuffer = edge.func({
    assemblyFile: './tsclibnet.dll',
    typeName: 'TSCSDK.node_usb',
    methodName: 'clearbuffer'
  })
} catch (error) {
  console.log(error)
}

try {
  printerfont = edge.func({
    assemblyFile: './tsclibnet.dll',
    typeName: 'TSCSDK.node_usb',
    methodName: 'printerfont'
  })
} catch (error) {
  console.log(error)
}

try {
  barcode = edge.func({
    assemblyFile: './tsclibnet.dll',
    typeName: 'TSCSDK.node_usb',
    methodName: 'barcode'
  })
} catch (error) {
  console.log(error)
}

try {
  printlabel = edge.func({
    assemblyFile: './tsclibnet.dll',
    typeName: 'TSCSDK.node_usb',
    methodName: 'printlabel'
  })
} catch (error) {
  console.log(error)
}

try {
  closeport = edge.func({
    assemblyFile: './tsclibnet.dll',
    typeName: 'TSCSDK.node_usb',
    methodName: 'closeport'
  })
} catch (error) {
  console.log(error)
}

try {
  printer_status = edge.func({
    assemblyFile: './tsclibnet.dll',
    typeName: 'TSCSDK.node_usb',
    methodName: 'printerstatus_string'
  })
} catch (error) {
  console.log(error)
}

try {
  sendcommand_utf8 = edge.func({
    assemblyFile: './tsclibnet.dll',
    typeName: 'TSCSDK.node_usb',
    methodName: 'sendcommand_utf8'
  })
} catch (error) {
  console.log(error)
}

try {
  sendcommand_binary = edge.func({
    assemblyFile: './tsclibnet.dll',
    typeName: 'TSCSDK.node_usb',
    methodName: 'sendcommand_binary'
  })
} catch (error) {
  console.log(error)
}

try {
  windowsfont = edge.func({
    assemblyFile: './tsclibnet.dll',
    typeName: 'TSCSDK.node_usb',
    methodName: 'windowsfont'
  })
} catch (error) {
  console.log(error)
}

var country_from = {
  x: '20',
  y: '20',
  fonttype: '1',
  rotation: '0',
  xmul: '1',
  ymul: '1',
  text: 'PRODUCT OF COLOMBIA'
}
const destino = {
  x: '20',
  y: '40',
  fonttype: '1',
  rotation: '0',
  xmul: '1',
  ymul: '1',
  text: 'DESTINATION:'
}
const product = {
  x: '20',
  y: '60',
  fonttype: '1',
  rotation: '0',
  xmul: '1',
  ymul: '1',
  text: 'PRODUCT: ACID LIME TAHITI (Citrus latifolla)'
}

const client_code = {
  x: '20',
  y: '80',
  fonttype: '1',
  rotation: '0',
  xmul: '1',
  ymul: '1',
  text: 'CLIENT CODE: '
}
const farm_code = {
  x: '20',
  y: '100',
  fonttype: '1',
  rotation: '0',
  xmul: '1',
  ymul: '1',
  text: 'FARM CODE: '
}

const ICA_code = {
  x: '20',
  y: '120',
  fonttype: '1',
  rotation: '0',
  xmul: '1',
  ymul: '1',
  text: 'FARM ICA CODE: '
}

var label_variable = { quantity: '1', copy: '1' }

const label_setup = {
  width: '100',
  height: '49',
  speed: '5',
  density: '8',
  sensor: '0',
  vertical: '4',
  offset: '1'
}

process.parentPort.once('message', (e) => {
  console.log(e)
  destino.text = destino.text + e.data.destino;
  client_code.text = client_code.text + e.data.codigoCliente;
  farm_code.text = farm_code.text +e.data.codigoPredio;


  openport('TSC TE200', true)

  setup(label_setup, true)

  clearbuffer('', true)

  sendcommand('BAR 15, 15, 800,2')
  printerfont(country_from, true)
  printerfont(destino, true)
  printerfont(product, true)
  printerfont(client_code, true)
  printerfont(farm_code, true)
  printerfont(ICA_code, true)
  printlabel(label_variable, true)

  closeport('', true)
})
