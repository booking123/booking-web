$(document).ready(function () {

$('.attach-link').click(function(e) {
	e.preventDefault();
	var input_file = $(this).siblings('input[type=file]');
	input_file.click();
});


	$(':file').change(function(){
		var reg = /\.(?=pdf)|\.(?=doc)|\.(?=docx)/i,
			file = this.files[0],
			name = file.name,
			size = file.size / 1000,
			type = file.type,
			link = $(this).siblings('a'),
			mbSize = size / 1024;

		if (name.search(reg) == -1) {
			console.log('ok');
			link.addClass('wrong-type').text('Wrong file format !');
		} else if (mbSize > 8) {
			console.log('ok');
			link.addClass('wrong-type').text('Too large ! Size should be less than 8 MB');
		} else {
			link.removeClass('wrong-type').text(name + ',   ' + 'Size: ' + size + ' KB');
		}
	});
	$('#apply-form').submit(function () {
		var check = true;
		if($('.attach-link').hasClass('wrong-type')) {
			check = false;
		}
		return check;
	});
	//$('#apply-form').submit(function (e) {
	//	e.preventDefault();
	//
	//	$.ajax({
	//
	//		url: 'getdata',
	//		data: $(this).serialize(),
	//		dataType: 'json',
	//		type: 'post',
	//		enctype: 'multipart/form-data',
	//		success: function (resp) {
	//			if (resp.error) {
	//				return;
	//			}
	//		}
	//
	//	});
	//
	//	return false;
	//});
});
