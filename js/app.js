var calcData = {
    month: [ 9, 7.9, 3.8, 3.8, 8.3, 2.4, 4.3, 4.9, 8.5, 13.5, 12.2, 21.4],
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

        graphColor: {
        },


    },


    methods: {
        updateTime: function () {
           this.time = moment().format('HH:mm')
        },

        calculate: function () {
            if (this.time < "21:00"){
                this.tI = calcData.time[0]
            }
            else {
                this.tI = calcData.time[1]
            }

            var calc1 = ((calcData.month[this.mI]*calcData.day[this.dI])/100)*this.tI/100;
            var calc2 = ((calcData.month[11]*calcData.day[4])/100)*calcData.time[0]/100;
            this.index = (100/calc2 * calc1/10).toFixed(1);

            if(this.index < 4) {
                this.graphColor.backgroundColor = "#2ecc71";
                this.graphColor.color = "white";

                this.stage = "normal"
            }
            if (this.index > 4 && this.index <7 ){
                this.graphColor.backgroundColor = "#e67e22";
                this.graphColor.color = "white";

                this.stage = "warning"

            }
            if (this.index > 7){
                this.graphColor.backgroundColor = "#c0392b";
                this.graphColor.color = "white";

                this.stage = "alert"
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


