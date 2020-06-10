export const moves = [
    {
        title: "Top",
        x: 0,
        y: -1
    },
    {
        title: "Right",
        x: +1,
        y: 0
    },
    {
        title: "Bottom",
        x: 0,
        y: +1,
    },
    {
        title: "Left",
        x: -1,
        y: 0
    }

];

export const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateSquares = (size) => {
    let squares = [];
    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            squares = [...squares, {
                x: i,
                y: j,
            }]
        }
    }

    return squares;
};

export const takeNeighbors = (array, currentNumber, size) => {
    let neighbor = {};
    let x;
    let y;

    for (let i = 0; i < array.length; i++) {
        if (i === currentNumber) {
            let randomMove;

            neighborsXY();
            function neighborsXY() {
                randomMove = getRandomIntInclusive(0, moves.length - 1);
                x = array[i].x + moves[randomMove].x;
                y = array[i].y + moves[randomMove].y;

                if (x > -1 && x < size && y > -1 && y < size) {
                    for (let j = 0; j < array.length; j++) {
                        if (array[j].x === x && array[j].y === y) {
                            neighbor = {
                                newPositionId: j,
                                newPositionX: x,
                                newPositionY: y,
                                moveTitle: moves[randomMove].title,
                            };
                            break;
                        }
                    }
                }
                else {
                    neighborsXY();
                }
            }
            break;
        }
    }
    return neighbor;
};
