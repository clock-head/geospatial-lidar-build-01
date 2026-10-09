import fs from 'node:fs';
import { parse } from 'csv-parse/sync';
import type { RawLidarPoint, LidarPoint } from './types.js';

export function extract(path: string): RawLidarPoint[] {
  const input = fs.readFileSync(path, 'utf-8');

  return parse(input, {
    columns: true,
    skip_empty_lines: true,
  });
}
