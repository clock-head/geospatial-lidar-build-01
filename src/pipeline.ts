import { transform } from './transform.js';
import { load } from './load.js';
import { extract } from './extract.js';

import { pool } from './config.js';

async function main(): Promise<void> {
  try {
    const rawPoints = extract('./data/lidar-points.csv');

    for (const rawPoint of rawPoints) {
      const point = transform(rawPoint);

      await load(pool, point);
    }
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
