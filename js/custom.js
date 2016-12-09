$( document ).ready(function() {

    generateIndexChart();

    $(".switch input").click(function () {

        index.customSelection = true;

        if($(".switch input").is(':checked')){
            index.tI = calcData.time[0];
            index.calculate()

        }
        else {
            index.tI = calcData.time[1];
            index.calculate()

        }
        $('#ewi svg').remove();
        generateIndexChart();
    });


    function generateIndexChart() {
        $('#ewi svg').remove();
        $('#ewi').circliful({
            // foreground Color
            foregroundColor: index.graphColor.backgroundColor,

            // background color
            backgroundColor: "#eee",

            // width of foreground circle border
            foregroundBorderWidth: 15,

            // width of background circle border
            backgroundBorderWidth: 15,

            // Size of point circle
            pointSize: 28.5,

            // font color
            fontColor: index.graphColor.backgroundColor,

            // from 0 to 100
            percent: index.index*10,

            // if the circle should be animated initialy
            animation: 1,

            // how fast or slow the animation should be
            // from 0 to 100
            animationStep: 6,

            // icon size
            iconSize: '20px',

            // icon color
            iconColor: '#999',

            // top, bottom, left, right or middle
            iconPosition: 'center',

            // font size of the percentage text
            percentageTextSize: 22,

            // draws a circle around the main circle
            targetPercent: 0,

            // font size of the target percentage
            targetTextSize: 17,

            // font color of the info text
            textColor: '#666',

            replacePercentageByText: index.stage

        });
    }




    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(month);
    google.charts.setOnLoadCallback(day);


    function day() {
        var data = google.visualization.arrayToDataTable([
            ['Wochentag', 'Einbrüche in %'],
            ['Mo', calcData.day[0]],
            ['Di', calcData.day[1]],
            ['Mi', calcData.day[2]],
            ['Do', calcData.day[3]],
            ['Fr', calcData.day[4]],
            ['Sa', calcData.day[5]],
            ['So', calcData.day[6]]
        ]);

        var options = {
            chart: {
                title: 'Wochentag',
            },
            colors: ['#95a5a6'],
            bars: 'horizontal',
            legend: { position: "none" },


        };

        var chart = new google.charts.Bar(document.getElementById('day'));

        google.visualization.events.addListener(chart, 'select', selectHandler);

        function selectHandler(e) {
            var selection = chart.getSelection();
            index.mI = selection[0].row;
            index.customSelection = true;
            index.calculate();
            generateIndexChart();

        }
        chart.draw(data, google.charts.Bar.convertOptions(options));

    }

    function month() {
        var data = google.visualization.arrayToDataTable([
            ['Monat', 'Einbrüche in %'],
            ['Jan', calcData.month[0]],
            ['Feb', calcData.month[1]],
            ['Mär', calcData.month[2]],
            ['Apr', calcData.month[3]],
            ['Mai', calcData.month[4]],
            ['Jun', calcData.month[5]],
            ['Jul', calcData.month[6]],
            ['Aug', calcData.month[7]],
            ['Sep', calcData.month[8]],
            ['Okt', calcData.month[9]],
            ['Nov', calcData.month[10]],
            ['Dez', calcData.month[11]],

        ]);

        var options = {
            chart: {
                title: 'Monat'
            },
            colors: ['#95a5a6'],
            bars: 'horizontal',
            legend: { position: "none" }
        };


        var chart = new google.charts.Bar(document.getElementById('month'));

        google.visualization.events.addListener(chart, 'select', selectHandler);

        function selectHandler(e) {
            var selection = chart.getSelection();
            index.mI = selection[0].row;
            index.customSelection = true;
            index.calculate();
            generateIndexChart();

        }
        chart.draw(data, google.charts.Bar.convertOptions(options));

    }

});