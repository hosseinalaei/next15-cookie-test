"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { formatNumberIntl } from "@/utils/formatNumber";

const GaugeChart = ({ title, subTitle, data }: any) => {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current as HTMLDivElement);
    const option = {
      title: {
        text: title,
        subtext: subTitle,
        left: "center",
        textStyle: {
          fontFamily: "iranSans",
        },
      },
      series: [
        {
          type: "gauge",
          min: data?.min,
          max: data?.max,
          progress: {
            show: true,
            width: 18,
          },
          axisLine: {
            lineStyle: {
              width: 18,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            length: 15,
            lineStyle: {
              width: 2,
              color: "#999",
            },
          },
          axisLabel: {
            distance: 25,
            color: "#999",
            fontSize: 12,
            fontFamily: "iranSans",
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 20,
            itemStyle: {
              borderWidth: 10,
            },
          },
          title: {
            show: true,
          },
          detail: {
            show: false,
            valueAnimation: true,
            fontSize: 20,
            fontFamily: "iranSans",
            offsetCenter: [0, "75%"],
          },
          data: [
            {
              value: data?.avg,
            },
          ],
        },
      ],
    };
    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
  //   <ReactECharts option={options} style={{ height: "400px", width: "100%" }} />;
};

export default GaugeChart;
