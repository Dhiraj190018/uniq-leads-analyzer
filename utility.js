'use strict'

// module to expose utility methods used by the application
var that = {
  customSort(sortField1, sortField2, a, b) {
    // sort the grouped duplicates by sortField(entryDate) first and then
    // by the order of appearance last to first (Rank desc)
    return a[sortField1] < b[sortField1] ? 1 : a[sortField1] === b[sortField1]
      ? a[sortField2] < b[sortField2] ? 1 : -1 : -1
  },
  groupBy(array, key) {
    // generic function to group composite array by a key
    return array.reduce(function(rv, element) {
      (rv[element[key]] = rv[element[key]] || []).push(element);
      return rv
    }, {})
  },
  logFormat(records) {
    // source and final destination log for duplicate records
    var logObject = []
    var source = records[records.length - 1]
    var destination = records[0]
    Object.keys(source).forEach(x => {
      logObject[x] = source[x] + " --> " + destination[x]
    });
    console.table(logObject)
  },
  addRank(leads, rankField) {
    // assign incremental 'rank' to every lead, rank will serve two purposes here:
    // 1. Preserve the sort order as per the appearance of the lead in input
    // 2. Optimize memory and IO since all the dedup logic will run only on three columns
    //    _id, email and Rank. The dedup memory will remain constant with increasing file size
    leads.map((currentLead, index) => {
      return (currentLead[rankField] = index + 1)
    });
  }
};

module.exports = that
