let squareCount;
const helpDurationMillis = 1000;

let img;

let imgSquares = [];


let squareWidth;
let squareHeight;

let missingTileIndex;
let helpMode;


preload = () => {
    img = loadImage('IMG_20190627_223335_SCALED.png');
    missingTileImage = loadImage('missing-tile.png');
}

levelSetup = () => {
    squareCount = levelSlider.value();

    imgSquares = [];

    squareWidth = width / squareCount;
    squareHeight = height / squareCount;

    for (var y = 0; y < height; y += squareHeight) {
        for (var x = 0; x < width; x += squareWidth) {
            imgSquares.push(img.get(x, y, squareWidth, squareHeight));
        }
    }

    imgSquares = shuffle(imgSquares);

    missingTileIndex = squareCount * squareCount - 1;

    imgSquares[missingTileIndex] = missingTileImage.get(0, 0, squareWidth, squareHeight);

    pd = pixelDensity();

}

setup = () => {
    const canvas = createCanvas(img.width, img.height);
    canvas.parent('sketch-holder');

    levelSlider = createSlider(3, 10, 5);
    levelSlider.class(['slider']);
    levelSlider.parent('level-slider');

    img.loadPixels();
    missingTileImage.loadPixels();

    const holder = document.getElementById('sketch-holder');
    const help = document.getElementById('help'); 
    help.style.left = (holder.offsetLeft  + 10) + "px";
    help.style.top = (holder.offsetTop + 10 + height) + "px";
    
    levelSetup();


}

switctTiles = (a, b) => {
    let tmp = imgSquares[b];
    imgSquares[b] = imgSquares[a];
    imgSquares[a] = tmp;
}

keyPressed = ({ key }) => {
    if (key && key.toLocaleLowerCase() === 'h') {
        helpMode = new Date();
    }
}

mouseClicked = ({ offsetX, offsetY }) => {
    if (helpMode === undefined) {

        const tileIndexClicked = Math.floor(offsetX / squareWidth) + Math.floor(offsetY / squareHeight) * squareCount;
        if (tileIndexClicked === missingTileIndex - 1) {
            switctTiles(tileIndexClicked, missingTileIndex);
            missingTileIndex = tileIndexClicked;
        } else if (tileIndexClicked === missingTileIndex - squareCount) {
            switctTiles(tileIndexClicked, missingTileIndex);
            missingTileIndex = tileIndexClicked;
        } else if (tileIndexClicked === missingTileIndex + 1) {
            switctTiles(tileIndexClicked, missingTileIndex);
            missingTileIndex = tileIndexClicked;
        } else if (tileIndexClicked === missingTileIndex + squareCount) {
            switctTiles(tileIndexClicked, missingTileIndex);
            missingTileIndex = tileIndexClicked;
        }
    }

}

draw = () => {
    if (helpMode) {
        image(img, 0, 0);
        if (new Date().getTime() > helpMode.getTime() + helpDurationMillis) {
            helpMode = undefined;
        }
    } else {
        if (levelSlider.value() !== squareCount) {
            levelSetup()
        }

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


    printFrameRate({ fillColor: () => 255 });
}
