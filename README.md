# uniq-leads-analyzer
This program analyzes duplicate leads and provides insights into targeted recommendations

### Prerequisites

Node.js

### Sample commands
```
node index.js --filePath=leads[1][1][1].json --column1=_id --column2=email --sortBy=entryDate
node index.js --filePath=leads[1][1][1].json --column1=_id --column2=lastName --sortBy=email
node index.js --filePath=leads[1][1][1].json --column1=_id --column2=firstName --sortBy=lastName
```

### Installing

Clone this repo from https://github.com/Dhiraj190018/uniq-leads-analyzer.git

```
npm install
```

```
run any of the sample commands mentioned above to see the desired output in the logs
```

## Running the tests

The automated tests of this program can be run locally as well as form CI/CD pipelines as stages


```
npm run test
```

## Monitoring coverage

The code and test coverage for all test types support junit reports(for deployments) and console display(for dev env)


```
npm run test:coverage
```

```
npm run test:coverage-console
```


## Linting

The program incorporates standard linting rules that can be extended with updates to eslitrc.json rule set file
The linting step should be a part of CI/CD pipeline and should allow/diallow build based on results


```
npm run lint
```

## Deployment

The deployment of this program is very light and is primarily only dependent on a node environment

## Built With

* [Node]
* [Jasmine]
* [Eslint]

## Authors

* **Dhiraj Sharma** - *
