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

	console.log('clickCounter');
	console.log(clickCounter);


	$('.card').click( function() {
		clickCounter++;
		
		// logic: check if card 1 == card 2

		if (openedCard != null)

		{
			//you know a card has been clicked

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
				matchedCounter++
			}
			else
			{
				// cards don't match, reset $(this) css and openedCard css
				// make it fade out pretty-like using jquery-ui.min.js
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
			console.log("clicked my first card");

			console.log(matchedCounter);
			console.log(clickCounter);

			if (matchedCounter == (newcolors.length/2)) {
	 			$('#title').html('You win! Yay!')
	 			//
	 			$('.card').off('click');
	 			}

			if (clickCounter >= newcolors.length+5) {
				$('#title').html('You lose. Haha!')
				$('.card').css('background-color', 'black');
				$('.card').off('click');
			}
		}







	});

});