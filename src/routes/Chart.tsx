import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            dataLabels: {
              enabled: false,
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
              animations: {
                enabled: true,
                easing: "easeout",
                speed: 1000,
              },
              zoom: {
                enabled: false,
              },
            },
            grid: {
              show: false,
            },
            stroke: {
              show: true,
              curve: "smooth",
              width: 3,
            },
            colors: ["#0fbcf9"],
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0be881"],
                stops: [0, 100],
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(4)}`,
              },
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
