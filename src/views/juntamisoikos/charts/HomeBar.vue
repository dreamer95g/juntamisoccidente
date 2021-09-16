<template>
  <div class="control-section">
    <!-- <div align="center"> -->
    <ejs-chart
      style="display: block"
      :theme="theme"
      align="center"
      id="chartcontainer1"
      :title="title"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :chartArea="chartArea"
      :width="width"
      :tooltip="tooltip"
      :load="load"
    >
      <e-series-collection>
        <e-series
          :dataSource="seriesData"
          type="Column"
          xName="x"
          yName="y"
          name="Prof. Fe"
          width="2"
          :marker="marker"
        >
        </e-series>
        <e-series
          :dataSource="seriesData1"
          type="Column"
          xName="x"
          yName="y"
          name="Bautizos"
          width="2"
          :marker="marker"
        >
        </e-series>
      </e-series-collection>
    </ejs-chart>
  </div>
  <!-- </div> -->
</template>
<style scoped></style>
<script>
import Vue from "vue";
import { Browser } from "@syncfusion/ej2-base";
import {
  ChartPlugin,
  ColumnSeries,
  Category,
  DataLabel,
  Tooltip,
  Legend,
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
    faith_profession_p: "",
    baptism_p: "",
  },
  data: function () {
    return {
      faith_profession: "",
      baptism: "",
      theme: theme,
      seriesData: [],
      seriesData1: [],

      //Initializing Primary X Axis
      primaryXAxis: {
        valueType: "Category",
        interval: 1,
        majorGridLines: { width: 0 },
      },
      chartArea: { border: { width: 0 } },

      //Initializing Primary Y Axis
      primaryYAxis: {
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        labelStyle: { color: "transparent" },
      },

      width: Browser.isDevice ? "100%" : "60%",
      marker: {
        dataLabel: {
          visible: true,
          position: "Top",
          font: { fontWeight: "600", color: "#ffffff" },
        },
      },

      tooltip: {
        enable: true,
      },

      title: "Profesiones de Fe VS Bautizos",
    };
  },
  provide: {
    chart: [ColumnSeries, Legend, DataLabel, Category, Tooltip],
  },
  methods: {
    load: function (args) {
      let selectedTheme = location.hash.split("/")[1];
      selectedTheme = selectedTheme ? selectedTheme : "Material";
      if (selectedTheme === "highcontrast") {
        args.chart.series[0].marker.dataLabel.font.color = "#000000";
        args.chart.series[1].marker.dataLabel.font.color = "#000000";
        //args.chart.series[2].marker.dataLabel.font.color = "#000000";
      }
    },
  },

  mounted() {
    this.seriesData = [];

    this.seriesData1 = [];
    this.faith_profession = this.faith_profession_p;
    this.baptism = this.baptism_p;

    this.seriesData = [
      {
        x: "Prof. Fe",
        y: this.faith_profession,
      },
    ];

    this.seriesData1 = [
      {
        x: "Bautizos",
        y: this.baptism,
      },
    ];
  },

  watch: {
    faith_profession_p(val) {
      this.faith_profession = val;
    },
    baptism_p(val) {
      this.seriesData = [];
      this.seriesData1 = [];
      this.baptism = val;
      this.seriesData = [
        {
          x: "Prof. Fe",
          y: this.faith_profession,
        },
      ];

      this.seriesData1 = [
        {
          x: "Bautizos",
          y: this.baptism,
        },
      ];
    },
  },
});
</script>
