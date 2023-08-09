import * as sprites from './SpriteImageSources.js';

var lastDrawnBodyType = 2;
var lastDrawnCornerType = 2;

export default class Snake {
    constructor(body, startingDirection, gameGridRows, gameGridCols) {
        this.body = body;
        this.direction = startingDirection;
        this.gameGridRows = gameGridRows;
        this.gameGridCols = gameGridCols;
    }

    update(ateFoodOnTurn) {
        if(!ateFoodOnTurn) this.body.shift(); // remove tail
        this.body.push(addvector(this.getHeadPosition(), this.direction));
    }

    getLength() {
        return this.body.length;
    }

    getDirectedPosition() {
        return addvector(this.body[this.body.length - 1], this.direction);
    }

    getHeadPosition() {
        return this.body[this.body.length - 1];
    }

    getBeforeHeadPosition() {
        return this.body[this.body.length - 2];
    }

    getTailPosition() {
        return this.body[0];
    }

    getBodyImage(bodyIndex) {
        // tail case
        if(bodyIndex === 0) {
            const [tailRow, tailCol] = this.body[bodyIndex];
            const [afterTailRow, afterTailCol] = this.body[bodyIndex+1]; 
            if (afterTailRow > tailRow) return sprites.tailDownImage;
            if (afterTailRow < tailRow) return sprites.tailUpImage;
            if (afterTailCol > tailCol) return sprites.tailRightImage;
            if (afterTailCol < tailCol) return sprites.tailLeftImage;
        }
        // head case
        else if(bodyIndex === (this.getLength() - 1)) {
            const [headRow, headCol] = this.body[bodyIndex];
            const [beforeHeadRow, beforeHeadCol] = this.body[bodyIndex - 1];
            if (beforeHeadRow > headRow) return sprites.headUpImage;
            if (beforeHeadRow < headRow) return sprites.headDownImage;
            if (beforeHeadCol > headCol) return sprites.headLeftImage;
            if (beforeHeadCol < headCol) return sprites.headRightImage;
        }
        // middle body case
        else { // body / corner case
            const [prevBodyRow, prevBodyCol] = this.body[bodyIndex - 1];
            const [bodyRow, bodyCol] = this.body[bodyIndex];
            const [nextBodyRow, nextBodyCol] = this.body[bodyIndex + 1];
            if (prevBodyRow === nextBodyRow || prevBodyCol === nextBodyCol) {
                lastDrawnBodyType = (lastDrawnBodyType === 2) ? 1 : 2;
                if (lastDrawnBodyType === 1) return sprites.body1Image;
                if (lastDrawnBodyType === 2) return sprites.body2Image;
            }
            lastDrawnCornerType = (lastDrawnCornerType === 2) ? 1 : 2;
            if(prevBodyRow > bodyRow && prevBodyCol === bodyCol) {
                if(bodyRow === nextBodyRow && bodyCol < nextBodyCol) {
                    if (lastDrawnCornerType === 1) return sprites.rightDownCorner1Image;
                    if (lastDrawnCornerType === 2) return sprites.rightDownCorner2Image;
                }
                if(bodyRow === nextBodyRow && bodyCol > nextBodyCol) {
                    if (lastDrawnCornerType === 1) return sprites.leftDownCorner1Image;
                    if (lastDrawnCornerType === 2) return sprites.leftDownCorner2Image;
                }
            }
            if(prevBodyRow < bodyRow && prevBodyCol === bodyCol) {
                if(bodyRow === nextBodyRow && bodyCol < nextBodyCol) {
                    if (lastDrawnCornerType === 1) return sprites.rightUpCorner1Image;
                    if (lastDrawnCornerType === 2) return sprites.rightUpCorner2Image;
                }
                if(bodyRow === nextBodyRow && bodyCol > nextBodyCol) {
                    if (lastDrawnCornerType === 1) return sprites.leftUpCorner1Image;
                    if (lastDrawnCornerType === 2) return sprites.leftUpCorner2Image;
                }
            }
            if(prevBodyRow === bodyRow && prevBodyCol > bodyCol) {
                if(bodyRow < nextBodyRow && bodyCol === nextBodyCol) {
                    if (lastDrawnCornerType === 1) return sprites.rightDownCorner1Image;
                    if (lastDrawnCornerType === 2) return sprites.rightDownCorner2Image;
                }
                if(bodyRow > nextBodyRow && bodyCol === nextBodyCol) {
                    if (lastDrawnCornerType === 1) return sprites.rightUpCorner1Image;
                    if (lastDrawnCornerType === 2) return sprites.rightUpCorner2Image;
                }
            }
            if(prevBodyRow === bodyRow && prevBodyCol < bodyCol) {
                if(bodyRow < nextBodyRow && bodyCol === nextBodyCol) {
                    if (lastDrawnCornerType === 1) return sprites.leftDownCorner1Image;
                    if (lastDrawnCornerType === 2) return sprites.leftDownCorner2Image;
                }
                if(bodyRow > nextBodyRow && bodyCol === nextBodyCol) {
                    if (lastDrawnCornerType === 1) return sprites.leftUpCorner1Image;
                    if (lastDrawnCornerType === 2) return sprites.leftUpCorner2Image;
                }
            }
        }
        return null;
    }

    // can't do 180 turn
    isDirectionAllowed(direction) {
        const directedPos = addvector(this.getHeadPosition(), direction);
        const beforeHeadPos = this.body[this.body.length - 2];
        return !(directedPos[0] === beforeHeadPos[0] && directedPos[1] === beforeHeadPos[1]);
    }

    setDirection(direction) {
        if(this.isDirectionAllowed(direction)) this.direction = direction;
    }
}

function addvector(a,b){
    return a.map((e,i) => e + b[i]);
}