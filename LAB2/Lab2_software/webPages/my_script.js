// Wait for the DOM to finish loadign before we do anything with the charts API
document.addEventListener("DOMContentLoaded", function(event) { 

  // ============================================================================
  // Firebase Config Initialization
  firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: ""
  });
  var db = firebase.database();

 // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawFigures);

  // Define the options for our graph 
  var optionsExample = {
    'legend':'none',
    'title':'options example',
    titleTextStyle: {color: 'red'},
    animation: {duration: 100, easing: 'linear'},
    vAxis: {minValue: 0, maxValue: 200}
  };

  // ============================================================================
  // Draw the Figures
  function drawFigures() {

    // Create the data table object (which holds the data)
    var dataExample = new google.visualization.DataTable();
    dataExample.addColumn('string', 'Date');
    dataExample.addColumn('number', 'Reading');
    dataExample.addRows(dataRows);

    // Create the chart object (which renders the chart)
    var exampleChart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    exampleChart.draw(dataExample, optionsExample);

    // Listen to for readings. This is the part that makes this chart 'live'. Limits to the last 20 readings.
    // Looks in the 'dev' child. Places the read values in the 'result' var
    db.ref("dev").limitToLast(20).on('value', function(result) {
  
        // Parse and clean the data from 'result' before doing anything

        // Then, set the values in the table and re-draw the chart
        dataExample.setValue(valueIndex, columnIndex, valueData);
        exampleChart.draw(dataExample, optionsExample);

    });
  }
});