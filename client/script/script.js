$(function() {
	
	$('#start').css('height',$(window).height() + 'px');
	$('#editorWindow').css('height',$(window).height() + 'px');
	$('#upE').css('height',$(window).height()-100 + 'px');
	$('#neE').css('height',$(window).height()-100 + 'px');
	$('#logo').css('margin-left',($(window).width()-128)/2 + 'px');
	
	var timeOut,dl;
	var online = true;
	
	var editor = ace.edit("upE");
	var editor2 = ace.edit("neE");
	editor.setTheme('ace/theme/monokai');
	editor2.setTheme('ace/theme/monokai');
	editor.getSession().setMode("ace/mode/xml");
	editor2.getSession().setMode("ace/mode/xml");
	
	///////get mode
	var currentMode = 'xml';
	function getMode(lang) {
		editor.getSession().setMode("ace/mode/" + lang);
		editor2.getSession().setMode("ace/mode/" + lang);
		$('#mode').text(lang);
		currentMode = lang;
	}
	
	///////change mode dialouge
	$('#mode').click(function(e) {
		e.stopPropagation();
		$('#modeOp').css({
			'height':'580px',
			'margin-top':'-60px',
			'z-index':'90',
			'opacity':'1'
		});
		$(window).click(function() {
			$('#modeOp').css({
				'height':'20px',
				'margin-top':'50px',
				'z-index':'5',
				'opacity':'0'
			});
		});
	});
	
	///////upload
	$('#up').click(function() {
		$('.hidden').trigger('click',function() {});
		$('.hidden').change(function() {
			clearTimeout(timeOut);
			timeOut = setTimeout(function() {
				$('#logo').css({
					'width':'50px',
					'height':'50px',
					'margin-top':'5px',
					'margin-left':'3%'
				});
				$('#start').css('height','60px');
				$('#start h1').css('display','none');
				$('#btGr').css({
					'width':'25%',
					'height':'60px',
					'margin-top':'-7px',
					'position':'absolute',
					'margin-left':'10%'
				});
				$('#btGr button').css({
					'padding':'5px 10px 5px 10px',
					'font-size':'15px',
				});
				$('#btGr button:active').css({
					'-webkit-box-shadow':'inset 0 1px 1px #169d50',
					'-moz-box-shadow':'inset 0 1px 1px #169d50',
					'box-shadow':'inset 0 1px 1px #169d50'
				});
				$('footer').css('display','none');
				$('#upE').css('display','inline-block');
				$('#neE').css('display','none');
				$('#download').css('display','inline-block');
			},500);
			
			if (FileReader) {
				var reader = new FileReader();
				var selected_file = $('.hidden').get(0).files[0];
				reader.readAsText(selected_file, "UTF-8");
				reader.onload = function (evt) {
					editor.setValue(evt.target.result,-1);
    			};
				$('#size').text(Math.floor(selected_file.size/1024) + 'KB');
				$('#name').val(selected_file.name);
				if (selected_file.name.substr(-5,5) == '.html'
				   || selected_file.name.substr(-5,5) == '.haml'
				   || selected_file.name.substr(-5,5) == '.jade') {
					getMode('html');
				} else if (selected_file.name.substr(-4,4) == '.css'
						  || selected_file.name.substr(-5,5) == '.less'
						  || selected_file.name.substr(-5,5) == '.scss'
						  || selected_file.name.substr(-5,5) == '.sass'
						  || selected_file.name.substr(-5,5) == '.styl') {
					getMode('css');
				} else if (selected_file.name.substr(-3,3) == '.js'
						  || selected_file.name.substr(-7,7) == '.coffee') {
					getMode('javascript')
				} else if (selected_file.name.substr(-4,4) == '.clj') {
					getMode('markdown');
				} else if (selected_file.name.substr(-3,3) == '.vb'
							|| selected_file.name.substr(-3,3) == '.cs'
							|| selected_file.name.substr(-4,4) == '.jsl') {
					getMode('csharp');
				} else if (selected_file.name.substr(-5,5) == '.java'
							|| selected_file.name.substr(-4,4) == '.jar') {
					getMode('java');
				} else if (selected_file.name.substr(-4,4) == '.tex') {
					getMode('latex');
				} else if (selected_file.name.substr(-3,3) == '.md') {
					getMode('markdown');
				} else if (selected_file.name.substr(-2,2) == '.m') {
					getMode('objectivec');
				} else if (selected_file.name.substr(-4,4) == '.pas') {
					getMode('pascal');
				} else if (selected_file.name.substr(-3,3) == '.pl') {
					getMode('perl');
				} else if (selected_file.name.substr(-4,4) == '.php') {
					getMode('php');
				} else if (selected_file.name.substr(-3,3) == '.py') {
					getMode('python');
				} else if (selected_file.name.substr(-3,3) == '.rb') {
					getMode('ruby');
				} else if (selected_file.name.substr(-4,4) == '.xml') {
					getMode('xml');
				} else {
					editor.getSession().setMode("ace/mode/xml");
					$('#mode').text('Plain text');
				}
			} else {
				alert('Your browser don\'t support file reader so you can\'t upload file. Try create new project');
			}
			
			///////file saver
			$('#download').click(function() {
				dl = new Blob([editor.getValue()], {type: "text/plain;charset=utf-8"});
				saveAs(dl, $('#name').val());
			});
		});
	});
	
	///////New document
	$('#ne').click(function() {
		clearTimeout(timeOut);
		timeOut = setTimeout(function() {
			$('#logo').css({
				'width':'50px',
				'height':'50px',
				'margin-top':'5px',
				'margin-left':'3%'
			});
			$('#start').css('height','60px');
			$('#start h1').css('display','none');
			$('#btGr').css({
				'width':'25%',
				'height':'60px',
				'margin-top':'-7px',
				'position':'absolute',
				'margin-left':'10%'
			});
			$('#btGr button').css({
				'padding':'5px 10px 5px 10px',
				'font-size':'16px',
			});
			$('#btGr button:active').css({
				'-webkit-box-shadow':'inset 0 1px 1px #169d50',
				'-moz-box-shadow':'inset 0 1px 1px #169d50',
				'box-shadow':'inset 0 1px 1px #169d50'
			});
			$('footer').css('display','none');
			$('#neE').css('z-index','25');
			$('#upE').css('z-index','20');
			$('#download').css('display','inline-block');
			
			///////file saver
			$('#download').click(function() {
				dl = new Blob([editor2.getValue()], {type: "text/plain;charset=utf-8"});
				saveAs(dl, $('#name').val());
			});
		},500);
	});
	
	///////real-time sockets
	var socket = io.connect();
	function addBroadCast() {
		if (online) {
			socket.emit('upEC', {
				'name': $('#name').val(),
				'size': $('#size').text(),
				'mode': $('#mode').text(),
				'off': $('#offMode').text(),
				'editor': editor.getSession().getValue()
			});
			socket.emit('neEC', {
				'name': $('#name').val(),
				'size': $('#size').text(),
				'mode': $('#mode').text(),
				'off': $('#offMode').text(),
				'editor': editor2.getSession().getValue()
			});
		}
	};
	$('#upE').keyup(function() {
		if (online) {
			socket.emit('upEC', {
				'name': $('#name').val(),
				'size': $('#size').text(),
				'mode': $('#mode').text(),
				'off': $('#offMode').text(),
				'editor': editor.getSession().getValue()
			});
		} 
		$('#size').text(Math.floor(editor.getSession().getValue().length/1024) + 'KB');
	});
	socket.on('upECTOUSE',function(data) {
		if (online) {
			$('#upE').css('display','inline-block');
			$('#neE').css('display','none');
			editor.setValue(data.editor,1);
			editor.focus();
			$('#name').val(data.name);
			$('#size').text(data.size);
			getMode(data.mode);
			if (data.off == 'Online') {
				$('#offMode').text('Online');
				online = true;
			} else {
				$('#offMode').text('Offline');
				online = false;
			}
		}
	});
	
	$('#neE').keyup(function (e) {
		if (online) {
			socket.emit('neEC', {
				'name': $('#name').val(),
				'size': $('#size').text(),
				'mode': $('#mode').text(),
				'off': $('#offMode').text(),
				'editor': editor2.getSession().getValue()
			});
		}
		$('#size').text(Math.floor(editor2.getSession().getValue().length/1024) + 'KB');
	});
	socket.on('neECTOUSE',function(data) {
		if (online) {
			$('#neE').css('z-index','25');
			$('#upE').css('z-index','20');
			editor2.setValue(data.editor,1);
			editor2.focus();
			$('#name').val(data.name);
			$('#size').text(data.size);
			getMode(data.mode);
			if (data.off == 'Online') {
				$('#offMode').text('Online');
				online = true;
			} else {
				$('#offMode').text('Offline');
				online = false;
			}
		}
	});
	// +++Additional event to broadCast
	$('#name').change(function() {
		addBroadCast();
	});
	$('#mode').change(function() {
		addBroadCast();
	});
	$('#size').change(function() {
		addBroadCast();
	});
	$('#offMode').change(function() {
		addBroadCast();
	});
	
	///////editor mode
	$('#html').click(function() {
		getMode('html');
	});
	$('#css').click(function() {
		getMode('css');
	});
	$('#js').click(function() {
		getMode('javascript');
	});
	$('#plain').click(function() {
		getMode('xml');
		$('#mode').text('Plain text');
	});
	$('#clojure').click(function() {
		getMode('clojure');
	});
	$('#cs').click(function() {
		getMode('csharp');
		$('#mode').text('C#');
	});
	$('#go').click(function() {
		getMode('golang');
		$('#mode').text('Go');
	});
	$('#java').click(function() {
		getMode('java');
	});
	$('#latex').click(function() {
		getMode('latex');
	});
	$('#md').click(function() {
		getMode('markdown');
	});
	$('#objc').click(function() {
		getMode('objectivec');
	});
	$('#pascal').click(function() {
		getMode('pascal');
	});
	$('#perl').click(function() {
		getMode('perl');
	});
	$('#php').click(function() {
		getMode('php');
	});
	$('#python').click(function() {
		getMode('python');
	});
	$('#ruby').click(function() {
		getMode('ruby');
	});
	
	///////offline mode 
	$('#offMode').click(function() {
		if ($('#offMode').text() == 'Online') {
			online = false;
			$('#offMode').text('Offline');
			$('#offMode').css('color','#c0392b');
		} else if ($('#offMode').text() == 'Offline') {
			online = true;
			$('#offMode').text('Online');
			$('#offMode').css('color','#8e44ad');
		}
	});
	
	///////auto turn on offline mode
	if (!navigator.onLine) {
		online = false;
		$('#offMode').text('Offline');
		$('#offMode').css('color','#c0392b');
	} else {
		online = true;
		$('#offMode').text('Online');
		$('#offMode').css('color','#8e44ad');
	}
	
});