'use strict'

const utility = require('./utility.js')
const args = require('yargs').argv

// method to return distinct array elements
const distinct = (value, index, self) => {
  return self.indexOf(value) === index
}

// define fields from arguments, initialize collection to hold final deduped results, enable break condition
// and grouped leads by column1(_id) and column2(email)
const results = [], field1 = args.column1, field2 = args.column2, rankField = 'rank', 
      sortField = args.sortBy, ranksDone = [], filePath = args.filePath
let groupByColumn1 = [], groupByColumn2 = [], leads = []

duplicateReconciler()

// Creating this function structure lets us write just one test that can act as a comonent/automation test
// for the whole application. The test then can be invoked from any CI/CD pipeline for automated deployment validation 
function duplicateReconciler() {
  loadFile(filePath)
  aggregateRefinedResults()
  displayResults()
}

function aggregateRefinedResults() {
  // self reference leads objects to find out the dupes on _id and email
  for (let i = 1; i <= leads.length; i++) {
    // object that'll hold the dupes together and hold ranks for all emails
    const rankGroup = [],
      ranks = []

    // get all ids for the email in context and aggregate ranks for all ids
    const ids = groupByColumn2[leads[i - 1][field2]]
      .map(x => x[field1])
      .filter(distinct)
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
      const ranksPerId = groupByColumn1[id].map(x => x[rankField])
      ranksPerId.forEach(x => ranks.push(x))
    }

    // for each aggregated rank, group all other ranks associated by either _id or
    // email. Put a continue condition on ranksDone to avoid unnecessary looping
    ranks.forEach(element => {
      if (!ranksDone.includes(element))
        for (let j = 0; j < leads.length; j++) {
          if (
            leads[element - 1][field1] == leads[j][field1] ||
            leads[element - 1][field2] == leads[j][field2]
          ) {
            // make sure the rankGroup is not already created from previous associated ranks
            if (!rankGroup.includes(leads[j][rankField]))
              rankGroup.push(leads[j][rankField])
            if (!ranksDone.includes()) ranksDone.push(leads[j][rankField])
          }
        }
    })
    // avoid no match scenarios and add valid results to the final result set
    if (rankGroup.length > 0) results.push(rankGroup)
  }
}

function loadFile(filePath) {
  try {
    // read leads from the file
    const fs = require("fs")
    const inputData = fs.readFileSync(filePath, 'utf8')
    leads = JSON.parse(inputData).leads

    // Add rank to leads to preserve appearance order and group by column1 and column2(_id-email in this e.g.)
    // generic naming (Column1 and Column2) will allow the program to be extensible to other columns
    utility.addRank(leads, rankField)
    groupByColumn1 = utility.groupBy(leads, field1)
    groupByColumn2 = utility.groupBy(leads, field2)
  } catch (error) {
    console.error(error)
    process.exit()
  }
}

function displayResults() {
  const uniqueRecords = [],
    recordsSet = []
  results.forEach(rankGroup => {
    // get original data for the grouped ranks for final presentation
    const records = leads
      .filter(function(obj) {
        return rankGroup.includes(obj.rank)
      })
      .sort(utility.customSort.bind(null, sortField, rankField))
    recordsSet.push(records)

    // make a set for unique records for display purposes
    if (records[0]) uniqueRecords.push(records[0])

    // log the initial and final stage of each duplicate record
    if (records.length > 1) {
      console.log(
        '------------------- Duplicate Record - Source and Destination -------------------'
      )
      utility.logFormat(records)
    }
  })

  console.log(
    '\n------------------------------------------------------------------- Unique Records -------------------------------------------------------------------\n'
  )
  console.table(
    uniqueRecords.sort(utility.customSort.bind(null, sortField, rankField))
  )
  console.log(
    '\n-------------------------------------------------------------------- Grouped Records --------------------------------------------------------------------\n'
  )
  recordsSet.forEach(set => console.table(set))
}