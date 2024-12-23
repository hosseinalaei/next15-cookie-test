"use client";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const BarMixChart = ({
  title,
  subTitle,
  data,
  xAxisData,
  yAxisData,
  normilize,
}: any) => {
  const chartRef = useRef<HTMLDivElement>(null);

  function transformData(xAxisData: any) {
    const transformedMap = new Map();

    xAxisData.forEach((dataset: any) => {
      dataset.forEach((entry: any) => {
        const { key, doc_count } = entry;

        if (!transformedMap.has(key)) {
          transformedMap.set(key, {
            name: key,
            type: "bar",
            // stack: "total",
            label: { show: true },
            // emphasis: { focus: "series" },
            data: [],
          });
        }
        const normalizedValue = Math.round(doc_count);

        transformedMap.get(key).data.push(normalizedValue);
      });
    });

    return Array.from(transformedMap.values());
  }

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
          data: yAxisData,
          axisLabel: {
            fontFamily: "iranSans",
            interval: 0,
            rotate: 30,
          },
          // axisTick: {
          //   alignWithLabel: true,
          // },
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
      series: transformData(xAxisData),
    };
    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [title, subTitle, data]);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default BarMixChart;
