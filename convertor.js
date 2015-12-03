function formatToSearchDate(formatter, rawDate) {
    return formatter(rawDate).format("YYYY/MM/DD");
}

module.exports.formatToSearchDate = formatToSearchDate;
