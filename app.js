window.addEventListener("load", function() {
    initSelector();
    initDateTime();
    initButtonsTab();
    initSearchButton();
});

function handleCityChanged(stationSelector, cityID) {
    stationSelector.empty();
    for (var i = 0; i < cityStations[cityID].stations.length; i += 1) {
        var station = cityStations[cityID].stations[i];
        stationSelector.append($("<option></option>").attr("value", station.id).text(station.name));
    }
}

function initSelector() {
    var fromCitySelector = $('#from_city');
    var toCitySelector = $('#to_city');
    var fromStationSelector = $('#from_station');
    var toStationSelector = $('#to_station');

    fromCitySelector.change(function () {
        var cityID = $(this).val();
        handleCityChanged(fromStationSelector, cityID);
    });

    toCitySelector.change(function () {
        var cityID = $(this).val();
        handleCityChanged(toStationSelector, cityID);
    });

    for (var i = 0; i < cityStations.length; i += 1) {
      var city = cityStations[i];
      fromCitySelector.append($("<option></option>").attr("value", city.id).text(city.name));
      toCitySelector.append($("<option></option>").attr("value", city.id).text(city.name));
    }

    handleCityChanged(fromStationSelector, 0);
    handleCityChanged(toStationSelector, 0);
}

function initDateTime() {
    var dateInputor = $('#date');
    var timeInputor = $('#time');

    var today = moment().format('YYYY-MM-DD');
    var now = moment().format('HH:mm')

    dateInputor.val(today);
    timeInputor.val(now);
}

function initButtonsTab() {
    $('.tabable button').click(function () {
        var clickedBtn = $(this);
        clickedBtn.siblings().removeClass('active');
        clickedBtn.addClass('active');
    });
}

function initSearchButton() {
    $('#search').click(function () {
        var dateInputor = $('#date');
        var timeInputor = $('#time');
        var fromCitySelector = $('#from_city');
        var toCitySelector = $('#to_city');
        var fromStationSelector = $('#from_station');
        var toStationSelector = $('#to_station');
        var carClass = $('#car_class .active').attr('data-value');

        var params = {
            searchtype: 0,
            searchdate: formatToSearchDate(moment, dateInputor.val()),
            fromcity: fromCitySelector.val(),
            tocity: toCitySelector.val(),
            fromstation: fromStationSelector.val(),
            tostation: toStationSelector.val(),
            trainclass: carClass,
            timetype: 1,
            fromtime: timeInputor.val().replace(':',''),
            totime: '2359'
        };

        var requestURL = "http://twtraffic.tra.gov.tw/twrail/SearchResult.aspx" + '?' + $.param(params);

        $.ajaxSetup({
            xhr: function() {return new window.XMLHttpRequest({mozSystem: true});}
        });

        $.ajax({
            url: requestURL,
            method: 'GET'
        }).done(function(data) {
            console.log('done');
            localStorage.setItem('result', data);
            window.location.href = "/result.html";
        });
    });
}
