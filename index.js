const sizeOf = require('image-size');
const Jimp = require('jimp');
const argv = require('minimist')(process.argv.slice(2));

const linearify = async (framesX, framesY, img, output='out.png') => {
    if (!framesX) throw new Error('x is a required parameter');
    if (!framesY) throw new Error('y is a required parameter');
    if (!img) throw new Error('img is a required parameter');
    const dimensions = sizeOf(img);
    const newImageWidth = dimensions.width * framesY;
    const frameHeight = dimensions.height / framesY;
    const frameWidth = dimensions.width / framesX;
    const currentImage = await Jimp.read(img);
    const newImg = await new Jimp(newImageWidth, frameHeight);
    for (let x=0; x < framesX; x++){
        for (let y=0; y< framesY; y++){
            newImg.blit(currentImage, 
                (x*frameWidth) + (y * dimensions.width), 
                0, 
                x * frameWidth, 
                y * frameHeight,
                frameWidth,
                frameHeight);        
        }
    }
    newImg.write(output);
}

try {
    linearify(argv['x'], argv['y'], argv['_'][0], argv['o']);
} catch (e){
    console.error('Error: ' + e.message);
}