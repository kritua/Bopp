//
// Файл настройки кредитного калькулятора
//
// справочник с элементами управления калькулятора

var EUR = 40.7035|| 25.1;
var USD = 31.7203|| 37.1;
var ctrl =
{
	// сумма кредита
	sum: {
		type: {
			1: {
				name: 'руб.',
				exchange: 1,
				minValue: 10000,
				maxValue: 100000000,
				format: 'money',
				factor: 10000,
				speeder: [ 1000, 2000, 5000, 10000 ]
			},
			2: {
				name: 'долл.',
				exchange: USD,
				minValue: 1000,
				maxValue: 300000,
				format: 'money',
				factor: 1000,
				speeder: [ 50, 100, 100, 500 ]
			},
			3: {
				name: 'евро',
				exchange: EUR,
				minValue: 1000,
				maxValue: 300000,
				format: 'money',
				factor: 1000,
				speeder: [ 50, 100, 100, 500 ]
			}
		},
		input: '#lcredit',
		radio: 'currency',
		slider: '#scredit'
	},
	vznos: {
		type: {
			1: {
				minValue: 0,
				maxValue: 10000000,
				format: 'money'
			},
			2: {
				minValue: 0,
				maxValue: 100,
				format: 'percent',
			}
		},
		input: '#vznos',
		radio: 'vznos_type',
		slider: '#scredit'
	},
	// срок кредита
	term: {
		type: {
			1: {
				minValue: 1,
				maxValue: 600,
				format: 'integer',
				factor: 1,
				speeder: [ 1, 1, 1, 1 ]
			},
			2: {
				minValue: 1,
				maxValue: 600,
				format: 'integer',
				factor: 1,
				speeder: [ 1, 1, 1, 1 ]
			}
		},
		input: '#lterm',
		radio: 'term',
		slider: '#sterm'
	},
	// процентная ставка
	rate: {
		type: {
			1: {
				minValue: 0,
				maxValue: 100,
				format: 'percent',
				factor: 0.1,
				speeder: [ 0.1, 0.1, 0.5, 1 ]
			}
		},
		input: '#lpercent',
		slider: '#spercent'
	},
	// единовременная комиссия
	comm: {
		type: {
			1: {
				minValue: 0,
				maxValue: Number.MAX_VALUE,
				format: 'percent'
			},
			2: {
				minValue: 0,
				maxValue: Number.MAX_VALUE,
				format: 'money'
			}
		},
		input: '#lcommission',
		radio: 'commission'
	},
	// ежемесячная коммисия
	mcom: {
		type: {
			1: {
				minValue: 0,
				maxValue: Number.MAX_VALUE,
				format: 'percent'
			},
			2: {
				minValue: 0,
				maxValue: Number.MAX_VALUE,
				format: 'money'
			}
		},
		input: '#lmcommission',
		radio: 'mcommission',
		cond: 'partcommission'
	},
	kind: {
		radio: 'kind'
	}
};
// справочник с текстами результата
var rslt =
{
	// график платежей
	graph: {
		// заголовочная строка
		header: {
			// для 1-го типа платежей (аннуитетный)
			1: [
				'Месяц',
				'Ежемес.<br /> платеж',
				'%',
				'Тело<br />кредита',
				'Остаток'
			],
			// для 2-го типа платежей (дифференцируемый)
			2: [
				'Месяц',
				'Ежемес.<br /> платеж',
				'%',
				'Погашение<br />основного долга',
				'Остаток'
			]
		},
		// заголовок графика платежей
		caption: 'График платежей:',
		// класс таблицы с графиком
		tableClass: 'paymentGraph table',
		// класс строки со ссылкой на полное/укороченное отображение графика
		linkRowClass: 'controlRow',
		// класс сыслки на полное/укороченное отображение графика
		linkClass: 'red',
		// класс заголовочной строки
		rowHeaderClass: 'medium',
		// класс чётной строки
		rowEvenClass: 'even',
		// класс нечётной строки
		rowOddClass: 'odd',
		// класс каждой 12-й строки
		rowYearClass: 'year',
		// текст ссылок переключения режима отображения графика
		showFullGraphText: '...',
		showCompactGraphText: 'Краткое представление',
		// минимальное значение при котором будет появляться
		// ссылка переключения режима отображения графика
		switchFullCompactValue: 5
	},
	// краткое описание кредита
	summary: {
		header: {
			// для 1-го типа платежей (аннуитетный)
			1: [
				'Ежемесячный платеж:',
				// 'Ежемесячный платеж с учетом комиссии',
				'Переплата:',
				// 'Итоговая переплата с учетом комиссий'
			],
			// для 2-го типа платежей (дифференцируемый)
			2: [
				'Ежемесячный платеж:',
				// 'Ежемесячный платеж с учетом комиссии',
				'Переплата:',
				// 'Итоговая переплата с учетом комиссий'
			]
		},
		// заголовок краткого описания
		caption: '',
		// класс таблицы с кратким описанием
		tableClass: 'paymentSummary',
		// класс ячеек с заголовками
		cellHeaderClass: 'big-label'
	}
}