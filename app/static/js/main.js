$(document).ready(function () {
    $('#btn-add-product').click(function () {
        var startYear = parseInt($('#start-year').val());
        var startMonth = parseInt($('#start-month').val());
        var endYear = parseInt($('#end-year').val());
        var endMonth = parseInt($('#end-month').val());

        var plansPeriods = generatePlanPeriods(startYear, startMonth, endYear, endMonth);

        var productRow = "<tr>";

        productRow += "<td>" + ($('#crm-form #products-info-table > tbody > tr').length + 1) + "</td>";
        productRow += getProductDetailsCellData();
        productRow += "<td><div>" + buildStrategicPlanTable(plansPeriods) + "</div></td>";
        productRow += "<td><div>" + buildPerspectivePlanTable(plansPeriods) + "</div></td>";
        productRow += "<td><div>" + buildOperativePlanTable(plansPeriods) + "</div></td>";

        productRow += "<td></td></tr>";

        $('#crm-form #products-info-table > tbody').append(productRow);

    });
});

function generatePlanPeriods(startYear, startMonthNumber, endYear, endMonthNumber) {
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

function buildStrategicPlanTable(planPeriods) {
    var table = "<table class='table table-responsive table-bordered'><thead><tr>";
    var quartersRow = "";
    var inputsForQuarters = "<tr>";

    for (var year in planPeriods) {
        if (planPeriods.hasOwnProperty(year)) {
            table += '<th colspan="' + Object.keys(planPeriods[year]).length +'">' + year + '</th>';
            for (var quarter in planPeriods[year]) {
                quartersRow += "<td>" + quarter + " quarter</td>";
                inputsForQuarters += "<td><input type='number'/></td>";
            }
        }
    }

    table += "</tr></thead><tbody><tr>" + quartersRow + "</tr>";
    table += inputsForQuarters + "</tr>";

    table += "</tbody></table>";

    return table;
}

function buildPerspectivePlanTable(planPeriods) {
    var table = "<table class='table table-responsive table-bordered'><thead><tr>";
    var quartersRow = "";
    var inputsForMonths = "<tr>";
    var monthsRow = "<tr>";

    for (var year in planPeriods) {
        if (planPeriods.hasOwnProperty(year)) {
            var colSpansToAddForYear = 0;
            for (var quarter in planPeriods[year]) {
                quartersRow += '<td colspan="' + planPeriods[year][quarter].size +'">' + quarter + ' quarter</td>';
                planPeriods[year][quarter].forEach(function (month) {
                    inputsForMonths += "<td><input type='number'/></td>";
                    monthsRow += "<td>" + month + "</td>";
                });
                colSpansToAddForYear += planPeriods[year][quarter].size;
            }
            table += '<th colspan="' + colSpansToAddForYear +'">' + year + '</th>';
        }
    }

    table += "</tr></thead><tbody><tr>" + quartersRow + "</tr>";
    table += monthsRow + "</tr>";
    table += inputsForMonths + "</tr>";

    table += "</tbody></table>";

    return table;
}

function buildOperativePlanTable(planPeriods) {
    var table = "<table class='table table-responsive table-bordered'><thead><tr>";
    var quartersRow = "";
    var inputsForDecades = "<tr>";
    var monthsRow = "<tr>";
    var decadesRow = "<tr>";

    for (var year in planPeriods) {
        if (planPeriods.hasOwnProperty(year)) {
            var colSpansToAddForYear = 0;
            for (var quarter in planPeriods[year]) {
                var colSpansToAddForQuarter = 0;
                planPeriods[year][quarter].forEach(function (month) {
                    monthsRow += "<td colspan='3'>" + month + "</td>";
                    for (var k = 0; k < 3; k++) {
                        decadesRow += "<td>" + (k+1) + " decade</td>";
                        inputsForDecades += "<td><input type='number'/></td>";
                        colSpansToAddForQuarter += 1;
                    }
                });
                quartersRow += '<td colspan="' + colSpansToAddForQuarter +'">' + quarter + ' quarter</td>';
                colSpansToAddForYear += colSpansToAddForQuarter;
            }
            table += '<th colspan="' + colSpansToAddForYear +'">' + year + '</th>';
        }
    }

    table += "</tr></thead><tbody><tr>" + quartersRow + "</tr>";
    table += monthsRow + "</tr>";
    table += decadesRow + "</tr>";
    table += inputsForDecades + "</tr>";

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