var colors = ['black', 'navy','red', 'blue', 'green', 'orange', 'yellow', 'lime',  'black', 'navy', 'red', 'blue', 'green', 'orange', 'yellow', 'lime'];

// shuffle the array using fisher-yates shuffle

var ArrayShuffle = function (input) {

	for (i = input.length-1; i > 0; i--){

	//get a random element from the array

	var randomIndex = Math.floor(Math.random()*(i+1));

	var randomItem = input[randomIndex];
	
	//swap the array elements

	input[randomIndex] = input[i];
	input[i] = randomItem;
	}

	return input;
};

var newcolors = ArrayShuffle(colors);

// add an event listener to make cards change colors.

$(document).ready(function() {

	var openedCard = null;
	var clickCounter = 0;
	var matchedCounter = 0;

	console.log(newcolors);

	$('.card').click( function() {
		clickCounter++;

		// logic: check if card 1 == card 2

		if (openedCard != null)

		{
			var next_index = $(this).attr("id");
			var next_color = newcolors[next_index-1];

			$(this).css('background-color', next_color);
			
			console.log("comparing this to opened card"); 
			console.log(openedCard.css("backgroundColor"),$(this).css("backgroundColor"));

			if (openedCard.css("backgroundColor") == $(this).css("backgroundColor"))
			{
				// cards match
				$(this).off('click');
				openedCard.off('click');
				openedCard = null;
				matchedCounter++;
				
				if (matchedCounter == (newcolors.length/2)) {
				$('#title').html('You win! Yay!');
			
				// Make this loop through newcolors

				for (n = 0; n < newcolors.length; n++){
				$('.card').animate({backgroundColor: newcolors[n]}, 100);}

				$('.card').off('click');} 
			}
			else
			{
				// cards don't match, reset $(this) css and openedCard css
				$(this).animate( {backgroundColor: "#808080"}, 1000)
				openedCard.animate( {backgroundColor: "#808080"}, 1000)

				openedCard = null;
			}
		}

		else
		{
			var click_index = $(this).attr("id");
			var new_color = newcolors[click_index-1];

			openedCard = $(this).css('background-color', new_color);

			if (clickCounter >= newcolors.length+5) {
				$('#title').html('You lose. Haha!');
				$('#board').html('<img src="/static/end.gif" style="display: block; position: relative; top: 75px; z-index: 10; margin: 0 auto; width: 296px;"/>');
				$('.card').css('background-color', 'black');
				$('.card').off('click');}


		}

	});

});