window.addEventListener("load", function() {
    var result = localStorage.getItem('result');

    parser = new DOMParser();
    htmlDoc = parser.parseFromString(result, "text/html");
    var $result = $(htmlDoc.getElementById('ResultGridView')).children('tbody');

    $result.find('tr.Grid_Row').each(function () {
        var $row = $(this);
        var fields = $row.find('td');

        var className = $(fields[0]).find('#classname').text().trim();
        var trainCode = $(fields[1]).find('a').text().trim();
        var mountainOrSea = $(fields[2]).text().trim();
        var startEndStation = $(fields[3]).text().trim();
        var sourceTime = $(fields[4]).text().trim();
        var destTime = $(fields[5]).text().trim();
        var takeTime = $(fields[6]).text().trim();
        var money = $(fields[8]).text().trim();

        console.log([className, trainCode, mountainOrSea, startEndStation, sourceTime, destTime, takeTime, money]);
        $('#result #body').append($("<div class='row'></div>")
            .append($("<div class='four wide column'></div>").text(className + '/' + trainCode))
            .append($("<div class='four wide column'></div>").text(sourceTime))
            .append($("<div class='four wide column'></div>").text(takeTime + '/' + money))
            .append($("<div class='four wide column'></div>").text(destTime))
        );
    });

    iniBackButton();
});

function iniBackButton() {
    $('#back').click(function () {
        history.go(-1);
    });
}
