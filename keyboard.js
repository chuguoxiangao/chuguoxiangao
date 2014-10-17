(function () {
	//�������ּ���
	function createKeyboardNum(id) {
		var obj = document.createElement('div');
		obj.className = 'KeyboardNum';
		obj.id = id;
		obj.innerHTML = '';
		obj.innerHTML += '<div class="KeyboardKey" value="1">1</div>';
		obj.innerHTML += '<div class="KeyboardKey" value="2">2</div>';
		obj.innerHTML += '<div class="KeyboardKey" value="3">3</div>';
		obj.innerHTML += '<div class="KeyboardKey" value="4">4</div>';
		obj.innerHTML += '<div class="KeyboardKey" value="5">5</div>';
		obj.innerHTML += '<div class="KeyboardKey" value="6">6</div>';
		obj.innerHTML += '<div class="KeyboardKey" value="7">7</div>';
		obj.innerHTML += '<div class="KeyboardKey" value="8">8</div>';
		obj.innerHTML += '<div class="KeyboardKey" value="9">9</div>';
		obj.innerHTML += '<div class="KeyboardKey" value="�˸�">�˸�</div>';
		obj.innerHTML += '<div class="KeyboardKey" value="0">0</div>';
		obj.innerHTML += '<div class="KeyboardKey" value="���">���</div>';
		//obj.innerHTML += '<div class="KeyboardKey" value=".">��</div>';
		return obj;
	}

	if (checkOS('IE8.0')) {
		$('body').on('mousedown', '.KeyboardKey', function () {
			$(this).addClass('active');
		});
		$('body').on('mouseup mouseout', '.KeyboardKey', function () {
			var obj = this;
			setTimeout(function () {
				$(obj).removeClass('active');
			}, 50);
		});
	}

	//�����̲��뵽ָ���ط�
	function append(obj, clickFn) {
		if (typeof clickFn != 'function') clickFn = function () { };
		if ($('#' + obj.id).children('.KeyboardNum').length == 0) {
			var tempId = 'KeyboardNum' + new Date().getTime().toString();
			$('#' + obj.id).append(createKeyboardNum(tempId));
			if (typeof obj.dot == 'string') {
				$('#' + obj.id + ' .KeyboardNum .KeyboardKey[value="���"]').html(obj.dot);
				$('#' + obj.id + ' .KeyboardNum .KeyboardKey[value="���"]').attr('value', obj.dot);
			}
			if (checkOS('IE8.0')) {
				var keyList = $('#' + tempId + ' .KeyboardKey').each(function (i, e) {
					$(this).addClass('KeyboardKey_L' + (parseInt(i / 3) + 1));
					$(this).addClass('KeyboardKey_R' + ((i % 3) + 1));
				});
			}
			if (obj.dot == '.') {

			}
			else if (obj.dot == 'X') {
				$('#' + obj.id + ' .KeyboardNum .KeyboardKey[value="X"]').css('background-position-y', '-256px');
			}
			else {
				$('#' + obj.id + ' .KeyboardNum .KeyboardKey[value="���"]').css('background-position-y', '-320px');
			}
		}
		else {
			var tempId = $('#' + obj.id).children('.KeyboardNum')[0].id;
		}
		$('#' + tempId).children('.KeyboardKey').unbind();
		$('#' + tempId).children('.KeyboardKey').html('');//zw 2014-06-30 ����ͼƬ����������
		$('#' + tempId).children('.KeyboardKey').click(function () {
			var tempKey = $(this).attr('value');
			clickFn(tempKey);
		});
		return $('#' + tempId);
	}

	//�����б�
	this.Keyboard = {
		append: append
	}
})();