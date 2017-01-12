$( document ).ready(function() {
	initTreeData();
});


function initTreeData() {
	function tree(label, value) {
		this.label = label;
		this.value = value;
	}
	
	var treeItemList = [];

	treeItemList.push(new tree("Sonstiges", 30.7));
	treeItemList.push(new tree("Dietrich", 1.3));
	treeItemList.push(new tree("Hammer", 3.0));
	treeItemList.push(new tree("Brechstange", 12.7));
	treeItemList.push(new tree("Meißel", 1.0));
	treeItemList.push(new tree("EC-Karte", 3.7));
	treeItemList.push(new tree("Schraubendreher", 42.6));
	treeItemList.push(new tree("Akkubohrer", 3.0));
	treeItemList.push(new tree("Gabelschlüssel", 2.3));

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