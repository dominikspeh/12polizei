var calcData = {
    month: [ 7.4, 6.7, 6, 6.3, 8.9, 6.3, 7.5, 7.4, 8.8, 9.3, 10.7, 14.7],
    day : [13.4, 14, 14.9, 16.1, 17.6, 14.4, 9.6 ],
    time: [86, 14]


}

var indexChart = Vue.component('index-chart', {
    template: '<section><div id="iCharts"> ' +
    '<div id="index-day"></div>' +
    '<div id="ewi" style="width: 400px"></div>' +
    '<div id="index-month"></div>' +
    '</div>' +
    '<label v-on:click="changeTime" class="switch">'+
    '<input type="checkbox" >'+
    '<div class="slider round"></div>'+
    '</label></section>',


    data: function () {

        return {
            month: moment().format('MMMM'),
            mI: moment().month(),

            day: moment().format('dddd'),
            dI: moment().weekday(),

            time: moment().format('HH:mm'),
            tI: "",

            index: "",

            graphColor: {},

            customSelection: false


        }
    },
    mounted: function () {

        this.calculate();




    },

    methods: {
        generateIndexChart: function () {
            $("#ewi svg").remove();
            $('#ewi').circliful({
                // foreground Color
                foregroundColor: this.graphColor.backgroundColor,

                // background color
                backgroundColor: "#eee",

                // width of foreground circle border
                foregroundBorderWidth: 15,

                // width of background circle border
                backgroundBorderWidth: 15,

                // Size of point circle
                pointSize: 28.5,

                // font color
                fontColor: this.graphColor.backgroundColor,

                // from 0 to 100
                percent: this.index*10,

                // if the circle should be animated initialy
                animation: 1,

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

                replacePercentageByText: this.stage

            });
        },

        generateDay: function () {
            var vm = this;

            google.charts.setOnLoadCallback(function () {

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
                    animation:{
                        duration: 2000,
                        easing: 'out',
                        startup: true,
                    },


                };

                var chart = new google.visualization.BarChart(document.getElementById('index-day'));


                google.visualization.events.addListener(chart, 'select', function () {
                    var selection = chart.getSelection();
                    if(selection.length > 0) {
                        vm.dI = selection[0].row;
                        vm.customSelection = true;
                        vm.calculate();
                        vm.generateIndexChart();
                    }

                });



                chart.draw(data, options);
                chart.setSelection([{"row":vm.dI,"column":1}]);

            });


        },

        generateMonth: function () {
            var vm = this;

            google.charts.setOnLoadCallback(function () {
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
                    animation:{
                        duration: 2000,
                        easing: 'out',
                        startup: true,
                    },
                    bars: 'horizontal',
                    legend: { position: "none" }
                };


                var chart = new google.visualization.BarChart(document.getElementById('index-month'));



                chart.draw(data, options);
                chart.setSelection([{"row":vm.mI,"column":1}]);



                google.visualization.events.addListener(chart, 'select', function () {
                    var selection = chart.getSelection();

                    if(selection.length > 0) {
                        vm.mI = selection[0].row;
                        vm.customSelection = true;
                        vm.calculate();
                        vm.generateIndexChart();
                    }

                });
                google.visualization.events.addListener(chart, 'error', function (googleError) {
                    google.visualization.errors.removeError(googleError.id);
                });


            })



        },

        calculate: function () {

            if(!this.customSelection) {
                if (this.time < "21:00") {
                    this.tI = calcData.time[0];
                    $('.switch input').attr('checked', true)
                }
                else {
                    this.tI = calcData.time[1];
                    $('.switch input').attr('checked', false)
                }
            }

            var calc1 = ((calcData.month[this.mI]*calcData.day[this.dI])/100)*this.tI/100;
            var calc2 = ((calcData.month[11]*calcData.day[4])/100)*calcData.time[0]/100;
            this.index = (100/calc2 * calc1/10).toFixed(1);

            if(this.index < 4) {
                this.graphColor.backgroundColor = "#95a5a6";
                this.graphColor.color = "white";

                this.stage = "niedrig"
            }
            if (this.index > 4 && this.index <7 ){
                this.graphColor.backgroundColor = "#e67e22";
                this.graphColor.color = "white";

                this.stage = "mittel"

            }
            if (this.index > 7){
                this.graphColor.backgroundColor = "#c0392b";
                this.graphColor.color = "white";
                this.stage = "hoch";

                if(this.index == 10){
                    this.graphColor.backgroundColor = "#c0392b";
                    this.graphColor.color = "white";
                    this.stage = "hoch";
                    this.index = 10
                }
            }
        },

        changeTime: function () {
            this.customSelection = true;

            if($(".switch input").is(':checked')){
                this.tI = calcData.time[0];
                this.calculate()

            }
            else {
                this.tI = calcData.time[1];
                this.calculate()

            }
            this.generateIndexChart();
        }
    },


    created: function () {



    }
});



var index = new Vue({
    el: '#fullpage',
    components: {
        'index-chart': indexChart
    },

    mounted: function () {
        var vm = this;

        $('#fullpage').fullpage({
            css3 : true,
            anchors: ['welcome','einbruch', 'secondPage', '3rdPage'],
            sectionsColor: ['#aaa', 'white', '#7BAABE', 'whitesmoke', '#ccddff'],
            navigation: true,
            navigationPosition: 'right',
            navigationTooltips: ['Hello','EWI', 'Second page', 'Third and last page'],

            afterLoad: function(anchorLink, index){
                if(index == 2){
                    vm.$refs.ichart.generateDay();
                    vm.$refs.ichart.generateMonth();
                    vm.$refs.ichart.generateIndexChart();
                    $('#ewi, #index-day, #index-month').removeClass('fadeOut');

                    $('#ewi, #index-day, #index-month').addClass('animated fadeIn');
                }
                else {
                    $('#ewi, #index-day, #index-month').removeClass('fadeIn');
                    $('#ewi, #index-day, #index-month').addClass('animated fadeOut');

                    $("#ewi svg").remove();

                }
            }
        });
    }


});

/*
setInterval(function () {
    indexChart.time =  moment().format('HH:mm');
    indexChart.calculate();
},1000);
*/

