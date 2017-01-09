var calcData = {
    months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    days: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
    month: [ 7.4, 6.7, 6, 6.3, 8.9, 6.3, 7.5, 7.4, 8.8, 9.3, 10.7, 14.7],
    day : [13.4, 14, 14.9, 16.1, 17.6, 14.4, 9.6 ],
    time: [86, 14]


};

var descriptions = {
    low: "Das ist die Beschreibung für niedriges Risiko",
    middle: "Das ist die Beschreibung für mittleres Risiko",
    high: "Das ist die Beschreibung für hohes Risiko"
}

// Components
var indexChart = Vue.component('index-chart', {
    template: '' +
    '<div class="section" id="section1">' +
    '<div :data-rel="indexDay" class="layer">' +
    '<div class="area-heading">' +
    '   <h1>Einbruchsrisiko</h1>' +
    '   <p>Die Farbskala ist in drei Farben unterteilt. Grau steht für geringes Risiko, Orange steht für mittleres Risiko und Rot für erhötes Risiko. Die Farbe wird anhand der Tageszeit, des Wochentags und des Monats bestimmt.</p>' +
    '</div>' +
    '<section style="margin-top: -70px;" id="index">'+
    '       <div id="iCharts"> ' +
    '           <div id="index-day"></div>' +
    '           <div :data-rel="stage"  id="ewi">' +
    '<div v-on:click="changeTime" class="slider">' +
    '   <img class="day" src="img/daytime-large-day.png" data-tooltip="Tagsüber<br><small>09.00 Uhr - 20.59 Uhr</small>" data-tooltip-position="left middle" >' +
    '   <img class="night" src="img/daytime-large-night.png" data-tooltip="Nachtsüber<br><small>21.00 Uhr - 08.59 Uhr</small>" data-tooltip-position="right middle" >' +
    '</div>' +
    '<h3><small>Aktuelle Auswahl:</small><br>{{day}} | <small v-show="indexDay"> Tagsüber</small><small v-show="!indexDay"> Nachts</small> | {{month}} </h3>' +
    '<div class="graphic"></div>' +
    '<span>{{stage}} Einbruchsrisiko<br></span>' +
    '<span><small>{{description}}</small></span>' +
    '</div>' +
    '           <div id="index-month"></div>' +
    '       </div>' +
    '   </section>' +
    '</div>'+
    '</div>',


    data: function () {

        return {
            month: moment().format('MMMM'),
            mI: moment().month(),

            day: moment().format('dddd'),
            dI: moment().weekday(),

            time: moment().format('HH:mm'),
            tI: "",

            index: "",

            stage: "",

            description: "",

            indexDay: false,

            graphColor: {},

            customSelection: false


        }
    },
    mounted: function () {
        this.calculate();





    },

    methods: {

        generateDay: function () {
            var vm = this;

            google.charts.setOnLoadCallback(function () {

                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Wochentag'); // Implicit domain label col.
                data.addColumn('number', 'Einbrüche in %'); // Implicit series 1 data col.
                data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}})


                data.addRows([

                    [{v:"Mo",f:"Mo"},calcData.day[0], generateHTML(calcData.days[0],calcData.day[0])],

                    [{v:"Di",f:"Di"},calcData.day[1], generateHTML(calcData.days[1],calcData.day[1])],

                    [{v:"Mi",f:"Mi"},calcData.day[2], generateHTML(calcData.days[2],calcData.day[2])],

                    [{v:"Do",f:"Do"},calcData.day[3], generateHTML(calcData.days[3],calcData.day[3])],

                    [{v:"Fr",f:"Fr"},calcData.day[4], generateHTML(calcData.days[4],calcData.day[4])],

                    [{v:"Sa",f:"Sa"},calcData.day[5], generateHTML(calcData.days[5],calcData.day[5])],

                    [{v:"So",f:"So"},calcData.day[6], generateHTML(calcData.days[6],calcData.day[6])],


                ]);



                var options = {

                    title: 'Wochentag',
                    titleColor: 'white',
                    tooltip: { isHtml: true },


                    vAxis: {
                        textStyle:{
                            color: '#FFF'
                        }
                    },
                    hAxis : {
                        showTextEvery : 2,
                        title : "Prozentuale Verteilung der Einbrüche je Wochentag (insg. 100%)",
                        titleTextStyle: {color: 'white'},

                        format : 'decimal',
                        gridlines: {
                            count: 10,
                            color: '73bdfe'
                        },
                        baselineColor: 'white',
                        textStyle:{
                            color: '#FFF'
                        }
                    },
                    colors: ['#2B8FE5'],
                    animation:{
                        duration: 2000,
                        easing: 'out',
                        startup: true
                    },
                    backgroundColor: { fill:'transparent' },
                    legend: { position: "none" },

                    bars: 'horizontal',




                };

                var chart = new google.visualization.BarChart(document.getElementById('index-day'));


                google.visualization.events.addListener(chart, 'select', function () {
                    var selection = chart.getSelection();

                    if(selection.length > 0) {
                        vm.dI = selection[0].row;
                        vm.day = calcData.days[vm.dI];
                        vm.customSelection = true;
                        vm.calculate();
                    }

                });



                chart.draw(data, options);
                chart.setSelection([{"row":vm.dI,"column":1}]);


                function generateHTML (tag, prozent) {
                    return '<div class="tooltip"><h5>' + tag + '</h5> <p>'+prozent+ '%</p><div/>' ;

                }



            });


        },

        generateMonth: function () {
            var vm = this;

            google.charts.setOnLoadCallback(function () {

                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Wochentag'); // Implicit domain label col.
                data.addColumn('number', 'Einbrüche in %'); // Implicit series 1 data col.
                data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}})


                data.addRows([

                    [{v:"Jan",f:"Jan"},calcData.month[0], generateHTML(calcData.months[0],calcData.month[0])],

                    [{v:"Feb",f:"Feb"},calcData.month[1], generateHTML(calcData.months[1],calcData.month[1])],

                    [{v:"Mär",f:"Mär"},calcData.month[2], generateHTML(calcData.months[2],calcData.month[2])],

                    [{v:"Apr",f:"Apr"},calcData.month[3], generateHTML(calcData.months[3],calcData.month[3])],

                    [{v:"Mai",f:"Mai"},calcData.month[4], generateHTML(calcData.months[4],calcData.month[4])],

                    [{v:"Jun",f:"Jun"},calcData.month[5], generateHTML(calcData.months[5],calcData.month[5])],

                    [{v:"Jul",f:"Jul"},calcData.month[6], generateHTML(calcData.months[6],calcData.month[6])],

                    [{v:"Aug",f:"Aug"},calcData.month[7], generateHTML(calcData.months[7],calcData.month[7])],

                    [{v:"Sep",f:"Sep"},calcData.month[8], generateHTML(calcData.months[8],calcData.month[8])],

                    [{v:"Okt",f:"Okt"},calcData.month[9], generateHTML(calcData.months[9],calcData.month[9])],

                    [{v:"Nov",f:"Nov"},calcData.month[10], generateHTML(calcData.months[10],calcData.month[10])],

                    [{v:"Dez",f:"Dez"},calcData.month[11], generateHTML(calcData.months[11],calcData.month[11])],



                ]);
           

                var options = {

                    title: 'Monat',
                    titleColor: 'white',
                    tooltip: { isHtml: true },

                    colors: ['#2B8FE5'],
                    animation:{
                        duration: 2000,
                        easing: 'out',
                        startup: true,
                    },
                    bars: 'horizontal',
                    backgroundColor: { fill:'transparent' },
                    legend: { position: "none" },
                    vAxis: {
                        textStyle:{
                            color: '#FFF'
                        }
                    },
                    hAxis : {
                        showTextEvery : 2,
                        title : "Prozentuale Verteilung der Einbrüche je Monat (insg. 100%)",
                        titleTextStyle: {color: 'white'},
                        format : 'decimal',
                        gridlines: {
                            count: 6,
                            color: '73bdfe'
                        },
                        baselineColor: 'white',
                        textStyle:{
                            color: '#FFF'
                        }
                    }


                };


                var chart = new google.visualization.BarChart(document.getElementById('index-month'));





                chart.draw(data, options);
                chart.setSelection([{"row":vm.mI,"column":1}]);



                google.visualization.events.addListener(chart, 'select', function () {
                    var selection = chart.getSelection();

                    if(selection.length > 0) {
                        vm.mI = selection[0].row;
                        vm.month = calcData.months[vm.mI];
                        vm.customSelection = true;
                        vm.calculate();
                    }

                });
                google.visualization.events.addListener(chart, 'error', function (googleError) {
                    google.visualization.errors.removeError(googleError.id);
                });

                function generateHTML (monat, prozent) {
                    return '<div class="tooltip"><h5>' + monat + '</h5> <p>'+prozent+ '%</p><div/>' ;

                }


            })



        },

        calculate: function () {

            if(!this.customSelection) {
                if (this.time < "21:00") {
                    this.tI = calcData.time[0];
                    $(".day").addClass('active');
                    this.indexDay = true
                }
                else {
                    this.tI = calcData.time[1];
                    $(".night").addClass('active');
                    this.indexDay = false
                }
            }

            var calc1 = ((calcData.month[this.mI]*calcData.day[this.dI])/100)*this.tI/100;
            var calc2 = ((calcData.month[11]*calcData.day[4])/100)*calcData.time[0]/100;
            this.index = (100/calc2 * calc1/10).toFixed(1);


            if(this.index < 1) {
                this.graphColor.backgroundColor = "#95a5a6";
                this.graphColor.color = "white";
                this.description = descriptions.low;
                this.stage = "Geringes"
            }
            if (this.index > 1 && this.index < 6 ){
                this.graphColor.backgroundColor = "#e67e22";
                this.graphColor.color = "white";
                this.description = descriptions.middle;
                this.stage = "Mittleres"

            }
            if (this.index > 6){
                this.graphColor.backgroundColor = "#c0392b";
                this.graphColor.color = "white";
                this.description = descriptions.high;
                this.stage = "Hohes";


            }
        },

        changeTime: function () {
            this.customSelection = true;
            $(".slider .active").removeClass('active');

            if(this.indexDay == false) {
                this.tI = calcData.time[0];
                this.indexDay = true;
                $(".day").addClass('active');
                this.calculate()
            }
            else {
                this.tI = calcData.time[1];
                this.indexDay = false;
                $(".night").addClass('active');
                this.calculate()


            }
        }
    },

    created: function () {



    }
});

var einbruchsstellen = Vue.component('einbruchstellen', {

});

var index = new Vue({
    el: '#fullpage',
    components: {
        'index-chart': indexChart
    },
    data: {},

    mounted: function () {
        var vm = this;

        $('#fullpage').fullpage({
            css3 : true,
            anchors: ['welcome','risiko', 'einbruchstellen', '3rdPage'],
            sectionsColor: ['#aaa', '', '#184F7F', '#0C2840'],
            navigation: false,
            scrollDelay: 2000,
            navigationPosition: 'right',
            navigationTooltips: ['Welcome','Risiko', 'Einbruchstellen', 'Third'],


            afterLoad: function(anchorLink, index){

                $('.pulse').removeClass('pulse');

                switch(index) {
                    case 1:
                        $('.decline .count').each(function () {
                            $(this).prop('Counter',0).animate({
                                Counter: $(this).text()
                            }, {
                                duration: 2000,
                                easing: 'swing',
                                step: function (now) {
                                    $(this).text(now.toFixed(1)+"%");
                                }
                            });
                        });
                        break;
                    case 2:

                        vm.$refs.ichart.generateDay();
                        vm.$refs.ichart.generateMonth();


                        $('#ewi, #index-day, #index-month').removeClass('fadeOut');

                        $('#ewi, #index-day, #index-month').addClass('animated fadeIn');

                        break;
                    case 3:
                        $('.badges li').addClass('animated pulse');
                        $('.stellen .count').each(function () {
                            $(this).prop('Counter',0).animate({
                                Counter: $(this).text()
                            }, {
                                duration: 2000,
                                easing: 'swing',
                                step: function (now) {
                                    $(this).text(now.toFixed(1)+"%");
                                }
                            });
                        });
                        break;
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

