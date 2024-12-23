"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const PieChart = ({ title, subTitle, data, name }: any) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const mapData = data?.map((item: any) => {
    return {
      value: item.doc_count,
      name: item.key,
    };
  });

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
        trigger: "item",
        textStyle: {
          fontFamily: "iranSans",
        },
      },
      legend: {
        top: "8%",
        left: "center",
        textStyle: {
          fontFamily: "iranSans",
          fontSize: 15,
        },
      },
      series: [
        {
          name: name,
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
              fontFamily: "iranSans",
            },
          },
          labelLine: {
            show: false,
          },
          data: mapData,
        },
      ],
    };
    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default PieChart;
