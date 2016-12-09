var calcData = {
    month: [ 7.4, 6.7, 6, 6.3, 8.9, 6.3, 7.5, 7.4, 8.8, 9.3, 10.7, 14.7],
    day : [13.4, 14, 14.9, 16.1, 17.6, 14.4, 9.6 ],
    time: [86, 14]


}

var index = new Vue({
    el: '#index',
    data: {
        month: moment().format('MMMM'),
        mI: moment().month(),

        day: moment().format('dddd'),
        dI: moment().weekday(),

        time: moment().format('HH:mm'),
        tI: "",

        index: "",

        graphColor: {},

        customSelection: false

    },


    methods: {
        changeTime: function () {



        },


        calculate: function () {

            if(!this.customSelection){
                if (this.time < "21:00"){
                    this.tI = calcData.time[0];
                    $('.switch input').attr( 'checked', true )
                }
                else {
                    this.tI = calcData.time[1];
                    $('.switch input').attr( 'checked', false )
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
    },

    created: function () {
        this.calculate();
    }

});

setInterval(function () {
    index.time =  moment().format('HH:mm');
    index.calculate();
},1000);


