module.exports = function solveSudoku(matrix) {

    function getp(puzzle, x, y) {
        var hash = {};
        for (var u = 0; u < 9; u++) hash[ puzzle[y][u] ] = 1;
        for (var u = 0; u < 9; u++) hash[ puzzle[u][x] ] = 1;
        for (var u = 0; u < 9; u++) hash[ puzzle[ 3*((y/3)|0) + ((u/3)|0) ][ 3*((x/3)|0) + (u%3) ] ] = 1;

        var poss = [];
        for (var i = 1; i <= 9; i++) if (!(i in hash)) poss.push(i);
        return poss;
    }

    function sudoku(puzzle) {
        var indicies = [], n = 0;
        for (n = 0; n < 9*9; n++) if (puzzle[(n/9)|0][n%9] === 0) indicies.push({ v: n, p: null, i: 0});

        n = 0;
        while (n < indicies.length) {
            var c = indicies[n], y = (c.v/9)|0, x = c.v%9;
            c.p = c.p || getp(puzzle, x, y);
            if (c.i >= c.p.length) {
                puzzle[y][x] = 0;
                c.i = 0; c.p = null;
                n--;
            } else {
                puzzle[y][x] = c.p[c.i++];
                n++;
            }

        }

        return puzzle;
    }

    return sudoku(matrix);

}