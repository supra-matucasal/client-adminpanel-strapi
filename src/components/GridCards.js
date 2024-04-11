
import React, { useEffect, useState } from 'react';
import { Card } from './Card';


export function GridCards() {

  const [grids, setGrids] = useState(null);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_STRAPI_BEARER_TOKEN}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_STRAPI_BASE_URL}/api/grid-dynamic-zones?populate[Grid][populate][Cards][populate]=Image`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setGrids(result.data);

      })
      .catch(error => console.log('error', error));
  }, []);


  const renderContent = () => {
    if (!grids) {
      return <p>Loading...</p>;
    }

    return grids.map((gridItem) => {
      const { Grid, test } = gridItem.attributes;

      const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${Grid.Columns || 1}, minmax(0, 1fr))`,
        gap: `${Grid.Gap_Y || 0}px ${Grid.Gap_X || 0}px`
      };


      if (Grid && Grid.Cards) {
        return (
          <div key={gridItem.id} className="flex flex-col gap-7">
            <h2>Test Value: {test}</h2>
            <div style={gridStyle}>
              {Grid.Cards.map((card) => (
                <Card
                  key={card.id}
                  imageSrc={card.Image && card.Image.data && `${process.env.REACT_APP_STRAPI_BASE_URL}${card.Image.data.attributes.url}`}
                  title={card.Title}
                  description={card.Description}
                  link={card.Link}
                />
              ))}
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
  };


  return (
    <div>
      <h1>Grid Cards</h1>
      {renderContent()}
    </div>
  )
}

