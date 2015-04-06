// Concept, script and CSS copyright CBT Limited
// Author     CBT Limited, London, UK
// Version    2.00
// See license at http://razor-cloud.com/razor/License.html

var size = 0;
var index = 0;
var images = [];
var settings;

(function( $ ) {

	
	$.fn.image = function(options) {

		settings = $.extend( {
			pos: "",				// point of sale code
			model: "Product",		// model type
			id: "",					// model ID
			wait: 5000,				// wait in milliseconds between rotations
			sequence: 1,			// 0=in sequence, 1=random sequence
			error: true				// include error messages
		}, options);
		
		if (settings.error) console.log("image " + settings.pos + ", " + settings.id + ", " + settings.wait + ", " + settings.sequence);

		return this.each(function(i, e) {

			if (!settings.wait || settings.wait < 500 || settings.wait > 60000) {if (settings.error) console.log("Invalid wait parameter - must be 500 < wait <= 60000 milliseconds"); return;}
			if (!settings.sequence || settings.sequence < 0 || settings.sequence > 1) {if (settings.error) console.log("Invalid sequence parameter - must be 0 for sequential or 1 for random order"); return;}

			$.getJSON(jsonURL(), {
				service : "image",
				pos : settings.pos,
				model : settings.model,
				id : settings.id
			},
			function(data) {
				if (data == undefined) {console.log("image data error");}
				else if (data.message != undefined) console.log(data.message);
				else {
					$.each(data.items, function(i, item) {
						images[index++] = new imageItem(item.url, item.notes);
					});
					size = images.length;
					change("image");
				}
			})
			.error(function(data) {if (settings.error) console.log("image error");});
		});	
	};

})( jQuery );

function imageItem(image_location, image_notes) {
	this.image_item = new Image();
	this.image_item.src = image_location;
	this.image_item.title = image_notes;
}

function getLocation(imageObj) {
	return (imageObj.image_item.src);
}

function getRandom(x, y) {
	var range = y - x + 1;
	return Math.floor(Math.random() * range) + x;
}

function getNext() {
	if (settings.sequence) {index = getRandom(0, size - 1);} 
	else {index = (index + 1) % size;}
	var new_image = getLocation(images[index]);
	return (new_image);
}

function getPrevious() {
	index = (index - 1) % size;
	var new_image = getLocation(images[index]);
	return (new_image);
}

function prevImage(place) {
	var new_image = getPrevious();
	document[place].src = new_image;
}

function change(place) {
	var new_image = getNext();
	document[place].src = new_image;
	var recur_call = "change('" + place + "')";
	timerID = setTimeout(recur_call, settings.wait);
}
