let img;

let imgSquares = [];

const horizontalSquareCount = 5;
const verticalSquareCount = 5;

let squareWidth;
let squareHeight;

const importantSquareIndex = 0;

preload = () => {
    img = loadImage('IMG_20190627_223335_SCALED.png');
    missingTileImage = loadImage('missing-tile.png');
}

setup = () => {
    const canvas = createCanvas(img.width, img.height);
    canvas.parent('sketch-holder');

    squareWidth = width / horizontalSquareCount;
    squareHeight = height / verticalSquareCount;

    img.loadPixels();
    for (var y = 0; y < height; y += squareHeight) {
        for (var x = 0; x < width; x += squareWidth) {
            imgSquares.push(img.get(x, y, squareWidth, squareHeight));
        }
    }

    let missingTileIndex = Math.ceil(random(horizontalSquareCount * verticalSquareCount)) -1;
    while (missingTileIndex === importantSquareIndex) {
        missingTileIndex = Math.ceil(random(horizontalSquareCount * verticalSquareCount)) -1;
    }

    imgSquares[missingTileIndex] = missingTileImage.get(0,0, squareWidth, squareHeight);

    pd = pixelDensity();
    noLoop();
}

mouseClicked = () => {
    draw();
}

draw = () => {

    imgSquares = shuffle(imgSquares);

    let squareX = 0;
    let squareY = 0;
    for (var square of imgSquares) {
        image(square, squareX, squareY);

        squareX += squareWidth;
        if (squareX >= width) {
            squareX = 0;
            squareY += squareHeight;
        }
    }
}
