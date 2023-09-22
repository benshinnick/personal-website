// Check adjacent cells in all 8 directions
const DIRECTIONS = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],          [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1]
];

export default class MinesweeperBoard {
    constructor(rows, columns, firstSelection) {
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.lastRevealedCells = [];
        this.generateBoard(firstSelection);
    }

    generateBoard(firstSelection) {
        // Initialize the grid with empty cells
        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.columns; j++) {
                this.grid[i][j] = {
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighboringMines: 0
                };
            }
        }

        // Randomly place mines on the grid
        this.placeMines(firstSelection);

        // Calculate the number of neighboring mines for each cell
        this.calculateNeighboringMines();
    }

    placeMines(firstSelection) {
        const totalMines = Math.floor((this.rows * this.columns) /8); // Adjust the ratio as needed

        // Create an array of all cell positions
        const allPositions = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                allPositions.push([i, j]);
            }
        }
    
        // Remove the first selection and its neighbors from the positions
        const safePositions = this.getSafePositions(firstSelection);
        for (const position of safePositions) {
            const index = allPositions.findIndex(p => p[0] === position[0] && p[1] === position[1]);
            if (index !== -1) {
                allPositions.splice(index, 1);
            }
        }
    
        // Shuffle the remaining positions
        this.shuffleArray(allPositions);
    
        // Place mines on the first n shuffled positions
        for (let i = 0; i < totalMines; i++) {
            const [row, col] = allPositions[i];
            this.grid[row][col].isMine = true;
        }
    }
    
    getSafePositions(firstSelection) {
        const [row, col] = firstSelection;
        const positions = [];
    
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i >= 0 && i < this.rows && j >= 0 && j < this.columns) {
                    positions.push([i, j]);
                }
            }
        }
    
        return positions;
    }
    
    shuffleArray(array) {
        // Fisher-Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    calculateNeighboringMines() {
        // Code to calculate the number of neighboring mines for each cell in the grid.
        // Loop through each cell and count the adjacent cells that contain mines.
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (!this.grid[i][j].isMine) {
                    let neighboringMines = 0;

                    for (const [dx, dy] of DIRECTIONS) {
                        const newRow = i + dx;
                        const newColumn = j + dy;

                        if (
                            newRow >= 0 && newRow < this.rows &&
                            newColumn >= 0 && newColumn < this.columns &&
                            this.grid[newRow][newColumn].isMine
                        ) {
                            neighboringMines++;
                        }
                    }

                    this.grid[i][j].neighboringMines = neighboringMines;
                }
            }
        }
    }

    flagCell(position) {
        const [row, col] = position;
        this.grid[row][col].isFlagged = true;
    }

    selectCell(position) {
        this.lastRevealedCells = [];
        const [row, col] = position;
        const selectedCell = this.grid[row][col];

        if (!selectedCell.isRevealed && !selectedCell.isFlagged) {
            if (selectedCell.isMine) {
                selectedCell.isRevealed = true;
                // Handle game over logic (e.g., show all mines, end game)
                this.handleGameOver();
            } else {
                // Handle logic for revealing neighboring cells
                if (selectedCell.neighboringMines === 0) {
                    // If the selected cell has no neighboring mines, recursively reveal its neighbors
                    this.revealNeighbors(row, col);
                }
                else {
                    selectedCell.isRevealed = true;
                    this.lastRevealedCells.push({row: row, column: col, cell: this.grid[row][col]})
                }
            }
        }
    }

    // Add a function to handle game over logic here
    handleGameOver() {
        console.log("GAME OVER")
        // You can implement the logic to end the game, reveal all mines, etc.
        // For example, you can set a game over flag and reveal all cells.
    }

    // Add the revealNeighbors function to your MinesweeperBoard class
    revealNeighbors(row, col) {
        // Start the recursion from the selected cell
        this.revealRecursive(row, col);
    }

    // Helper function to recursively reveal neighbors
    revealRecursive(r, c) {
        // Base case: Check if the cell is out of bounds or already revealed
        if (
            r < 0 || r >= this.rows ||
            c < 0 || c >= this.columns ||
            this.grid[r][c].isRevealed
        ) {
            return;
        }

        // Reveal the cell
        this.grid[r][c].isRevealed = true;
        this.lastRevealedCells.push({row: r, column: c, cell: this.grid[r][c]});

        // If the cell has no neighboring mines, recursively reveal its neighbors
        if (this.grid[r][c].neighboringMines === 0) {
            for (const [dr, dc] of DIRECTIONS) {
                this.revealRecursive(r + dr, c + dc);
            }
        }
    }

    getCell(row, col) {
        return {row: row, column: col, cell: this.grid[row][col]};
    }

    isCellRevealed(row, column) {
        return this.grid[row][column].isRevealed;
    }

    isCellFlagged(row, column) {
        return this.grid[row][column].isFlagged;
    }
}