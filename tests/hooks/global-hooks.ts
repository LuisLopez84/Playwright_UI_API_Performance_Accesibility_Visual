import { Before, After } from 'playwright-bdd';

Before(async () => {
  console.log('Inicio escenario');
});

After(async () => {
  console.log('Fin escenario');
});
