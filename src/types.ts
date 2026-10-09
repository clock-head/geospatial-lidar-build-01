export type RawLidarPoint = {
  point_id: string;
  x: string;
  y: string;
  z: string;
  intensity: string;
  return_number: string;
  number_of_returns: string;
  captured_at: string;
};

export type LidarPoint = {
  pointId: string;
  x: number;
  y: number;
  z: number;
  intensity: number;
  returnNumber: number;
  numberOfReturns: number;
  capturedAt: Date;
};
