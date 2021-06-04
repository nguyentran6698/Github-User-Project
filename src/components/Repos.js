import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  let languages = repos.reduce((total, current) => {
    const { language, stargazers_count } = current;
    if (!language) {
      return total;
    }
    if (!total[language]) {
      total[language] = { label: language, value: 1, starts: stargazers_count };
    }
    total[language] = {
      ...total[language],
      value: total[language].value + 1,
      starts: total[language].starts + stargazers_count,
    };
    return total;
  }, {});
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5); //convert object to array
  // most start per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.starts - a.starts;
    })
    .map((item) => {
      return { ...item, value: item.starts };
    })
    .slice(0, 5);
  // starts, forks
  let { starts, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.starts[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      starts: {},
      forks: {},
    }
  );
  starts = Object.values(starts).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();
  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartData} />; */}

        <Pie3D data={mostUsed}></Pie3D>
        <Column3D data={starts} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
