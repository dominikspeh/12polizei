$( document ).ready(function() {
	initTreeData();
});

function displayTooltip(element) {
	$(element).hover(
		function() { $(this).siblings('.element1').mouseenter(); },
		function() { $(this).siblings('.element1').mouseleave(); }
	);
}

function initTreeData() {
	function tree(label, description, className, value) {
		this.label = label;
		this.description = description;
		this.className = className;
		this.value = value;
	}
	
	var treeItemList = [];

	treeItemList.push(new tree("Sonstiges", "z.B. Gartengeräte, Steine, Drähte", "sonstiges", 30.7));
	treeItemList.push(new tree("Dietrich", "", "dietrich", 1.3));
	treeItemList.push(new tree("Hammer", "", "hammer", 3.0));
	treeItemList.push(new tree("Brechstange", "Kuhfuß, Nageleisen, Stemmeisen", "brechstange", 12.7));
	treeItemList.push(new tree("Meißel", "", "meissel", 1.0));
	treeItemList.push(new tree("EC-Karte", "", "ec-karte", 3.7));
	treeItemList.push(new tree("Schraubendreher", "", "schraubendreher", 42.6));
	treeItemList.push(new tree("Akkubohrer", "", "akkubohrer",3.0));
	treeItemList.push(new tree("Gabelschlüssel", "", "gabelschluessel", 2.3));

	createTreeMap(treeItemList);
}

function createTreeMap(treeItemList) {
	$('div#my-treemap').treemap(treeItemList, {
		  nodeClass: function(node, box){
			if(node.value <= 50){
			  return 'minor';
			}
			return 'major';
		  },
		  mouseenter: function (node, box) {
		  },
		  itemMargin: 2
	});
}