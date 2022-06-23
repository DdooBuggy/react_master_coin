import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";

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
interface ohlc {
  x: string;
  y: string[];
}
interface IChartProps {}

function Chart({}: IChartProps) {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  const [ohlcData, setOhlcData] = useState<ohlc[]>([]);
  useEffect(() => {
    if (data && data.length > 0) {
      setOhlcData(
        data?.map((price) => ({
          x: price.time_open,
          y: [
            price.open.toFixed(4),
            price.high.toFixed(4),
            price.low.toFixed(4),
            price.close.toFixed(4),
          ],
        }))
      );
    }
  }, [data]);
  console.log(ohlcData);
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : ohlcData.length === 0 ? (
        "Oops! error happens"
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: ohlcData as Array<ohlc>,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
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
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
