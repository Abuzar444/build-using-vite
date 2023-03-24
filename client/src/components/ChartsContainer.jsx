import React, { useState } from 'react';
import Wrapper from "../assets/wrappers/ChartsContainer";
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import { useGlobalContext } from '../context/AppContext';

const ChartsContainer = () => {
  const [showCharts, setShowCharts] = useState(true);
  const { monthlyApplications: data } = useGlobalContext();

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button onClick={() => setShowCharts(!showCharts)}>
        {
          showCharts ? "Area Chart" : "Bar Chart"
        }
      </button>
      {
        showCharts ? (
          <BarChart data={data} />
        ) : (
          <AreaChart data={data} />
        )
      }
    </Wrapper>
  );
};

export default ChartsContainer
