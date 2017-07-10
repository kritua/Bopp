'use strict';

//Interactive map
$(function () {
	var oils = [
		//ХМАО
		{name: 'Шапшинское месторождение', coords: [60.75, 70.25], status: 'oil'},
		{name: 'Приразломное месторождение', coords: [60.883333, 70.750000], status: 'oil'},
		{name: 'Салымское месторождение', coords: [60, 71], status: 'oil'},
		{name: 'Приобское месторождение', coords: [61.166667, 70.166667], status: 'oil'},
		{name: 'Губкинское месторождение', coords: [64.750000, 76.666667], status: 'oil'},
		{name: 'Муравленковское месторождение', coords: [64.083333, 74.75], status: 'oil'},
		{name: 'Самотлорское месторождение', coords: [61.166667, 76.633333], status: 'oil'},
		{name: 'Вынгапуровское месторождение', coords: [63.000000, 76.666667], status: 'oil'},
		{name: 'Малобалыкское месторождение', coords: [0.500000, 72.166667], status: 'oil'},
		{name: 'Киняминское месторождение', coords: [60.500000, 74.250000], status: 'oil'},
		{name: 'Нивагальское месторождение', coords: [62.500000, 75.333333], status: 'oil'},
		{name: 'Покачевское месторождение', coords: [61.733333, 75.300000], status: 'oil'},


		//ЯНАО
		{name: 'Уренгойские месторождения', coords: [66.666667, 76.75], status: 'oil'},
		{name: 'Восточно-Таркосалинское месторождение', coords: [65.000000, 78.500000], status: 'oil'},
		{name: 'Русское месторождение', coords: [66.75, 80.50], status: 'oil'},
		{name: 'Заполярное месторождение', coords: [67.000000, 79.500000], status: 'oil'},
		{name: 'Самбургское месторождение', coords: [66.833333, 77.25], status: 'oil'},
		{name: 'Береговое месторождение', coords: [66.766667, 78.916667], status: 'oil'},
		{name: 'Хадырьяхинское месторождение', coords: [65.3000, 79.533333], status: 'oil'},
		{name: 'Ярудейское месторождение', coords: [66.188889, 71.012222], status: 'oil'},
		{name: 'Медвежье месторождение', coords: [66.666667, 73.666667], status: 'oil'},


		//Томская область
		{name: 'Тайлаковское месторождение', coords: [59.25, 74], status: 'oil'},
		{name: 'Северо-Ютымское месторождение', coords: [59.066667, 74.216667], status: 'oil'},
		{name: 'Катыльгинское месторождение', coords: [58.017778, 75.632500], status: 'oil'},
		{name: 'Крапивинское месторождение', coords: [58.0630779, 75.6123734], status: 'oil'},
		{name: 'Игольско-Таловое месторождение', coords: [57.682222, 76.344722], status: 'oil'},
		{name: 'Столбовое месторождение', coords: [59.266667, 76.500000], status: 'oil'},
		{name: 'Урманское месторождение', coords: [57.616667, 78.5], status: 'oil'},


		//Красноярский край
		{name: 'Ванкорское месторождение', coords: [67.7, 83.5], status: 'oil'},
		{name: 'Сузунское месторождение', coords: [68.333333, 83.5], status: 'oil'},
		{name: 'Зимнее месторождение', coords: [69.2000019, 83.714478], status: 'oil'},
		{name: 'Куюмбинское месторождение', coords: [60.916667, 97.000000], status: 'oil'},
		{name: 'Лодочное месторождение', coords: [67.500002, 83.114478], status: 'oil'},
		{name: 'Мессояхское месторождение', coords: [69.133333, 82.416667], status: 'oil'},
		{name: 'Пеляткинское месторождение', coords: [69.6166686, 81.7478113], status: 'oil'},
		{name: 'Тагульское месторождение', coords: [67.333333, 83.333333], status: 'oil'},


    //Иркутская область
    {name: 'Братское месторождение', coords: [56.2833363, 102.2978113], status: 'oil'},
    {name: 'Вакунайское месторождение', coords: [60.507222, 109.949167], status: 'oil'},
    {name: 'Дулисьминское месторождение', coords: [58.45, 107.616667], status: 'oil'},
    {name: 'Ичёдинское месторождение', coords: [57.874229, 105.786804], status: 'oil'},
    {name: 'Ковыктинское месторождение', coords: [55.25, 106.216667], status: 'oil'},
    {name: 'Ярактинское месторождение', coords: [58, 106.666667], status: 'oil'},
    {name: 'Верхнечонское месторождение', coords: [60.166667, 109.333333], status: 'oil'},

    //САХА-Якутия
    {name: 'Чаяндинское месторождение', coords: [60.3718338, 112.5329666], status: 'oil'},
    {name: 'Среднеботуобинское месторождение', coords: [61.666667, 113], status: 'oil'},
    {name: 'Тас-Юряхское месторождение', coords: [61.750000, 113.583333], status: 'oil'},
    {name: 'Тымпучиканское месторождение', coords: [60.536667, 110.551944], status: 'oil'},
    {name: 'Вилюйское месторождение', coords: [63.833333, 122.500000], status: 'oil'}
  ];

	var markersSpot = oils.map(function (h) {
		return {name: h.name, latLng: h.coords}
	});

	var seriesVar = {
		markers: [{
			attribute: 'image',
			scale: {
				oil: './img/oil.png'
			},
			values: oils.reduce(function (p, c, i) {
				p[i] = c.status;
				return p
			}, {})
		}],
		regions: [{
			scale: {
				darkblue: '#2a5980'
			},
			attribute: 'fill',
			values: {
				"RU-SA": 'darkblue',
				"RU-KYA": 'darkblue',
				"RU-TYU": 'darkblue',
				"RU-KHM": 'darkblue',
				"RU-YAN": 'darkblue',
				"RU-SVE": 'darkblue',
				"RU-CHU": 'darkblue',
				"RU-KHA": 'darkblue',
				"RU-AMU": 'darkblue',
				"RU-YEV": 'darkblue',
				"RU-KAM": 'darkblue',
				"RU-MAG": 'darkblue',
				"RU-PRI": 'darkblue',
				"RU-SAK": 'darkblue',
				"RU-TOM": 'darkblue',
				"RU-IRK": 'darkblue'
			}
		}]
	};



	//Map on main page
	var $mainMap = $('.map__block--main');

	if($mainMap) {
		$mainMap.vectorMap({
			map: 'ru_mill',
			backgroundColor: 'transparent',
			regionsSelectableOne: !0,
			onRegionClick: function (event, code) {
				window.location.href = "regions.php#" + code

			},
			onMarkerClick: function (event, code) {
				window.location.href = "regions.php#field-" + code
			},
			markers: markersSpot,
			series: seriesVar
		});
	}

	//Map on regions page
	var $regionsMap = $('.map__block--regions');

	if($regionsMap) {
		$regionsMap.vectorMap({
			onRegionClick: function (event, code) {
				$('body').animate({
					scrollTop: $('#' + code).offset().top
				}, 500)
			},
			onMarkerClick: function (event, code) {
				$('body').animate({
					scrollTop: $('#' + 'field-' + code).offset().top
				}, 500)
			},
			markers: markersSpot,
			series: seriesVar
		});
	}
});
