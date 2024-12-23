"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const BarYChart = ({
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

    // const option = {
    //   title: {
    //     text: title,
    //     subtext: subTitle,
    //     left: "center",
    //     textStyle: {
    //       fontFamily: "iranSans",
    //     },
    //   },
    //   tooltip: {
    //     trigger: "axis",
    //     axisPointer: {
    //       type: "shadow",
    //     },
    //     textStyle: {
    //       fontFamily: "iranSans",
    //     },
    //   },
    //   grid: {
    //     left: "3%",
    //     right: "4%",
    //     bottom: "3%",
    //     containLabel: true,
    //   },
    //   xAxis: {
    //     axisLabel: {
    //       fontFamily: "iranSans",
    //     },
    //     type: "value",
    //     // data: xAxisData,
    //     // axisTick: {
    //     //   alignWithLabel: true,
    //     // },
    //   },

    //   yAxis: {
    //     axisLabel: {
    //       fontFamily: "iranSans",
    //     },
    //     type: "value",
    //     data: yAxisData,
    //   },

    //   series: [
    //     {
    //       name: name,
    //       type: "bar",
    //       barWidth: "60%",
    //       data: xAxisData,
    //     },
    //   ],
    // };

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
      },
      // legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        axisLabel: {
          fontFamily: "iranSans",
        },
        type: "value",
        // boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: "category",
        data: yAxisData,
        axisLabel: {
          fontFamily: "iranSans",
          fontSize: 15,
          // fontWeight: "Bold",
        },
      },
      series: [
        {
          name: "2011",
          type: "bar",
          data: xAxisData,
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

export default BarYChart;
