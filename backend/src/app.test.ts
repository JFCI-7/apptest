import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('createApp', () => {
  it('devuelve una app Express que responde HTTP', async () => {
    const res = await request(createApp()).get('/__sanity__');
    expect(res.status).toBe(404);
  });
});