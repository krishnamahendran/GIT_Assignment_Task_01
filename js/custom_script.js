var jsonValues;
$( document ).ready(function() {
	$.getJSON('products.json', function (data) {
		jsonValues = [...data];
		var template = $("#product_template").html();
		var text = Mustache.render(template, { products: data });
		$("#product").html(text);
		
		var typetemplate = $("#product_type_list").html();
		var typelistValue = duplicateValuesRemove(data, "type");
		var type = Mustache.render(typetemplate, { productsType: typelistValue });
		$("#product-type").html(type);
	});
	
	setTimeout(function(){ 
		var productCount = $(".js-product-list");
		$(".js-product-count h5").append(productCount.length+" items");
		var wavesContent = $(".js-content-wraper-waves").html();	
		$(".js-product-group .js-product-list:nth-child(5)").after(wavesContent);
	}, 1000);
	
	
	$('.product-sort').on('change', function(){
		var sortList;
		var selectedValue = $(this).children("option:selected").val();
		if(selectedValue == "asc"){
			sortList = sortProduct(jsonValues, "price", '0');
		}else if(selectedValue == "desc"){
			sortList = sortProduct(jsonValues, "price", '1');
		}else if(selectedValue == "rating-desc"){
			sortList = sortProduct(jsonValues, "rating", '1');
		}else if(selectedValue == "newest-desc"){
			sortList = jsonValues;
		}else{
			sortList = jsonValues;
		}
		
		var template = $("#product_template").html();
		var text = Mustache.render(template, { products: sortList });
		$("#product").html(text);
		var wavesContent = $(".js-content-wraper-waves").html();	
		$(".js-product-group .js-product-list:nth-child(5)").after(wavesContent);
	});
	
	$(document).on('click', '.js-slide-down-list', function(){
		$(this).parent().find(".js-show-hide").slideToggle();
		$(this).toggleClass('js-slide-down-open');
	});
	$(document).on('click', '.js-mobil-menu i', function(){
		$(this).parents().find(".site-header__top--navlist").slideToggle();
	});
	
	$(document).on('click', '.js-quick-shop', function(event){
		$(this).parents().next(".quick_shoh").addClass("js-show-quick-shop");
		var result = $(this).parent().prev().html();
		$(this).parents().next(".quick_shoh").append(result);
		event.preventDefault();	
	});
	$(document).on('click', '.js-close-icon', function(event){
		$(this).parent().removeClass("js-show-quick-shop");
		$(this).parent('.quick_shoh').empty();
		event.preventDefault();	
	});
});
function duplicateValuesRemove(product, type) {
	return product.filter((obj, pos, arr) => {
		return arr.map(mapObj => mapObj[type]).indexOf(obj[type]) === pos;
	});
}
function sortProduct(arr, key, way) {
	return arr.sort(function(a, b) {
		var x = a[key]; var y = b[key];
		if (way === '0') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
		if (way === '1') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
	});
}