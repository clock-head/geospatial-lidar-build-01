import type { RawLidarPoint, LidarPoint } from './types.js';

export function transform(raw: RawLidarPoint): LidarPoint {
  const x = Number(raw.x);
  const y = Number(raw.y);
  const z = Number(raw.z);

  const intensity = Number(raw.intensity);
  const returnNumber = Number(raw.return_number);
  const numberOfReturns = Number(raw.number_of_returns);

  if (![x, y, z].every(Number.isFinite)) {
    throw new Error(`Invalid coordinates for point ${raw.point_id}`);
  }

  if (
    !Number.isInteger(returnNumber) ||
    !Number.isInteger(numberOfReturns) ||
    returnNumber < 1 ||
    returnNumber > numberOfReturns
  ) {
    throw new Error(`Invalid return metadata for point ${raw.point_id}`);
  }

  const capturedAt = new Date(raw.captured_at);

  if (Number.isNaN(capturedAt.getTime())) {
    throw new Error(`Invalid timestamp for point ${raw.point_id}`);
  }

  return {
    pointId: raw.point_id,
    x,
    y,
    z,
    intensity,
    returnNumber,
    numberOfReturns,
    capturedAt,
  };
}
