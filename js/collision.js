function rectCollide(rect1, rect2){
	if (rect1.x + rect1.width < rect2.x || rect1.x > rect2.x + rect2.width) return false;
	if (rect1.y + rect1.height < rect2.y || rect1.y > rect2.y + rect2.height) return false;
	return true;
}

function squareCollide(square1, square2){
	if (square1.x + square1.size < square2.x || square1.x > square2.x + square2.size) return false;
	if (square1.y + square1.size < square2.y || square1.y > square2.y + square2.size) return false;
	return true;
}

function squareRectCollide(square, rect){
	if (square.x + square.size < rect.x || square.x > rect.x + rect.width) return false;
	if (square.y + square.size < rect.y || square.y > rect.y + rect.height) return false;
	return true;
}