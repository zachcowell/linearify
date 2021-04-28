const sizeOf = require('image-size');
const Jimp = require('jimp');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

const linearify = async ({ 
    framesX, 
    framesY, 
    img, 
    output='out.png'
}) => {
    if (!framesX) throw new Error('x is a required parameter');
    if (!framesY) throw new Error('y is a required parameter');
    if (!img) throw new Error('img is a required parameter');
    const dimensions = sizeOf(img);
    const newImageWidth = dimensions.width * framesY;
    const frameHeight = dimensions.height / framesY;
    const frameWidth = dimensions.width / framesX;
    const currentImage = await Jimp.read(img);
    const newImg = new Jimp(newImageWidth, frameHeight);
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

    console.log('Write complete');
    console.log(JSON.stringify({
        width: dimensions.width,
        height: dimensions.height,
        frameCount: framesX * framesY,
        name: '',
        image: '',
        animations: {}
    }, null, 2));
}



try {
    const framesX = argv['x'];
    const framesY = argv['y'];
    const img = argv['_'][0];
    const output = argv['o'];
    // const animations = argv['a'];
    
    linearify({ framesX, framesY, img, output });
    // spritesheetify({ framesX, framesY, img, animations });

} catch (e){
    console.error('Error: ' + e.message);
}