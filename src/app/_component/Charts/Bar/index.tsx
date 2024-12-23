"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const BarChart = ({ title, subTitle, data, xAxisData, yAxisData }: any) => {
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
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        textStyle: {
          fontFamily: "iranSans",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          axisLabel: {
            fontFamily: "iranSans",
            interval: 0,
            rotate: 30,
          },
          type: "category",
          data: xAxisData,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          axisLabel: {
            fontFamily: "iranSans",
          },
          type: "value",
        },
      ],
      series: [
        {
          name: "",
          type: "bar",
          barWidth: "60%",
          data: yAxisData,
        },
      ],
    };
    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [title, subTitle, data]);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default BarChart;
