"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const LineChart = ({
  title,
  subTitle,
  data,
  xAxisData,
  yAxisData,
  name,
}: any) => {
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
          type: "category",
          data: xAxisData,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            fontFamily: "iranSans",
            interval: 0,
            rotate: 30,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            fontFamily: "iranSans",
          },
        },
      ],
      series: [
        {
          name: name,
          type: "line",
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

export default LineChart;
