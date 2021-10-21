$(document).ready(function () {
    $('table tbody tr td:nth-child(4)').each(function () {
        if ($(this).text() == "male") {
            $(this).text('Nam');
        }
        if ($(this).text() == "female") {
            $(this).text('Nữ');
        }
    })
    $('table tbody tr td:nth-child(8)').each(function (i) {
        if ($(this).text() == "bestseller") {
            $(this).text('Bán chạy nhất');
        }
        if ($(this).text() == "latestproduct") {
            $(this).text('Mới nhất');
        }
    })
})