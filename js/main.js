$(document).ready(function(){

	$('#add-item-form').on('submit', function(e){
		additem(e);
	});


	$('#edit-item-form').on('submit', function(e){
		updateitem(e);
	});


	$('#item-table').on('click','#remove-item', function(){
		id = $(this).data('id');
		removeitem(id);
	});


	$('#clear-items').on('click', function(){
		clearAllitems();
	});

	displayitems();


	function displayitems(){
		var itemList =  JSON.parse(localStorage.getItem('items'));


		if(itemList != null){
			itemList = itemList.sort(sortByTime);
		}


		var i = 0;

		if(localStorage.getItem('items') != null){

			$.each(itemList, function(key, value){
				$('#item-table').append('<tr id="'+ value.id +'">' +
										'<td>' + value.item + '</td>' +
										'<td>' + value.item_priority + '</td>' +
										'<td>' + value.item_date + '</td>' +
										'<td>' + value.item_time + '</td>' +
										'<td><a href="edit.html?id='+ value.id +'">Edit</a> | <a href="#" id="remove-item" data-id="'+ value.id +'">Remove</a></td>' +
										'</tr>');
			})
		}
	}


	function sortByTime(a, b){
		var aTime = a.item_time;
		var bTime = b.item_time;
		return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
	}



	function additem(e){

		var newDate = new Date();
		id = newDate.getTime();

		var item = $('#item').val();
		var item_priority = $('#priority').val();
		var item_date = $('#date').val();
		var item_time = $('#time').val();


		if(item == ''){
			alert('item is required');
			e.preventDefault();
		} else if(item_date == '') {
			alert('Date is required');
			e.preventDefault();
		} else if(item_time == ''){
			alert('Time is required');
			e.preventDefault();
		} else if(item_priority == ''){
			item_priority = 'normal';
		} else {
			items = JSON.parse(localStorage.getItem('items'));


			if(items == null){
				items = [];
			}

			var itemList = JSON.parse(localStorage.getItem('items'));


			var new_item = {
				"id": id,
				"item": item,
				"item_priority": item_priority,
				"item_date": item_date,
				"item_time": item_time
			}

			items.push(new_item);
			localStorage.setItem('items', JSON.stringify(items));

			console.log('item Added');
		}
	}


	function updateitem(e){
		var id = $('#item_id').val();
		var item = $('#item').val();
		var item_priority = $('#priority').val();
		var item_date = $('#date').val();
		var item_time = $('#time').val();

		itemList = JSON.parse(localStorage.getItem('items'));

		for(var i=0; i < itemList.length; i++){
			if(itemList[i].id == id){
				itemList.splice(i,1)
			}
			localStorage.setItem('items', JSON.stringify(itemList));
		}


		if(item == ''){
			alert('item is required');
			e.preventDefault();
		} else if(item_date == '') {
			alert('Date is required');
			e.preventDefault();
		} else if(item_time == ''){
			alert('Time is required');
			e.preventDefault();
		} else if(item_priority == ''){
			item_priority = 'normal';
		} else {
			items = JSON.parse(localStorage.getItem('items'));


			if(items == null){
				items = [];
			}

			var itemList = JSON.parse(localStorage.getItem('items'));


			var new_item = {
				"id": id,
				"item": item,
				"item_priority": item_priority,
				"item_date": item_date,
				"item_time": item_time
			}

			items.push(new_item);
			localStorage.setItem('items', JSON.stringify(items));
		}
	}


	function removeitem(id){
		if(confirm('Are you sure you want to delete this item?')){
			var itemList = JSON.parse(localStorage.getItem('items'));

			for(var i=0; i < itemList.length; i++){
			if(itemList[i].id == id){
				itemList.splice(i,1)
			}
			localStorage.setItem('items', JSON.stringify(itemList));
		}

		location.reload();

		}
	}


	function clearAllitems(){
		if(confirm('Do you want to clear all items?')){
			localStorage.clear();
			location.reload();
		}
	}
});



function getitem(){
	var $_GET = getQueryParams(document.location.search);
	id = $_GET['id'];

	var itemList = JSON.parse(localStorage.getItem('items'));

	for(var i=0; i < itemList.length; i++){
		if(itemList[i].id == id){
			$('#edit-item-form #item_id').val(itemList[i].id);
			$('#edit-item-form #item').val(itemList[i].item);
			$('#edit-item-form #priority').val(itemList[i].item_priority);
			$('#edit-item-form #date').val(itemList[i].item_date);
			$('#edit-item-form #time').val(itemList[i].item_time);
		}
	}
}


function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}
