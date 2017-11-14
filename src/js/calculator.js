/**
 * Кредитный калькулятор
 * @author Artur Burtsev
 * 
 * @param {String} frm 				селектор формы калькулятора
 * @param {String} resultContainer	селектор контенера результатов
 */

function calc( frm, resultContainer )
{
	// елси не найдены настройки
	if (!ctrl || !rslt) return;

	var _this = this;
	// режим отображение графика платежей
	var fullGraphMode = false;

	//Кэш
	var cch = 
	{
		sum:  { type: '1', val: 100000, valid: false },		// сумма кредита
		vznos:  { type: '1', val: 0, valid: true },		// сумма кредита
		term: { type: '2', val: 600, valid: true },		// срок кредита
		rate: { type: '1', val: 0, valid: true },		// процентная ставка
		comm: { type: '1', val: 0, valid: true },		// единовременная комиссия
		mcom: { type: '1', val: 0, valid: true },		// ежемесячная коммисия
		kind: { type: '1', val: 0, valid: true }		// тип платежа
	};
	/**
	 * Инициализация элементов управления калькулятора
	 */
	this.init = function(){
		// инициализация слайдеров
		for( var obj in ctrl ) {
			// проставление и выделение типа
			if ( ctrl[obj].radio ){
				cch[obj].type = $( frm + ' input:checked[name=' + ctrl[ obj].radio + ']').val() || 1;
				$( 'label[for="' + ctrl[obj].radio + cch[ obj ].type + '"]' ).addClass( 'selected' );
			}
			// проставление значений
			if ( ctrl[obj].input ){
				// полу, содержащее исходное значение
				var node = $( ctrl[ obj ].input )[0];
				// допустимые пределы для данного поля
				var range = ctrl[ obj ].type[ cch[ obj ].type ];
				// преобразование и проверка имеющегося значения
				var val = Number( node.value && node.value.replace( /\s/g, '' ).replace( ',', '.' ) );
				// если значение не корректно, к кэш записывается минимально допустимое для данного поля
				cch[obj].val = val != NaN && val == calc.fn.filter( val, range ) ? val : range.minValue;				
				// и оно же добавляется в поле
				node.value = calc.fn.format( cch[obj].val, range.format );
			}
			// инициализация слайдеров
			if ( ctrl[ obj ].slider ){
				// safari и chrome тербуют задержки для корректной инициализации слайдера
				setTimeout( 
					( function( fld ){ 
						return function(){ 
							_this.recalcslider( fld );
							new _this.speeder( fld );
						};
					} )( obj ), 
					50
				);
			}
		};
		
		// неактивность элементов
		if( cch.mcom.type == '2' || cch.kind.type == '1' )
			$( frm + ' input[name="' + ctrl.mcom.cond + '"]' ).attr( 'disabled', 'disabled' );
		
		// валидация текстовых полей
		$( frm + ' :text' ).bind('keyup keydown paste', function(e){ _this.processInput( e ); } );

		$('.additional input[type=text]').bind('keyup keydown paste', function(e){ _this.processInput( e ); } );
		
		// после окончания редактирования - пересчёт значений
		$( frm + ' :text' ).blur( function(e){ _this.chvalue( this ); } );
		
		// обработка изменения режимов расчёта
		$( frm +' :radio' ).on("ifClicked", function(e){ _this.chmode( this ); } );
		
		$( frm +' select' ).change( function(e){ _this.chmode( this ); } );
		
		// предотвращение перезагрузки страницы
		$( frm ).submit( function(){ return false;} );

		// при изменении размеров окна нужно пересчитать позиции слайдеров
		var fixOnResize = function(){
			for( var fld in ctrl ) 
				if( ctrl[ fld ].slider ) {
					var sliderVal = Math.round( cch[ fld ].val / ctrl[ fld ].type[ cch[ fld ].type ].factor );
					//$( ctrl[ fld ].slider ).slider( 'moveTo', sliderVal, null, true );
					$( ctrl[ fld ].slider ).slider( 'value', sliderVal );					
					new _this.speeder( fld );
				}
		}
		var ieResize;
		// пересчёт слайдеров после измененеия размера окна
		//$( window ).resize( jQuery.browser.msie ? function(){ clearTimeout(ieResize); ieResize = setTimeout( fixOnResize, 200 ); } : fixOnResize );
		
		// добавление структуры для отображения результатов
		//$( resultContainer ).append( '<div id="' + resultContainer.replace('#','') + '_summary_container"></div>' );
		//$( resultContainer ).append( '<div id="' + resultContainer.replace('#','') + '_graph_container"></div>' );

		// первоначальный подсчёт значений
		_this.recalc();
	}

	/**
	 * пересчёт позиции и границ слайдера
	 * @param {String} field название поля элемента в конфигурации
	 */
	this.recalcslider = function( field ){
		// объект с настройками для поля слайдера
		var obj = ctrl[ field ];
		// информация о допустимых значениях поля
		var cfg = obj.type[ cch[ field ].type ];
		// коэффицент для пересчёта мин/мах значений слайдера
		var formatFactor = cfg.factor;
		// минимальное и максимальное значения
		var minVal = cfg.minValue / formatFactor;
		var maxVal = cfg.maxValue / formatFactor;

		// уничтожение старого слайдера
		$( obj.slider ).slider( 'destroy' );
		// создание слайдера с правильными настройками
		$( obj.slider ).slider(
			{
				min: minVal,
				max: maxVal,
				value: cch[ field ].val / formatFactor,
				range: 'min',
				
				slide: function( e, ui ) {
					// значение пересчитанное из системы слайдера в систему калькулятора
					var val = Math.round( ui.value * formatFactor * 100 ) / 100;
					// кэширование
					cch[ field ].val = val;
					// запись в поле ввода
					_this.validate( $( obj.input )[0], val+'', true );
				},
				stop: function( e, ui ) {
					_this.recalc();
				}
			}
		);
		// инициализация индикаторов границ
		$( obj.slider + ' span.limitLeft' ).text( calc.fn.format( cfg.minValue, cfg.format ) );
		$( obj.slider + ' span.limitRight' ).text( calc.fn.format( cfg.maxValue, cfg.format ) );
	}

	/**
	 * 4-х диапазонный регулятор скорости изменения значения
	 * @param {} field название поля элемента в конфигурации
	 */
	this.speeder = function( field ){
		var self = this;
		var target, interval, direction, delay = 0, negative = false;

		/**
		 * Инициализация
		 */
		this.init = function(){

			// элементы управления
			var speeder = $( ctrl[ field ].slider + '_speeder' );
			var wrapper = speeder.parent();
			
			// половина целой части в процентах ( кэш для вычисления сдвига )
			var half = 100 * 2 / ( wrapper.width() - speeder.width() );
			// поле со значением для обновления
			target = $( ctrl[ field ].input )[0];
			// уничтожение старого спидера
			//speeder.draggable( "destroy" );
			// добавление ползунка
			/*speeder.draggable(
				{
					//containment: jQuery.browser.safari ? null : wrapper,
					containment: 'parent',
					axis: 'x',
					drag: function( e, ui ){
						var position = ui.position['left'];
						// позиция спидера в процентах отклонения от центрального положения
						var pos = half * position;
						// изменение значений по шагу 25: -100, -75, -50, -25, 25, 50, 75, 100
						pos = pos > 0 ? Math.ceil( pos / 25 ) * 25 : -Math.ceil( -pos / 25 ) * 25;
	
						// в при возвращении в 0 пересчёт завершается
						if ( Math.round( position ) == 0 ){
							// остановка изменения поля
							clearInterval( interval );
							// очистка задержки
							delay = 0;
						}
						// если задержка изменилась
						else if ( pos < 0 != negative || delay != self.getDelay( pos ) ){
							// инициализация нового таймера, меняющего значения
							self.initTimer( pos );
							// проверка резкой смены направления
							negative = pos < 0;
						}
					},
					stop: function( e, ui ){
						// остановка изменения поля
						clearInterval( interval );
						// возвращение ползунка в центральное положение
						$( this ).animate( { left: 0 }, 200 );
						// пересчёт платежей в соответсвии с изменениями
						_this.chvalue( target );
						// очистка задержки
						delay = 0;
					}
				}
			)*/
		};
		
		/**
		 * Формирует коэффицент в зависимости от позиции
		 */
		this.getFactor = function( pos ){
			var cfg = ctrl[ field ].type[ cch[ field ].type ];
			// значение одно из 4-х
			if( pos == 25  || pos == -25  ) return cfg.speeder[0];
			if( pos == 50  || pos == -50  ) return cfg.speeder[1];
			if( pos == 75  || pos == -75  ) return cfg.speeder[2];
			if( pos == 100 || pos == -100 ) return cfg.speeder[3];
		};
		
		/**
		 * Формирует задержку в зависимости от позиции
		 */
		this.getDelay = function( pos ){
			return Math.round( pos > 0 ? 411-3*pos : 411+3*pos );
		};
		
		/**
		 * Обновляет цель
		 */
		this.updateTarget = function( pos ){
			// имеющееся значение без фоматирования
			var val = Number( target.value.replace(/\s/g, '' ).replace( ',', '.' ) );
			// изменение значения
			val = pos > 0 ?
				Number( val ) + self.getFactor( pos ) :
				Number( val ) - self.getFactor( pos );
			// сохранение отфильтрованного значения, без пересчёта
			_this.chvalue( target, calc.fn.filter( val, ctrl[ field ].type[ cch[ field ].type ] ) );
		};
		
		/**
		 * Инициализирует таймеры изменения значений
		 */
		this.initTimer = function( pos ){
			// новое значение задержки
			var newDelay =  self.getDelay( pos );
			// очистка близжайшего обновления со старыми параметрами
			setTimeout( (function(oldInterval){return function(){clearInterval(oldInterval)}})(interval), newDelay>delay?delay:newDelay );
			// новое значение задержки
			delay = newDelay;
			// изменение поля с периодом delay
			interval = setInterval( 
				function(){
					self.updateTarget( pos );
				},
				delay	
			 );
		};

		self.init();
	}
	
	/**
	 * обработка пользовательского ввода
	 * @param {Event} e объект события
	 */
	this.processInput = function( e ){
		// редактируемое поле
		var node = e.target;
		if ($(node).attr('id') == 'vznos-percent' || $(node).hasClass('finish'))
			return;
		// введённое в поле значение
		var val = node.value;
		// редактируемое поле
		var fld = calc.fn.getfieldname( node );
		// формат значений поля
		var format = ctrl[fld].type[cch[fld].type].format;

		// если в IE произошло событьие [onpaste]
		if( e.type == 'paste' && window.clipboardData ){
			// отменяется стандартное поведение
			e.preventDefault();
			// значение из буфера берётся для форматирования
			var clipboardVal = window.clipboardData.getData( "text" );
			// текущее выделение	
			var pos = calc.fn.getcaretposition( node );
			// строка вставляется на место курсора или выделения
			val = val.substr( 0, pos[0] ) + clipboardVal + val.substr( pos[1] );
			calc.fn.setcaretposition( node, pos[1] );
		}
		else if( e.type == 'keydown' ){
			// полная валидация и пересчёт по enter
			if( e.keyCode == 13 ){
				_this.chvalue( node );
			}
			// для денежного формата обработка посимвольного удаления
			// игнорирование пробелов в записи числа при удалении
			else if( format == 'money' || fld == 'vznos'){
				// позиция каретки
				var pos = calc.fn.getcaretposition( node );
				// обработка пробела перед кареткой при удалении
				if( e.keyCode == 8 && 
					// если перед кареткой находится пробел
					pos[0]-1 > 0 && val.split('')[ pos[0]-1 ] == ' ' )
					// каретка передвигается через пробел, чтобы удалить цифру
					calc.fn.setcaretposition( node, pos[0]-1 );
				// обработка пробела после каретки при удалении
				else if( e.keyCode == 46 && 
					// если каретка не в конце строки и после неё находится пробел
					pos[0] == pos[1] && pos[0] < val.length && val.split('')[ pos[0] ] == ' ' )
					// каретка передвигается через пробел, чтобы удалить цифру
					calc.fn.setcaretposition( node, pos[0]+1 )
			}
			// валидация будет происходить по событию keyup
			return;
		}
		else if ( e.type == 'keyup' )
		{
			// не нуждаются в обработке клавиши, не меняющие текст
			if( e.ctrlKey && e.keyCode != 88 || e.keyCode != 8 && 0 < e.keyCode && e.keyCode < 45 ) return;
		}
		if( val !== '' )
			_this.validate( node, val, false, e.type == 'paste' && window.clipboardData );
	}

	/**
	 * Проверка корректности введённого в поле значения
	 * @param {Element}	node		проверяемый узел
	 * @param {String} 	value		значение, которое нужно проверить и вставить в узел node	
	 * @param {Boolean} complete	признак того, что редактирование завершено
	 * @param {Boolean} iepaste		признак того, что осуществляется вставка в IE 
	 */
	this.validate = function( node, value, complete, iepaste ){
		if ($(node).hasClass('finish'))
			return;
		// проверяется и присваивается либо переданное, либо введённое
		var val = value !== undefined ? value : node.value;
		// ввод единственной в конце . или , означает, что пользователь будет вводить дробь
		var willHaveFraction = /^[^(\.|,)]+(\.|,)$/.test( val );
		// редактируемое поле
		var fld = calc.fn.getfieldname( node );
		// информация о допустимых значениях поля
		var cfg = ctrl[ fld ].type[ cch[ fld ].type ];
		// формат значений поля
		var format = cfg.format;

		/**
		 * Проверяется наличие недопустимых символов для каждого формата
		 */
		var testFormat = function( val ){
			return !( /money|integer/.test(format) && /\.|,/.test(val) ) && !( /percent|integer/.test(format) && /\s/.test(val) );
		}

		/**
		 * Форматирует и записывает в поле введённое значение
		 * проверяя позицию каретки, если нужно
		 */
		var writeFormatedValue = function(){
			var pos = 0;
			// форматирование введённого значения
			val = calc.fn.format( val, format );
			if( willHaveFraction ) val += ',';
			// манипуляции с курсором производятся только в случае посимвольного ввода
			// сохранение позиции курсора с учётом форматирования
			if( !complete ) pos = calc.fn.getcaretposition( node )[0] + val.length - node.value.length;
			// перезапись значения
			node.value = val
			// восстановление позиции курсора
			if( !complete) calc.fn.setcaretposition( node, pos );
		}

		// удаляется форматирование
		if( format == 'money' ) val = val.replace( /\s/g, '' );
		else if ( format == 'percent' ) val = val.replace( ',', '.' );

		// преобразование к числовому формату
		var num = node.value != '' ? Number( val ) : '';

		cch[fld].valid = complete ?
			// проверяется переданное значение
			num != NaN && num == calc.fn.filter( num, cfg ) &&  testFormat( val ) :
			// при посимвольном вводе валидация нижней границы не отвлекает пользователя
			num == '' || num != NaN && num >= 0 && num <= cfg.maxValue && testFormat( val ) ;
			
		// если введённое значение верно
		if( cch[fld].valid ){
			// значение форматируется, если корректный ввод
			writeFormatedValue();
			// удаление индикации ошибки
			$( node ).removeClass( 'invalid' );
		}
		else{
			/**
			 * значение также продолжает форматироваться для денежного формата
			 * если была допущена ошибка и введены одни цифры
			 * чтобы пользователю было легче обнаружить ошибку
			 */
			if( format == 'money' && /^\d+$/.test( val ) )
				writeFormatedValue();
			/**
			 * если произошла вставка в IE, но значение не валидно
			 * отоброжается результат вставки
			 */
			if( iepaste )
				node.value = val;
			// добавление индикации ошибки

			$( node ).addClass( 'invalid' );
		}

		recount();
	}

	/**
	 * обработка пользовательского ввода
	 * @param {Element} node
	 * @param {String} 	value
	 */
	this.chvalue = function( node, value ) {
		if ($(node).attr('id') == 'vznos-percent' || $(node).hasClass('finish'))
			return;
		var val = value ? value+'' : node.value;
		// название раздела в настройках
		var fld = calc.fn.getfieldname( node );
		// информация о допустимых значениях поля
		var cfg = ctrl[ fld ].type[ cch[ fld ].type ];
		/**
		 * если пользователь ничего не ввёл
		 * и минимальное допустимое значение для поля 0
		 * подставляется 0
		 */
		if( node.value == '' )
			node.value = val = cfg.minValue;
		_this.validate( node, val+'', true );
		// если введено допустимое значение
		if( cch[ fld ].valid )
		{
			// кэширование значения с обратным преобразованием из русского формата
			cch[ fld ].val = Number( node.value.replace( ',', '.' ).replace( /\s/g, '' ) );
			// если нужно - изменение позиции слайдера
			if( ctrl[ fld ].slider ){
				var sliderVal = Math.round( cch[ fld ].val / cfg.factor );				
				// установка нового значение с пересчётом в систему слайдера
				//$( ctrl[ fld ].slider ).slider( 'moveTo', sliderVal, null, true );
				$( ctrl[ fld ].slider ).slider( 'value', sliderVal );
			}
			// пересчёт значений если не было передано значение
			if( !value )
				_this.recalc();
		}
	}

	/**
	 * Обрабока изменения режимов
	 * @param {Element} node
	 */
	this.chmode = function( node )
	{
		var newType = node.value;
		// числовое значение - хранит максимальную точность для кэша
		var newVal = '';
		// строковое значение - хранит необходимое представление
		var stringVal = '';
		// имя поля
		var fld = calc.fn.getfieldname( node );
		// формат отображения введённых значений
		
		if( fld && newType != cch[ fld ].type )
		{
			var format = ctrl[fld].input ? ctrl[fld].type[ newType ].format : '';
			// коэффицент задающий степпинг для слайдера
			var formatFactor = 1;
			// преобразование валюты
			if ( fld == 'sum' )
			{
				newVal = cch.sum.val * ctrl.sum.type[ cch.sum.type ].exchange / ctrl.sum.type[ newType ].exchange;
			}
			// преобразование даты
			else if ( fld == 'term' )
			{
				// год в месяц
				if ( newType == '1' )
					newVal = cch.term.val*12;
				// месяц в год
				else if ( newType == '2' )
					newVal = cch.term.val/12;
			}
			// преобразование единовременной комиссии
			else if ( fld == 'comm' )
			{
				// из суммы в проценты
				if( newType == '1' )
					newVal = cch.comm.val * 100 / cch.sum.val;
				// из процентов в сумму
				else if ( newType == '2' )
					newVal = cch.sum.val * cch.comm.val / 100;
			}
			// преобразование ежемесячной комиссии
			else if ( fld == 'mcom' )
			{
				// из суммы в проценты
				if( newType == '1' ){
					newVal = cch.mcom.val * 100 / cch.sum.val;
					if( cch.kind.type != '1' )
						$( frm + ' input[name="' + ctrl.mcom.cond + '"]' ).removeAttr( 'disabled' );
				}
				// из процентов в сумму
				else if ( newType == '2' ){
					newVal = cch.sum.val * cch.mcom.val / 100;
					$( frm + ' input[name="' + ctrl.mcom.cond + '"]' ).attr( 'disabled', 'disabled' );
				}
			}
			// изменение типа редита
			else if ( fld == 'kind' )
				if ( newType == '1' )
					$( frm + ' input[name="' + ctrl.mcom.cond + '"]' ).attr( 'disabled', 'disabled' );
				else if ( newType == '2' && cch.mcom.type != '2' )
					$( frm + ' input[name="' + ctrl.mcom.cond + '"]' ).removeAttr( 'disabled' );
			
			// изменение значения при новом типе
			if( ctrl[ fld ].input ){
				// вписывание в допустимые пределы
				newVal = calc.fn.filter( newVal, ctrl[ fld ].type[ newType ] );
				// приведение нового значения к необходимой точности
				if ( /money|integer/.test(format) )
					stringValue = Math.round( newVal );
				else if ( format == 'percent' )
					stringValue = ( Math.round( newVal * 100 ) / 100 );
				// отображение пересчитанного значения
				$( ctrl[ fld ].input ).val( calc.fn.format( stringValue, ctrl[ fld ].type[ newType ].format ) );

				// так как вставляется всегда валидное значение
				$( ctrl[ fld ].input ).removeClass( 'invalid' );
			}
			// кэш
			cch[ fld ].type = newType;
			cch[ fld ].val = newVal;
			
			// слайдер
			if( ctrl[ fld ].slider )
				_this.recalcslider( fld );

			// пересчёт значений
			_this.recalc();
			
			// визуализация выделенного контрола
			$( 'label[for^="' + $( node ).attr( 'name' ) + '"]' ).each(
				function(){
					if( $( this ).attr( 'for' ) == $( node ).attr( 'name' ) + cch[ fld ].type )
						$( this ).addClass( 'selected' );
					else
						$( this ).removeClass( 'selected' );
				}
			);
		}
		// пересчёт по изменению порядка ежемесячных отчислений
		else if ( $( node ).attr( 'name' ) == ctrl.mcom.cond )
			_this.recalc();
	}

	/**
	 * Пересчёт результатов
	 */
	this.recalc = function()
	{
		// кэш для формирования структуры таблицы
		var graphCache = new Array();
		
		var containerId = resultContainer.replace('#','');
		var summaryContainer = document.getElementById( containerId + '_summary_container' );
		var graphContainer = document.getElementById( containerId + '_graph_container' );
		
		// сумма кредита
		var creditSum = cch.sum.val-(cch.vznos.type == '1'?cch.vznos.val:cch.sum.val*cch.vznos.val/100);
		$('#vznos-percent').val(((cch.vznos.val * 100) / cch.sum.val).toFixed(0));
		
		// срок кредитования
		var creditTerm = cch.term.type == '1' ? cch.term.val : cch.term.val * 12;
		// годовая процентная ставка
		var percentRate = cch.rate.val / 1200;
		// единовременная комиссия, переведённая в деньги
		var flatCommission = cch.comm.type == '1' ? cch.comm.val * cch.sum.val / 100 : cch.comm.val;

		// вид отображения графика платежей
		var showFullGraph = fullGraphMode || creditTerm < rslt.graph.switchFullCompactValue;
		// изначально остаток задолжности равен полной сумме кредита
		var debtRest = creditSum;

		/**
		 * В следующие две переменные нужно вкладывать значения согласно файлу настроек
		 * т.е. на место каждого названия из файла настроек ( в блоке вычисления параметров платежа
		 * перед вызовом функций, формирующих отчёт ) необходимо подставить соответсвующее значение
		 * предполагается, что в gr на первом месте стоит месяц
		 */
		// строчка значений графика
		var gr = [];
		// значения короткого описания
		var sr = [];

		/**
		 * Формирует одну строку с результатами в кэше
		 */
		var createResultRow = function() {
			var mask = rslt.graph.header[ cch.kind.type ];
			var row = '';
			var rowClass = '';
			
			// либо формировать всю таблицу, либо только 1,2,последнюю строки
			if( showFullGraph || !showFullGraph && ( gr[0]==1 || gr[0]==2 || gr[0]==creditTerm ) )
			{
				// для полного представления графика строкам проставляются оличительные классы
				if( showFullGraph )
					if ( gr[0] % 12 == 0 )
						rowClass = ' class="' + rslt.graph.rowYearClass + ' ' + rslt.graph.rowEvenClass + '"';
					else if ( gr[0] % 2 == 0 )
						rowClass = ' class="' + rslt.graph.rowEvenClass + '"';
					else
						rowClass = ' class="' + rslt.graph.rowOddClass + '"';
				
				row = '<tr' + rowClass + '>' + calc.fn.createcells( gr, mask ).join( '' ) + '</tr>'
			}
			// вывод ссылки на отображение полной таблицы в 3-й строке
			else if ( !showFullGraph && gr[0]==3 )
				row = '<tr' + ( rslt.graph.linkRowClass ? ' class="' + rslt.graph.linkRowClass + '"' : '' ) + 
				'><td colspan="5"><a href="#" ' + 
					( rslt.graph.linkClass ? 'class="' + rslt.graph.linkClass + '"' : '' ) + 
				'>' + rslt.graph.showFullGraphText + '</a></td></tr>';
			return row;
		}

		/**
		 * Формирует и обновляет краткое описание платежа
		 */
		var createPaymentSummary = function() {
			$('#old-results .even td').first().html($("#calculatorResult_summary tr:first td").last().html());
			$('#old-results .odd td').first().html($("#calculatorResult_summary tr:last td").last().html());
			// удаление старого описания
			$( resultContainer + '_summary_container' ).empty();
			
			
			var mask = rslt.summary.header[ cch.kind.type ];
			// ячейки с названиями
			var style = 'style="width:180px; color: gray; font-size:20px; line-height:20px; text-align:right; vertical-align:middle;"';
			if (window.mini == 1)
				style = 'style="width:150px; color: gray; font-size:18px; line-height:18px; text-align:right; vertical-align:middle;"';
			var cap = calc.fn.createcells( mask, mask, false,  style);
			// ячейки со значениями
			style = 'style="color:gray;font-size:20px; line-height:20px; vertical-align:bottom;"'
			if (window.mini == 1)
				style = 'style="color:gray;font-size:16px; line-height:16px; vertical-align:bottom;"'
			var val = calc.fn.createcells( sr, mask ,false, style);
			// кэш для хранения описания
			var summary = new Array();
			for( var i = 0; i < sr.length; i++ )
				summary.push( '<tr class="' + (i % 2 == 0 ? 'even' : '') + '">' + 
					// наименование значения с классом
					( rslt.summary.cellHeaderClass ? cap[i].replace( /<td>/, '<td class="' + rslt.summary.cellHeaderClass + '">') : cap[i] ) + 
					// значение
					val[i] + '</tr>' 
				);
			
			// создание нового описания
			$( resultContainer + '_summary_container' ).append(
			// заголовок таблицы
				'<table cellpadding="5" id="' + containerId + '_summary"' + 
				// класс таблицы
				( rslt.summary.tableClass ? ' class="' + rslt.summary.tableClass + '"' : '' ) + '>' +
				// содержиоме таблицы
				'<tbody>' + summary.join('') + '</tbody>' +
				'</table>'
			);
		}

		/**
		 * Формирует и обновляет таблицу с графиком платежей
		 */
		var createPaymentGraph = function() {

			// имеющийся график платежей
			var graph = document.getElementById( containerId + '_graph' );
			
			// удаление старого графика
			if( graph ) {
				// удаление ссылки для устранения утечек памяти
				$( 'a', graph ).remove();
				graphContainer.removeChild( graph );
			}
			
			// формирование заголовков
			var header = rslt.graph.header[ cch.kind.type ];
			var headerRow = 
				'<tr ' + ( rslt.graph.rowHeaderClass ? 'class="' + rslt.graph.rowHeaderClass + '"' : '' ) + '>' + 
					calc.fn.createcells( header, header, true ).join( '' ) + 
				'</tr>';
			
			// ссылка на отображение компактного графика
			var goToCompactLink = fullGraphMode && creditTerm >= rslt.graph.switchFullCompactValue ? 
				'<tr' + ( rslt.graph.linkRowClass ? ' class="' + rslt.graph.linkRowClass + '"' : '' ) + 
				'><td colspan="5"><a href="#" ' + 
					( rslt.graph.linkClass ? 'class="' + rslt.graph.linkClass + '"' : '' ) +
				'>' + rslt.graph.showCompactGraphText + '</a></td></tr>' : '';
			
			// формирование и добавление нового графика
			graphContainer.innerHTML =
				( rslt.graph.caption ?  '<h3>' + rslt.graph.caption + '</h3>' : '' ) + 
				'<table cellspacing="5" cellpadding="5" id="' + containerId + '_graph" ' + 
					( rslt.graph.tableClass ? 'class="' + rslt.graph.tableClass + '"' : '' ) + '>' + 
					'<thead>' + headerRow + '</thead>' + 
					'<tbody>' + goToCompactLink + graphCache.join( '' ) + '</tbody>' +
				'</table>';
			 
			// отображение всего графика при клике на ссылку в режиме предпросмотра
			$( '#' + containerId + ' a' ).click( function(){ fullGraphMode = !fullGraphMode; _this.recalc(); return false; } );
		}

		// аннуитетный
		if ( cch.kind.type == '1' )
		{
			// ежемесячный платёж
			var annuity = percentRate === 0 ?
				creditSum / creditTerm :
				( creditSum * percentRate ) / ( 1 - 1 / Math.pow( 1 + percentRate, creditTerm ) );
			// ежемесячная коммисия, переведённая в деньги
			var commision = cch.mcom.type == '1' ? cch.mcom.val * creditSum / 100 : cch.mcom.val;
			// Переплата по процентам за кредит
			var percentOverpayment = annuity * creditTerm - creditSum;
			// Итоговая переплата с учетом комиссий
			var totalPercentOverpayment = percentOverpayment + flatCommission + commision * creditTerm;
			
			// погашение процентов
			var percentClearing = 0;
			
			// подсчёт значений графика платежей
			for( var i = 1; i <= creditTerm; i++ ){
				percentClearing = debtRest * percentRate;			// погашение процентов
				debtRest -= annuity - percentClearing;				// остаток задолжности
				// запись в кэш
				gr = [ i, annuity + commision, percentClearing, annuity - percentClearing, debtRest ];
				graphCache[graphCache.length] = createResultRow();
			}
			sr = [ annuity/*, annuity + commision*/, percentOverpayment/*, totalPercentOverpayment*/ ];
		}
		// дифференцированный
		else if ( cch.kind.type == '2' )
		{			
			// погашение основного долга
			var debtClearing = creditSum / creditTerm;
			// ежемесячная коммисия начисляется
			// "1" - с полной суммы кредита
			// "2" - с остатка задолжности по кредиту
			var mcomcond = $( frm + ' input:enabled:checked[name="' + ctrl.mcom.cond + '"]' ).val();
			var commission = 0;
			var totalCommission = 0;
			var differentiate = 0;
			var percentClearing = 0;

			// подсчёт значений графика платежей
			for( var i = 1; i <= creditTerm; i++ )
			{
				// если есть ежемесячная коммисия
				if ( cch.mcom.val != 0 )
					// пересчёт ежемесячной комисси в деньги
					totalCommission += commission = cch.mcom.type=='1' ? cch.mcom.val * (mcomcond=='2'?debtRest:creditSum) / 100 : cch.mcom.val;

				percentClearing = debtRest * percentRate;			// погашение процентов
				debtRest -= debtClearing;								// остаток задолжности

				// размер дифференцированного платежа за i-й месяц без учёта ежемесячной комиссии
				differentiate = creditSum / creditTerm + creditSum * ( 1 - ( i - 1 ) / creditTerm ) * percentRate;

				gr = [ i, differentiate + commission, percentClearing, debtClearing, debtRest ];
				graphCache[graphCache.length] = createResultRow();
			}

			// Переплата по процентам за кредит
			var percentOverpayment = creditSum * percentRate * ( creditTerm + 1 ) / 2;
			// Итоговая переплата с учетом комиссий
			var totalPercentOverpayment = percentOverpayment + flatCommission + totalCommission;
			// Первый платёж
			var firstDifferentiate = creditSum / creditTerm + creditSum * percentRate;
			// Комиссия первого платежа
			var firstCommission = cch.mcom.type=='1' ? cch.mcom.val * creditSum / 100 : cch.mcom.val;
			sr = [
				calc.fn.format( Math.round( firstDifferentiate ), 'money' ) + ' ... ' + calc.fn.format( Math.round( differentiate ), 'money' ),
				/*calc.fn.format( Math.round( firstDifferentiate + firstCommission ), 'money' ) + ' ... ' + calc.fn.format( Math.round( differentiate + commission ), 'money' ),*/
				percentOverpayment/*, 
				totalPercentOverpayment*/
			];
		}
		// генерирование и отображение результатов
		createPaymentSummary();
		createPaymentGraph();
		recount(sr[0]);
	}

	this.init();

}

/**
 * Утилиты
 */
calc.fn = calc.prototype =
{
	/**
	 * Возвращает имя раздела в настройках, соответсвующего текстовому полю node
	 * @param {Element} node	элемент текстового поля
	 * @return {String} cfg		имя раздела в настройках		
	 */
	getfieldname: function( node ){
		for( var obj in ctrl )
			if( ( ctrl[obj].input == '#'+$( node ).attr( 'name' ) ) || ( ctrl[obj].input == '#' + node.id ) || ( ctrl[obj].radio == $( node ).attr( 'name' ) ) )
				return obj;
		
		return undefined;
	},
	/**
	 * Проверяет границы допустимых значение и если они нарушены возвращает крайнее
	 * @param {Number} value проверяемое значение
	 * @param {Object} range раздел настроек, содержащий границы
	 * @return {Number}		 value, если оно в пределах или ближнюю крайнюю страницу	
	 */
	filter: function( value, range ){
		return value = value < range.minValue ? range.minValue : ( value > range.maxValue ? range.maxValue : value );
	},
	/**
	 * Формирует ячейки о массиву значений и маске
	 * @param {Array} values		набор значение, каждое из которого нужно поместить в ячейку		
	 * @param {Array} mask			маска по которой определяется выводить значение или нет
	 * @param {Boolean} isheader	для заголовочной строки - th
	 * @return {Array}				массив значений в ячейках
	 */
	createcells: function( values, mask, isheader, style ){
		var length = values.length;
		var cache = new Array();
		var cellTag = isheader ? 'th' : 'td';
		var style = style ? style : '';

		for( var i = 0; i < length; i++ )
			if( mask[i] != '' ) {
				if( Number( values[i] ) )
					values[i] = calc.fn.format( Math.round( values[i] ), 'money' );
				cache[cache.length] = '<' + cellTag +' '+ style +' >' + values[i] + '</' + cellTag + '>';
			}

		return cache;
	},
	/**
	 * Вставляет разделители в числа
	 * @param {Number} val		значение, которое нужно форматировать
	 * @param {String} format	формат ('money'|'integer'|'percent')
	 * @return {}
	 */
	format: function( val, format ){
		if ( format == 'money' ){
			val = val + '';
			var newVal = '', length = val.length, i;
			for( i = 1; i * 3 < length; i++ )
				newVal = ' ' + val.substring( length - i*3, length - ( i - 1 ) * 3 ) + newVal;
			return val.substr( 0, 3 - i*3 + length ) + newVal;
		}
		else if ( format == 'percent' ){
			return ( ( Math.floor( val * 100 ) / 100 ) +'').replace( '.', ',' );
		}
		else
			return val;
	},
	/**
	 * Возвращает позицию каретки в поле [node]
	 * @param {Element} node 	поле
	 * @return {}				позиция
	 */
	getcaretposition: function( node ){
		var pos = [0,0];
		if ( document.selection ){
			var sel = document.selection.createRange();
			pos = [ -sel.moveStart( 'character', -node.value.length ),
				-sel.moveEnd( 'character', -node.value.length ) ];
		}
		else if ( node.selectionStart || node.selectionStart == '0' ){
			pos = [ node.selectionStart, node.selectionEnd ]
		}
		return pos;
	},
	/**
	 * Устанавливает каретку в поле [node] на позицию [pos]
	 * @param {Element} node	поле
	 * @param {Number} pos		позиция
	 */
	setcaretposition: function( node, pos ){
		// mozilla
		if( node.setSelectionRange ){
			node.setSelectionRange( pos, pos );
		}
		// ie
		else if ( node.createTextRange ){
			var range = node.createTextRange();
			range.collapse( true );
			range.moveEnd( 'character', pos );
			range.moveStart( 'character', pos );
			range.select();
		}
	}
}


