$(document).ready(function () {
    $('#btn-add-product').click(function () {
        var startYear = parseInt($('#start-year').val());
        var startMonth = parseInt($('#start-month').val());
        var endYear = parseInt($('#end-year').val());
        var endMonth = parseInt($('#end-month').val());
        var productRow = "<tr>";

        productRow += "<td>" + ($('#crm-form #products-info-table > tbody > tr').length + 1) + "</td>";
        productRow += getProductDetailsCellData();
        productRow += "<td><div>" + buildStrategicPlanTable(
                                        generateStrategicPlanPeriods(
                                            startYear,
                                            startMonth,
                                            endYear,
                                            endMonth
                                        )
                                    ) +
                      "</div></td>";

        productRow += "<td></td>";
        productRow += "<td></td>";
        productRow += "<td></td></tr>";

        $('#crm-form #products-info-table > tbody').append(productRow);

    });
});

function generateStrategicPlanPeriods(startYear, startMonthNumber, endYear, endMonthNumber) {
    var result = {};

    if (startYear <= endYear) {
        if (startYear == endYear) {
            result[startYear] = {};
            for (var j = startMonthNumber; j <= endMonthNumber; j++) {
                var quarterNumber = moment().month(j).quarter();

                if ( !result[startYear].hasOwnProperty(quarterNumber) ) {
                    result[startYear][quarterNumber] = new Set();
                }
                result[startYear][quarterNumber].add(moment().month(j).format("MMMM"));
            }
        }
        else {
            for (var i = startYear; i < endYear; i++) {
                result[i] = {};
                var startMNumber = i == startYear ? startMonthNumber : 0;

                for (var j = startMNumber; j < 12; j++) {
                    var quarterNumber = moment().month(j).quarter();

                    if ( !result[i].hasOwnProperty(quarterNumber) ) {
                        result[i][quarterNumber] = new Set();
                    }
                    result[i][quarterNumber].add(moment().month(j).format("MMMM"));
                }
            }
            result[endYear] = {};
            for (var j = 0; j <= endMonthNumber; j++) {
                var quarterNumber = moment().month(j).quarter();

                if ( !result[endYear].hasOwnProperty(quarterNumber) ) {
                    result[endYear][quarterNumber] = new Set();
                }
                result[endYear][quarterNumber].add(moment().month(j).format("MMMM"));
            }
        }
    }

    console.log(result);
    return result;
}

function buildStrategicPlanTable(strategicPlanPeriods) {
    var table = "<table class='table table-responsive table-bordered'><thead><tr>";
    var quartersRow = "";
    var inputsForQuarters = "<tr>";
    var monthsRow = "";

    for (var year in strategicPlanPeriods) {
        if (strategicPlanPeriods.hasOwnProperty(year)) {
            table += '<th colspan="' + Object.keys(strategicPlanPeriods[year]).length +'">' + year + '</th>';
            for (var quarter in strategicPlanPeriods[year]) {
                quartersRow += "<td>" + quarter + " quarter</td>";
                inputsForQuarters += "<td><input type='number'/></td>";
                /*strategicPlanPeriods[year][quarter].forEach(function (month) {
                    monthsRow += "<td>" + month + "</td>";
                });*/
            }
        }
    }

    table += "</tr></thead><tbody><tr>" + quartersRow + "</tr>";
    table += inputsForQuarters + "</tr>";

    table += "</tbody></table>";

    return table;
}

function getProductDetailsCellData() {
    return '<td class="col-lg-3">' +
        '<div id="product-details" class="form-horizontal">' +
        '<div class="form-group">' +
        '<label for="product-name" class="col-lg-4 col-sm-4 control-label">Product Name</label>' +
        '<div class="col-lg-8 col-sm-8">' +
        '<input type="text" class="form-control" id="product-name">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="sku" class="col-sm-4 control-label">SKU</label>' +
        '<div class="col-sm-8">' +
        '<input type="text" class="form-control" id="sku">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="currency" class="col-sm-4 control-label">Currency</label>' +
        '<div class="col-sm-8">' +
        '<select id="currency">' +
        '<option value="USD">USD</option>' +
        '<option value="EUR">EUR</option>' +
        '<option value="BYN">BYN</option>' +
        '<option value="RUB">RUB</option>' +
        '</select>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="dimension-unit" class="col-sm-4 control-label">Dimension</label>' +
        '<div class="col-sm-8">' +
        '<select id="dimension-unit">' +
        '<option value="kg">kg</option>' +
        '<option value="piece">piece</option>' +
        '<option value="volume">volume</option>' +
        '</select>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</td>';
}