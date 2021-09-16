<template>
    <div class="control-section">
        <div align='center'>
            <ejs-chart style='display:block' :theme='theme' align='center' id='chartcontainer' :title='title' :primaryXAxis='primaryXAxis'
                       :primaryYAxis='primaryYAxis' :chartArea='chartArea' :width='width' :tooltip='tooltip' :load='load'>
                <e-series-collection>
                    <e-series
                            :dataSource='seriesData'
                            type='Column'
                            xName='x'
                            yName='y'
                            name='Indicadores'
                            width=2
                            :marker='marker'>
                    </e-series>
                    <!--<e-series :dataSource='seriesData1' type='Column' xName='x' yName='y' name='Silver' width=2 :marker='marker'> </e-series>-->
                    <!--<e-series :dataSource='seriesData2' type='Column' xName='x' yName='y' name='Bronze' width=2 :marker='marker'> </e-series>-->
                </e-series-collection>
            </ejs-chart>
        </div>
    </div>

</template>
<style>

</style>
<script>
    import Vue from "vue";
    import { Browser } from '@syncfusion/ej2-base';
    import { ChartPlugin, ColumnSeries, Category, DataLabel, Tooltip, Legend} from "@syncfusion/ej2-vue-charts";

    Vue.use(ChartPlugin);

    let selectedTheme = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    let theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

    export default Vue.extend({
        data: function() {
            return {
                theme: theme,
                seriesData: [

                ],

                //Initializing Primary X Axis
                primaryXAxis: {
                    valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
                },
                chartArea: { border: { width: 0 } },

                //Initializing Primary Y Axis
                primaryYAxis:
                    {
                        majorGridLines: { width: 0 },
                        majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
                    },

                width : Browser.isDevice ? '100%' : '60%',
                marker:
                    { dataLabel:
                            { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' }
                            }

                    },

                tooltip: {
                    enable: true
                },

                title: ""
            };
        },
        provide: {
            chart: [ColumnSeries, Legend, DataLabel, Category, Tooltip]
        },
        methods: {

            load: function(args) {
                let selectedTheme = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Fabric';
                if (selectedTheme === 'highcontrast') {
                    args.chart.series[0].marker.dataLabel.font.color = '#000000';

                }


            }
        },

        mounted(){
            if(this.title_p !== ""){
                this.title = this.title_p;
            }

            if(this.series_data_p.length !== 0){
                this.seriesData = this.series_data_p;
            }
        },

        props:{
            title_p:"",
            series_data_p: Array
        },

        watch:{
            series_data_p: function(val){
               this.seriesData = val;
            }
        }


    });
</script>