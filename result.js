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

        $('#result #body').append($("<div class='tbody-row'></div>")
            .append($("<div class='tbody-col'></div>").append(
                    $("<div class='car-class'></div>").text(className)
                ).append(
                    $("<div class='car-code'></div>").text(trainCode)
                )
            )
            .append($("<div class='tbody-col'></div>").text(sourceTime))
            .append($("<div class='tbody-col'></div>").append(
                    $("<div class='taketime'></div>").text(takeTime)
                ).append(
                    $("<div class='money'></div>").text(money)
                )
            )
            .append($("<div class='tbody-col'></div>").text(destTime))
        );
    });

    iniBackButton();
});

function iniBackButton() {
    $('#back').click(function () {
        history.go(-1);
    });
}
