$(document).ready(function () {
    $('#crm-form #btn-add-product').click(function () {
        var startYear = parseInt($('#crm-form #start-year').val());
        var startMonth = parseInt($('#crm-form #start-month').val());
        var endYear = parseInt($('#crm-form #end-year').val());
        var endMonth = parseInt($('#crm-form #end-month').val());
        var formId = 'crm-form';

        var plansPeriods = generatePlanPeriods(startYear, startMonth, endYear, endMonth);

        var productRow = "<tr>";
        var productNumber = $('#crm-form #products-info-table > tbody > tr').length + 1;

        productRow += "<td class='col-lg-1'>" + productNumber + "</td>";
        productRow += getProductDetailsForCRMCellData(productNumber);
        productRow +=
            "<td class='col-lg-8'>" +
                "<h4 class='centeredText'>Strategic</h4>" +
                "<div class='tableDiv'>" + buildStrategicPlanTable(plansPeriods, productNumber, formId) + "</div>" +
                    "<label for='strategic-total'>Total: </label>" +
                    "<input value='0' id='strategic-total-" + productNumber + "' style='text-align: right' type='text' readonly/>" +
                "<h4 class='centeredText'>Perspective</h4>" +
                "<div class='tableDiv'>" + buildPerspectivePlanTable(plansPeriods, productNumber, formId) + "</div>" +
                    "<label for='perspective-total'>Total: </label>" +
                    "<input value='0' id='perspective-total-" + productNumber + "' style='text-align: right' type='text' readonly/>" +
                "<h4 class='centeredText'>Operative</h4>" +
                "<div class='tableDiv'>" + buildOperativePlanTable(plansPeriods, productNumber, formId) + "</div>" +
                    "<label for='operative-total'>Total: </label>" +
                    "<input value='0' id='operative-total-" + productNumber + "' style='text-align: right' type='text' readonly/>" +
            "</td>";

        productRow += "</tr>";

        $('#crm-form #products-info-table > tbody').append(productRow);

    });

    $('#srm-form #btn-add-product').click(function () {
        var startYear = parseInt($('#srm-form #start-year').val());
        var startMonth = parseInt($('#srm-form #start-month').val());
        var endYear = parseInt($('#srm-form #end-year').val());
        var endMonth = parseInt($('#srm-form #end-month').val());
        var formId = 'srm-form';

        var plansPeriods = generatePlanPeriods(startYear, startMonth, endYear, endMonth);

        var productRow = "<tr>";
        var productNumber = $('#srm-form #products-info-table > tbody > tr').length + 1;

        productRow += "<td class='col-lg-1'>" + productNumber + "</td>";
        productRow += getProductDetailsForSRMCellData(productNumber);
        productRow +=
            "<td class='col-lg-8'>" +
                "<h4 class='centeredText'>Strategic</h4>" +
                "<div class='tableDiv'>" + buildStrategicPlanTable(plansPeriods, productNumber, formId) + "</div>" +
                    "<label for='strategic-total'>Total: </label>" +
                    "<input value='0' id='strategic-total-" + productNumber + "' style='text-align: right' type='text' readonly/>" +
                "<h4 class='centeredText'>Perspective</h4>" +
                "<div class='tableDiv'>" + buildPerspectivePlanTable(plansPeriods, productNumber, formId) + "</div>" +
                    "<label for='perspective-total'>Total: </label>" +
                    "<input value='0' id='perspective-total-" + productNumber + "' style='text-align: right' type='text' readonly/>" +
                "<h4 class='centeredText'>Operative</h4>" +
                "<div class='tableDiv'>" + buildOperativePlanTable(plansPeriods, productNumber, formId) + "</div>" +
                    "<label for='operative-total'>Total: </label>" +
                    "<input value='0' id='operative-total-" + productNumber + "' style='text-align: right' type='text' readonly/>" +
            "</td>";

        productRow += "</tr>";

        $('#srm-form #products-info-table > tbody').append(productRow);

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

function buildStrategicPlanTable(planPeriods, productNumber, formId) {
    var table = "<table class='table table-responsive table-bordered centeredText' id='strategic-table-" + productNumber +"'><thead><tr>";
    var quartersRow = "";
    var inputsForQuarters = "<tr>";

    for (var year in planPeriods) {
        if (planPeriods.hasOwnProperty(year)) {
            table += '<th class="centeredText" colspan="' + Object.keys(planPeriods[year]).length +'">' + year + '</th>';
            for (var quarter in planPeriods[year]) {
                quartersRow += "<td>" + quarter + " quarter</td>";
                inputsForQuarters += '<td><input onchange="calculateTotalSum(\'strategic\',' + productNumber + ')" class="centeredText" type="number" min="0"/></td>';
            }
        }
    }

    table += "</tr></thead><tbody><tr>" + quartersRow + "</tr>";
    table += inputsForQuarters + "</tr>";

    table += "</tbody></table>";

    return table;
}

function buildPerspectivePlanTable(planPeriods, productNumber, formId) {
    var table = "<table class='table table-responsive table-bordered centeredText' id='perspective-table-" + productNumber +"'><thead><tr>";
    var quartersRow = "";
    var inputsForMonths = "<tr>";
    var monthsRow = "<tr>";

    for (var year in planPeriods) {
        if (planPeriods.hasOwnProperty(year)) {
            var colSpansToAddForYear = 0;
            for (var quarter in planPeriods[year]) {
                quartersRow += '<td colspan="' + planPeriods[year][quarter].size +'">' + quarter + ' quarter</td>';
                planPeriods[year][quarter].forEach(function (month) {
                    inputsForMonths += '<td><input onchange="calculateTotalSum(\'perspective\',' + productNumber + ')" class="centeredText" type="number" min="0"/></td>';
                    monthsRow += "<td>" + month + "</td>";
                });
                colSpansToAddForYear += planPeriods[year][quarter].size;
            }
            table += '<th class="centeredText" colspan="' + colSpansToAddForYear +'">' + year + '</th>';
        }
    }

    table += "</tr></thead><tbody><tr>" + quartersRow + "</tr>";
    table += monthsRow + "</tr>";
    table += inputsForMonths + "</tr>";

    table += "</tbody></table>";

    return table;
}

function buildOperativePlanTable(planPeriods, productNumber, formId) {
    var table = "<table class='table table-responsive table-bordered centeredText' id='operative-table-" + productNumber +"'><thead><tr>";
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
                        inputsForDecades += '<td><input onchange="calculateTotalSum(\'operative\',' + productNumber + ',' + formId + ')" class="centeredText" type="number" min="0"/></td>';
                        colSpansToAddForQuarter += 1;
                    }
                });
                quartersRow += '<td colspan="' + colSpansToAddForQuarter +'">' + quarter + ' quarter</td>';
                colSpansToAddForYear += colSpansToAddForQuarter;
            }
            table += '<th class="centeredText" colspan="' + colSpansToAddForYear +'">' + year + '</th>';
        }
    }

    table += "</tr></thead><tbody><tr>" + quartersRow + "</tr>";
    table += monthsRow + "</tr>";
    table += decadesRow + "</tr>";
    table += inputsForDecades + "</tr>";

    table += "</tbody></table>";

    return table;
}

function getProductDetailsForCRMCellData(productNumber) {
    return '<td class="col-lg-3">' +
        '<div id="product-details-' + productNumber + '" class="form-horizontal">' +
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
        '<br><h5>Sale Information</h5><br>' +
        '<div class="form-group">' +
        '<label for="sale-start-date" class="col-lg-4 col-sm-4 control-label">Start Date</label>' +
        '<div class="col-lg-8 col-sm-8">' +
        '<input type="date" class="form-control" id="sale-start-date">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="sale-end-date" class="col-lg-4 col-sm-4 control-label">End Date</label>' +
        '<div class="col-lg-8 col-sm-8">' +
        '<input type="date" class="form-control" id="sale-end-date">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="promo" class="col-lg-4 col-sm-4 control-label">Promo, %</label>' +
        '<div class="col-lg-8 col-sm-8">' +
        '<input type="number" min="0" max="100" class="form-control" id="promo">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="promo-price" class="col-lg-4 col-sm-4 control-label">Price with Promo</label>' +
        '<div class="col-lg-8 col-sm-8">' +
        '<input type="text" class="form-control" id="promo-price">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="quantity" class="col-lg-4 col-sm-4 control-label">Quantity</label>' +
        '<div class="col-lg-8 col-sm-8">' +
        '<input type="number" class="form-control" id="quantity">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="sale-comments" class="col-lg-4 col-sm-4 control-label">Comments</label>' +
        '<div class="col-lg-8 col-sm-8">' +
        '<input type="text" class="form-control" id="sale-comments">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</td>';
}

function getProductDetailsForSRMCellData() {
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
        '<br><h5>Immediate Request</h5><br>' +
        '<div class="form-group">' +
        '<label for="receiving-date" class="col-lg-4 col-sm-4 control-label">Date of Receiving</label>' +
        '<div class="col-lg-8 col-sm-8">' +
        '<input type="date" class="form-control" id="receiving-date">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="quantity" class="col-lg-4 col-sm-4 control-label">Quantity</label>' +
        '<div class="col-lg-8 col-sm-8">' +
        '<input type="number" class="form-control" id="quantity">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</td>';
}

function calculateTotalSum(plan, productNumber) {
    var totalSum = 0;

    if (plan == 'strategic') {
        $('#strategic-table-' + productNumber + ' input').each(function () {
            totalSum += $(this).val() == "" ? 0 : parseInt($(this).val());
        });

        $('#strategic-total-'+productNumber).val(totalSum);
    } else if (plan == 'perspective') {
        $('#perspective-table-' + productNumber + ' input').each(function () {
            totalSum += $(this).val() == "" ? 0 : parseInt($(this).val());
        });

        $('#perspective-total-'+productNumber).val(totalSum);
    } else if (plan == 'operative') {
        $('#operative-table-' + productNumber + ' input').each(function () {
            totalSum += $(this).val() == "" ? 0 : parseInt($(this).val());
        });

        $('#operative-total-'+productNumber).val(totalSum);
    }
}