/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

var doc = app.activeDocument;
var sym = doc.symbols;

var grid_x_start = 60.05;
var grid_y_start = 395.56;
var grid_spacing = 36.91;
var idx = -1;

var die_count = 0;

var placeFish = function( grid_x, grid_y ) {
    var fish = doc.symbolItems.add(sym[0]);
    fish.left = grid_x_start + (grid_spacing * grid_x) - (fish.width / 2);
    fish.top = grid_y_start - (grid_spacing * grid_y);
};

var placeTreasure = function( grid_x, grid_y ) {
    var treasure = doc.symbolItems.add(sym[1]);
    treasure.left = grid_x_start + (grid_spacing * grid_x) - (treasure.width / 2);
    treasure.top = grid_y_start - (grid_spacing * grid_y) - 5;
};

var placeRocks = function( grid_x, grid_y ) {
    var rock_1 = doc.symbolItems.add(sym[2]);
    var rock_2 = doc.symbolItems.add(sym[2]);
    var x_off = (Math.random() * grid_spacing/2) - grid_spacing/4;
    var y_off = (Math.random() * grid_spacing/2) - grid_spacing/4;
    rock_1.left = grid_x_start + (grid_spacing * grid_x) - (rock_1.width / 2) +  x_off - (Math.random() * 16-8) ;
    rock_1.top = grid_y_start - (grid_spacing * grid_y) - 8 + y_off + (Math.random() * 16 -8) ;;
    rock_2.left = grid_x_start + (grid_spacing * grid_x) - (rock_1.width / 2) +  x_off;
    rock_2.top = grid_y_start - (grid_spacing * grid_y) - 8 + y_off;
};

var placeIsland = function(grid_x, grid_y ) {
    var island = doc.symbolItems.add(sym[3]);
    island.left = grid_x_start + (grid_spacing * grid_x) - (island.width / 2);
    island.top = grid_y_start - (grid_spacing * grid_y);
    
};

var placeDie = function( grid_x, grid_y ) {
    var die = doc.symbolItems.add(sym[4+ die_count] );
     die.left = grid_x_start + (grid_spacing * grid_x) - ( die.width / 2);
     die.top = grid_y_start - (grid_spacing * grid_y) - 10;
    die_count ++;
};

var board = [
  0,0,0,0,0,0,0,  
0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,1,1,
1,1,1,1,1,1,1,1,1,
1,1,1,1,  2,2,2,2,
2,2,2,2,2,2,2,2,3,
3,3,3,3,3,3,3,3,3,
3,3,4,4,4,4,4,4,4,
  4,5,5,5,5,5,5  
];

shuffle(board);

for (var grid_y = 0; grid_y < 9; grid_y++) {
    loop: for ( var grid_x = 0; grid_x < 9; grid_x ++ ) {
        idx++;
        switch ( idx ) {
            case 0:
            case 8:
            case 40:
            case 72:
            case 80:
                continue loop;
            default:
                break;
        }
        switch ( board.pop() ) {
            case 0:
                continue loop;
            case 1:
                placeFish(grid_x, grid_y);
                break;
            case 2:
                placeTreasure(grid_x, grid_y);
                break;
            case 3:
                placeRocks(grid_x, grid_y );
                break;
            case 4:
                placeIsland(grid_x, grid_y);
                break;
            case 5:
                placeDie( grid_x, grid_y );
                break;
        };
    }
}