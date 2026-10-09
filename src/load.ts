import type { Pool } from 'pg';
import type { LidarPoint } from './types.js';

export async function load(pool: Pool, point: LidarPoint): Promise<void> {
  await pool.query(
    `
      INSERT INTO lidar_points (
        point_id,
        captured_at,
        intensity,
        return_number,
        number_of_returns,
        location
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        ST_SetSRID(
          ST_MakePoint($6, $7, $8),
          4326
        )
      )

      ON CONFLICT (point_id)
      DO UPDATE SET
        captured_at = EXCLUDED.captured_at,
        intensity = EXCLUDED.intensity,
        return_number = EXCLUDED.return_number,
        number_of_returns = EXCLUDED.number_of_returns,
        location = EXCLUDED.location
    `,
    [
      point.pointId,
      point.capturedAt,
      point.intensity,
      point.returnNumber,
      point.numberOfReturns,
      point.x,
      point.y,
      point.z,
    ],
  );
}
