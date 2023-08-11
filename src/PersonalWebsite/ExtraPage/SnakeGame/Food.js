export default class Food {
    constructor(startingPosition, gameGridRows, gameGridCols) {
        this.position = startingPosition;
        this.gridPositions = [];
        for(var r = 0; r < gameGridRows; r++) {
            for(var c = 0; c < gameGridCols; c++) {
                this.gridPositions.push([r, c]);
            }
        }
    }

    handleEaten(unavailablePositions) {
        var positionUnavailable = true;
        let foodPosition;
        while(positionUnavailable) {
            const possibleFoodPosition = this.gridPositions[Math.floor(Math.random() * (this.gridPositions.length - 1))];
            positionUnavailable = unavailablePositions.some(a => possibleFoodPosition.every((v, i) => v === a[i]));
            foodPosition = possibleFoodPosition;
        }
        this.position = foodPosition;
    }
}