import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

const PriceBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const PriceLi = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 20px;
`;

interface PiceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price() {
  const { coinId } = useOutletContext<{ coinId: string }>();
  const { isLoading, data } = useQuery<PiceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId ? coinId : ""),
    { refetchInterval: 5000 }
  );
  const cap = data?.quotes.USD.market_cap;
  const capMil = cap ? cap / 1000000000 : undefined;
  const volume = data?.quotes.USD.volume_24h;
  const volumeMil = volume ? volume / 1000000 : undefined;
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <PriceBox>
          <ul>
            <PriceLi>
              <span>Price</span>
              <span>$ {data?.quotes.USD.price.toFixed(6)}</span>
            </PriceLi>
            <PriceLi>
              <span>Beta</span>
              <span>{data?.beta_value.toFixed(2)}</span>
            </PriceLi>
            <PriceLi>
              <span>Market Cap</span>
              <span>$ {capMil?.toFixed(3)} billon</span>
            </PriceLi>
            <PriceLi>
              <span>Volume 24h</span>
              <span>$ {volumeMil?.toFixed(3)} million</span>
            </PriceLi>
            <PriceLi>
              <span>Volume 24h change (24h)</span>
              <span>{data?.quotes.USD.volume_24h_change_24h} % </span>
            </PriceLi>
            <PriceLi>
              <span>Price change (15m)</span>
              <span>{data?.quotes.USD.percent_change_15m} %</span>
            </PriceLi>
            <PriceLi>
              <span>Price change (30m)</span>
              <span>{data?.quotes.USD.percent_change_30m} %</span>
            </PriceLi>
            <PriceLi>
              <span>Price change (1h)</span>
              <span>{data?.quotes.USD.percent_change_1h} %</span>
            </PriceLi>
            <PriceLi>
              <span>Price change (6h)</span>
              <span>{data?.quotes.USD.percent_change_6h} %</span>
            </PriceLi>
            <PriceLi>
              <span>Price change (12h)</span>
              <span>{data?.quotes.USD.percent_change_12h} %</span>
            </PriceLi>
            <PriceLi>
              <span>Price change (24h)</span>
              <span>{data?.quotes.USD.percent_change_24h} %</span>
            </PriceLi>
            <PriceLi>
              <span>Price change (7d)</span>
              <span>{data?.quotes.USD.percent_change_7d} %</span>
            </PriceLi>
            <PriceLi>
              <span>Price change (30d)</span>
              <span>{data?.quotes.USD.percent_change_30d} %</span>
            </PriceLi>
            <PriceLi>
              <span>Price change (1y)</span>
              <span>{data?.quotes.USD.percent_change_1y} %</span>
            </PriceLi>
          </ul>
        </PriceBox>
      )}
    </>
  );
}

export default Price;
