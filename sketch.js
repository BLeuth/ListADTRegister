var buttons = new List();
var foodList = new List();
var w;
var h;
var recieptW;
function setup(){
	w = windowWidth;
	h = windowHeight;
	createCanvas(w,h);
	
	w/=1.5
	
	buttons.append(new Button(w*.08333,h*.08333,w*.166666,100,"Cheeseburger",5.75));
	buttons.append(new Button(w*.41666,h*.08333,w*.166666,100,"Hotdog",3.28));
	buttons.append(new Button(w*.74999,h*.08333,w*.166666,100,"Dirt",15.22));
	
	buttons.append(new Button(w*.08333,h*.41666,w*.166666,100,"Fries",2.43));
	buttons.append(new Button(w*.41666,h*.41666,w*.166666,100,"Cheese Curds",4.22));
	buttons.append(new Button(w*.74999,h*.41666,w*.166666,100,"Worms",.50));
	
	buttons.append(new Button(w*.08333,h*.74999,w*.166666,100,"Coke",1.50));
	buttons.append(new Button(w*.41666,h*.74999,w*.166666,100,"Fruit Punch",1.75));
	buttons.append(new Button(w*.74999,h*.74999,w*.166666,100,"Rain Water",10.43));
	
	recieptW = (windowWidth-w)*.95;
}

function draw(){
	background(230,240,190);
	while(buttons.hasNext()){
		buttons.next().drawButton();
	}
	buttons.front();
	
	fill(60,170,190);
	rect(w,h*.025,recieptW,h*.95);
	
	var total = 0;
	var counter = 0;
	if(foodList.length()!=0){
		while(foodList.hasNext()){
			var temp = foodList.next();
			fill(0);
			textAlign(CENTER);
			text(temp.name,w+(recieptW/4),h*.075+(30*counter));
			text("$"+temp.price.toFixed(2),w+(recieptW/1.5),h*.075+(30*counter));
			total+=temp.price;
			counter++;
		}
		foodList.front();
	}
	
	text("Total items: "+foodList.length(),w+(recieptW/2),h*.9);	
	text("Total: $"+total.toFixed(2),w+(recieptW/2),h*.95);
}

function Food(name,price){
	this.name = name;
	this.price = price;
}


function List() {
	this.listSize = 0;
	this.pos = 0;
	this.dataStore = []; // initializes an empty array to store list elements
	this.clear = clear;
	this.find = find;
	this.toString = toString;
	this.insert = insert;
	this.append = append;
	this.remove = remove;
	this.front = front;
	this.end = end;
	this.previous = previous;
	this.next = next;
	this.hasPrevious = hasPrevious;
	this.hasNext = hasNext;
	this.length = length;
	this.currPos = currPos;
	this.moveTo = moveTo;
	this.getElement = getElement;
	this.contains = contains;
}

function append(element) {
	this.dataStore[this.listSize++] = element;
}

function find(element) {
	for (var i = 0; i < this.dataStore.length; ++i) {
		if (this.dataStore[i] == element) {
			return i;
		}
	}
	return -1;
}

function remove(element) {
	var foundAt = this.find(element);
	if (foundAt > -1) {
		this.dataStore.splice(foundAt,1);
		--this.listSize;
		return true;
	}
	return false;
}

function length() {
	return this.listSize;
}

function toString() {
	return this.dataStore;
}

function insert(element, after) {
	var insertPos = this.find(after);
	if (insertPos > -1) {
		this.dataStore.splice(insertPos+1, 0, element);
		++this.listSize;
		return true;
	}
	return false;
}

function clear() {
	delete this.dataStore;
	this.dataStore = [];
	this.listSize = this.pos = 0;
}

function contains(element) {
	for (var i = 0; i < this.dataStore.length; ++i) {
		if (this.dataStore[i] == element) {
			return true;
		}
	}
	return false;
}

function moveTo(position) {
	this.pos = position;
}
function getElement() {
	return this.dataStore[this.pos];
}

function previous() {
	return this.dataStore[--this.pos];
}

function next() {
	return this.dataStore[this.pos++];
}

function hasNext() {
	if (this.pos > this.listSize -1) {
		return false;
	} else {
		return true;
	}
}

function hasPrevious() {
	if (this.pos <= 0) {
		return false;
	} else {
		return true;
	}
}

function front() {
	this.pos = 0;
}

function end() {
	this.pos = this.listSize - 1;
}

function currPos() {
	return this.pos;
}

function mouseClicked(){
	var x = mouseX;
	var y = mouseY;
	
	while(buttons.hasNext()){
		var temp = buttons.next();
		if(temp.isHovering()){
			temp.doStuff();
			break;
		}
	}
	buttons.front();
}

function Button(xCoord,yCoord,bWidth,bHeight,texty,price){
	this.xCoord = xCoord;
	this.yCoord = yCoord;
	this.bWidth = bWidth;
	this.bHeight = bHeight;
	this.texty = texty;
	this.price = price;
	
	this.doStuff = function(){
		foodList.append(new Food(this.texty,this.price));
	}
	
	this.drawButton = function(){
		if(this.isHovering()){
			fill(150);
		} else {
			fill(200);
		}
		rect(this.xCoord,this.yCoord,this.bWidth,this.bHeight);
		fill(0);
		textAlign(CENTER);
		textSize(20);
		text(this.texty,this.xCoord+(this.bWidth/2),this.yCoord+(this.bHeight/2));
	}
	
	this.isHovering = function(){
		if(mouseX>this.xCoord&&mouseX<this.xCoord+this.bWidth&&mouseY>this.yCoord&&mouseY<this.yCoord+this.bHeight){
			return true;
		}
		return false;
	}
}
