"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const WordCloud = ({ title, subTitle, data }: any) => {
  const [echarts, setEcharts] = useState<any>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadEcharts = async () => {
      const EChartsModule = await import("echarts");
      await import("echarts-wordcloud");
      setEcharts(EChartsModule);
    };

    loadEcharts();
  }, []);

  useEffect(() => {
    if (echarts && chartRef.current && data && data.length > 0) {
      const chartInstance = echarts.init(chartRef.current);
      const option = {
        tooltip: {
          textStyle: {
            fontFamily: "iranSans",
          },
        },
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
            type: "wordCloud",
            gridSize: 15,
            sizeRange: [12, 50],
            rotationRange: [-90, 90],
            shape: "apple",
            width: 600,
            height: 400,
            drawOutOfBound: true,
            textStyle: {
              fontFamily: "iranSans",
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                    ].join(",") +
                    ")"
                  );
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            data: data,
          },
        ],
      };

      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [echarts, data]);

  if (!echarts) {
    return null;
  }

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default WordCloud;
