import { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';

import WhiteCar from '../../assets/car-example-white.png';

import api from '../../services/api';
import Car from './Car/car';

import "./cars.css";

const Cars = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const response = await api.get('/cars');

        const { data } = response;
        setData(data.cars);
        setLoading(false);
      } catch (error) {
        // alert('deu errado');
        fetchData();
      }
    }

    fetchData();
  }, []);

  return loading ? (
    <span>Carregando...</span>
  ) : (
    <div className="cars-container">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {data && data.map((item) => (
            <Grid xs={4}>
              <Car key={item.plate} data={item} img={WhiteCar} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Cars;
