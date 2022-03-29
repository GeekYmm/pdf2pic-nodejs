const pdf2pic = require('pdf2pic')
const path = require('path')
const replaceColor = require('replace-color')

const options = {
  density: 100,
  saveFilename: '1',
  savePath: path.join('./images'),
  format: 'png',
  width: 900,
  height: 1400
}
const storeAsImage = pdf2pic.fromPath(path.join('./pdf/3.pdf'), options)
const pageToConvertAsImage = 1
storeAsImage(pageToConvertAsImage).then((resolve) => {
  console.log(resolve)
  replaceColor({
    image: resolve.path,
    colors: {
      type: 'hex',
      targetColor: '#FFFFFF',
      replaceColor: '#00000000'
    },
    deltaE: 10
  }).then((jimpObject) => {
    jimpObject.write('./output.png', (err) => {
      if (err) return console.log(err)
    })
  }).catch((err) => {
    console.log(err)
  })
})