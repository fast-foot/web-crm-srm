$(document).ready(function () {

});

function exportFormData(formId) {
    $.ajax({
            url: '/supply/export',
            data: JSON.stringify(getFormData(formId)),
            type: 'POST',
        }).done(function(data) {
            console.log(data);
        }).fail(function (e) {
            console.log(e);
    });
}

function sendEmail(formId) {
    $.ajax({
            url: '/send_email',
            data: JSON.stringify(getFormData(formId)),
            type: 'POST',
        }).done(function(data) {
            console.log(data);
        }).fail(function (e) {
            console.log(e);
    });
}

function saveSupply(formId) {
        $.ajax({
            url: '/supply/save',
            data: JSON.stringify(getFormData(formId)),
            type: 'POST',
        }).done(function(data) {
            console.log(data);
        }).fail(function (e) {
            console.log(e);
    });
}

function getFormData(formId) {
    var data = {
        products: []
    };

    $('#' + formId + ' #products-info-table > tbody > tr').each(function (i) {
        var product = {
            details: {},
            plans: {}
        };

        $('#' + formId + ' #product-details-' + (i+1) + ' input').each(function () {
            product.details[$(this).attr('name')] = $(this).val();
        });
        $('#' + formId + ' #product-details-' + (i+1) + ' select').each(function () {
            product.details[$(this).attr('name')] = $(this).val();
        });

        product.plans.strategic = getStrategicPlanData(i + 1, formId);
        product.plans.perspective = getPerspectivePlanData(i + 1, formId);
        product.plans.operative = getOperativePlanData(i + 1, formId);

        data.products.push(product);
    });

    var contactDetails = {};
    var managerDetails = {};
    var extraDetails = {};

    $('#' + formId + ' #main-info .contact-info input').each(function () {
        contactDetails[$(this).attr('name')] = $(this).val();
    });

    $('#' + formId + ' #main-info .manager-info input').each(function () {
        managerDetails[$(this).attr('name')] = $(this).val();
    });

    $('#' + formId + ' #main-info .extra-info input').each(function () {
        extraDetails[$(this).attr('name')] = $(this).val();
    });

    $('#' + formId + ' #main-info .extra-info select').each(function () {
        extraDetails[$(this).attr('name')] = $(this).find('option:selected').text();
    });

    data.contactDetails = contactDetails;
    data.managerDetails = managerDetails;
    data.extraDetails = extraDetails;
    data.supply_type = formId == "crm-form" ? 'crm' : 'srm';

    console.log(data);

    return data;
}

function getStrategicPlanData(tableNumber, formId) {
    var data = {
        total: parseInt($('#' + formId + ' #strategic-total-' + tableNumber).val())
    };
    var currentQuartersCount = 0;
    var previousQuartersCount = 0;

    $('#' + formId + ' #strategic-table-' + tableNumber + ' > thead > tr > th').each(function () {
        var year = $(this).html();

        data[year] = {} ;
        currentQuartersCount = parseInt($(this).attr('colspan'));

        var quarterNumber = 0;
        for (var i = previousQuartersCount; i < previousQuartersCount + currentQuartersCount; i++) {
            var input = $('#' + formId + ' #strategic-table-' + tableNumber + ' > tbody > tr:eq(1) > td:eq(' + i + ') input');
            data[year][quarterNumber + 1] = input.val() == "" ? 0 : parseInt(input.val());
            quarterNumber += 1;
        }

        previousQuartersCount = currentQuartersCount;

    });

    return data;
}

function getPerspectivePlanData(tableNumber, formId) {
    var data = {
        total: parseInt($('#' + formId + ' #perspective-total-' + tableNumber).val())
    };
    var currentMonthsCount = 0;
    var previousMonthsCount = 0;

    $('#' + formId + ' #perspective-table-' + tableNumber + ' > thead > tr > th').each(function () {
        var year = $(this).html();

        data[year] = {} ;
        currentMonthsCount = parseInt($(this).attr('colspan'));

        for (var i = previousMonthsCount; i < previousMonthsCount + currentMonthsCount; i++) {
            var input = $('#' + formId + ' #perspective-table-' + tableNumber + ' > tbody > tr:eq(2) > td:eq(' + i + ') input');
            var month = $('#' + formId + ' #perspective-table-' + tableNumber + ' > tbody > tr:eq(1) > td:eq(' + i + ')').html();

            data[year][month] = input.val() == "" ? 0 : parseInt(input.val());
        }

        previousMonthsCount = currentMonthsCount;

    });

    return data;
}

function getOperativePlanData(tableNumber, formId) {
    var data = {
        total: parseInt($('#' + formId + ' #operative-total-' + tableNumber).val())
    };
    var currentMonthsCount = 0;
    var previousMonthsCount = 0;
    var decadeTDNumber = 0;

    $('#' + formId + ' #operative-table-' + tableNumber + ' > thead > tr > th').each(function () {
        var year = $(this).html();

        data[year] = {} ;
        var currentDecadesCount = parseInt($(this).attr('colspan'));
        currentMonthsCount = currentDecadesCount / 3;

        for (var i = previousMonthsCount; i < previousMonthsCount + currentMonthsCount; i++) {
            var month = $('#' + formId + ' #operative-table-' + tableNumber + ' > tbody > tr:eq(1) > td:eq(' + i + ')').html();
            data[year][month] = {};
            for (var j = 0; j < 3; j++) {
                var decade_input = $('#' + formId + ' #operative-table-' + tableNumber + ' > tbody > tr:eq(3) > td:eq(' + decadeTDNumber + ') input');
                data[year][month][(j+1) + ' decade'] = decade_input.val() == "" ? 0 : parseInt(decade_input.val());
                decadeTDNumber += 1;
            }
        }

        previousMonthsCount = currentMonthsCount;
    });

    return data;
}