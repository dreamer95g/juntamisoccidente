<template>
  <div class="control-section">
    <!-- <div align='center'> -->
    <ejs-chart
      style="display: block"
      :theme="theme"
      align="center"
      id="chartcontainer"
      :title="title"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      :chartArea="chartArea"
      :width="width"
    >
      <e-series-collection>
        <e-series
          :dataSource="seriesData"
          type="Line"
          xName="x"
          yName="y"
          name="Membresía"
          width="2"
          :marker="marker"
        >
        </e-series>
        <!--<e-series :dataSource='seriesData1' type='Line' xName='x' yName='y' name='England' width=2 :marker='marker'> </e-series>-->
      </e-series-collection>
    </ejs-chart>
    <!-- </div> -->
  </div>
</template>
<style scoped></style>
<script>
import Vue from "vue";
import { Browser } from "@syncfusion/ej2-base";
import {
  ChartPlugin,
  LineSeries,
  Legend,
  Tooltip,
  DateTime,
} from "@syncfusion/ej2-vue-charts";

Vue.use(ChartPlugin);

let selectedTheme = location.hash.split("/")[1];
selectedTheme = selectedTheme ? selectedTheme : "Material";
let theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
  /-dark/i,
  "Dark"
);

export default Vue.extend({
  props: {
    first_year_p: "",
    secondly_year_p: "",
    third_year_p: "",
    fourth_year_p: "",
    last_year_p: "",
  },
  data: function () {
    return {
      first_year: "",
      secondly_year: "",
      third_year: "",
      fourth_year: "",
      last_year: "",

      theme: theme,
      seriesData: [],

      //Initializing Primary X Axis
      primaryXAxis: {
        valueType: "DateTime",
        labelFormat: "y",
        intervalType: "Years",
        edgeLabelPlacement: "Shift",
        majorGridLines: { width: 0 },
      },
      //Initializing Primary Y Axis
      primaryYAxis: {
        labelFormat: "{value}",
        rangePadding: "None",
        minimum: 0,
        maximum: 1000,
        interval: 200,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
      },
      chartArea: {
        border: {
          width: 0,
        },
      },
      width: Browser.isDevice ? "100%" : "60%",
      marker: {
        visible: true,
        height: 10,
        width: 10,
      },
      tooltip: {
        enable: true,
      },
      title: "Membresía en los últimos cinco años",
    };
  },
  provide: {
    chart: [LineSeries, Legend, Tooltip, DateTime],
  },
  methods: {
    getLatestFiveYears() {
      let years = [];
      let last_year = new Date().getFullYear();
      let first_year = last_year - 4;
      let secondly_year = last_year - 3;
      let third_year = last_year - 2;
      let fourth_year = last_year - 1;

      years.push(first_year);
      years.push(secondly_year);
      years.push(third_year);
      years.push(fourth_year);
      years.push(last_year);

      return years;
    },
  },

  mounted() {
    this.seriesData = [];
    this.first_year = this.first_year_p;
    this.secondly_year = this.secondly_year_p;
    this.third_year = this.third_year_p;
    this.fourth_year = this.fourth_year_p;
    this.last_year = this.last_year_p;
    //console.log(this.last_year_p);

    //ponerle tope al eje Y
    //this.primaryYAxis.maximum = this.last_year + 500;

    let years = this.getLatestFiveYears();
    this.seriesData = [
      { x: new Date(years[0], 0, 1), y: this.first_year },
      { x: new Date(years[1], 0, 1), y: this.secondly_year },
      { x: new Date(years[2], 0, 1), y: this.third_year },
      { x: new Date(years[3], 0, 1), y: this.fourth_year },
      { x: new Date(years[4], 0, 1), y: this.last_year },
    ];
  },

  watch: {
    first_year_p(val) {
      this.first_year = val;
    },
    secondly_year_p(val) {
      this.secondly_year = val;
    },
    third_year_p(val) {
      this.third_year = val;
    },
    fourth_year_p(val) {
      this.fourth_year = val;
    },
    last_year_p(val) {
      this.last_year = val;
      this.seriesData = [];
      let years = this.getLatestFiveYears();
      this.seriesData = [
        { x: new Date(years[0], 0, 1), y: this.first_year },
        { x: new Date(years[1], 0, 1), y: this.secondly_year },
        { x: new Date(years[2], 0, 1), y: this.third_year },
        { x: new Date(years[3], 0, 1), y: this.fourth_year },
        { x: new Date(years[4], 0, 1), y: this.last_year },
      ];
    },
  },
});
</script>
