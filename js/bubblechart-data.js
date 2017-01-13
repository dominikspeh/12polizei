$( document ).ready(function() {
	initBubbleData();
	initGrid();
});


function initBubbleData() {
	function bubble(label, value, className) {
		this.label = label;
		this.value = value;
		this.className = className;
	}

	var bubbleItemList = [];

	bubbleItemList.push(new bubble("Bargeld, Münzen und Wertpapiere", 57.8, "bargeld"));
	bubbleItemList.push(new bubble("Schmuck und Uhren", 57.5, "schmuck"))
	bubbleItemList.push(new bubble("Elektrogeräte", 56.6, "elektrogeraete"));
	bubbleItemList.push(new bubble("Ausweispapiere, EC- und Kreditkarte", 11.7, "ausweispapiere"));;
	bubbleItemList.push(new bubble("Kleidung", 10.0, "kleidung"));
	bubbleItemList.push(new bubble("Alkohol und Zigaretten", 3.5, "alkohol"));
	bubbleItemList.push(new bubble("Tresor", 3.7, "tresor"));
	bubbleItemList.push(new bubble("Kraftfahrzeug- schlüssel", 2.8, "kraftfahrzeugschluessel"));
	bubbleItemList.push(new bubble("Kunstgegenstände", 2.6, "kunstgegenstaende"));
	bubbleItemList.push(new bubble("Nahrungsmittel", 2.6, "nahrungsmittel"));
	bubbleItemList.push(new bubble("Waffen und Munition", 2.6, "waffen"));
	
	loadBubbles(bubbleItemList);
}

function initGrid() {
	$('.grid').masonry({
	  // options
	  itemSelector: '.grid-item',
	  columnWidth: 200
	});
}

function loadBubbles(bubbleItemList) {
	console.log(bubbleItemList);
	var countBubble = 0;
	$.each(bubbleItemList, function(key, value) {
		countBubble++;console.log(countBubble+'dd');
		var title = value.title;
		var percent = value.value;
		var percentFormated = percent+"%";
		if(percent<=2)
			var boxSize = parseInt(percent+90);
		else if(percent<5)
			var boxSize = parseInt(percent+120);
		else if(percent>=5 && percent<20)
			var boxSize = parseInt(percent+160);
		else if(percent>=20)
			var boxSize = parseInt(percent+200);
		
		$("#gridStehlgueter").append('<div class="grid-item ' + value.className + '"><div class="bubble"><div class="turnaround"><div class="front"><div class="icon"></div></div><div class="back"><div class="percent"><span class="text">' + value.label + '</span>' + percentFormated + '</div></div></div></div></div>');
		
		var gridBox = $(".grid-item."+value.className);
		var bubbleBox = $(".grid-item."+value.className+" .bubble");
		var percentBox = $(".grid-item."+value.className+" .bubble .percent");
		
		gridBox.width(boxSize);
		gridBox.height(boxSize);
		bubbleBox.width(boxSize);
		bubbleBox.height(boxSize);
		percentBox.width(boxSize);
		percentBox.height(boxSize);
	});
}