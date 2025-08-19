import { beforeEach, describe, expect, it } from 'bun:test';

import { STATUS_CODE } from '@std/http/status';

import routes from './routes';

describe('create', () => {
  it('should create a task', async () => {
    const res = await routes.request('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: 'created' }),
    });

    expect(res.status).toBe(STATUS_CODE.Created);
    expect(await res.json()).toMatchObject({ description: 'created' });
  });

  it('should send an error if required values are missing', async () => {
    const res = await routes.request('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    expect(res.status).toBe(STATUS_CODE.BadRequest);
  });
});

describe('read', () => {
  let createdJson: { id: string };

  beforeEach(async () => {
    createdJson = (await (
      await routes.request('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: 'created' }),
      })
    ).json()) as { id: string };
  });

  it('should get a list of tasks', async () => {
    const res = await routes.request('/');

    expect(res.status).toBe(STATUS_CODE.OK);
    expect(await res.json()).toMatchObject([
      {
        id: createdJson.id,
        description: 'created',
      },
    ]);
  });

  it('should get a task', async () => {
    const res = await routes.request(`/${createdJson.id}`);

    expect(res.status).toBe(STATUS_CODE.OK);
    expect(await res.json()).toMatchObject({
      id: createdJson.id,
      description: 'created',
    });
  });

  it('should send an error if an invalid id is provided', async () => {
    const res = await routes.request('/test');

    expect(res.status).toBe(STATUS_CODE.BadRequest);
  });

  it('should send an error if an unavailable id is provided', async () => {
    const res = await routes.request('/04aed59a-032c-4437-97f5-cec7477b8158');

    expect(res.status).toBe(STATUS_CODE.NotFound);
  });
});

describe('update', () => {
  let createdJson: { id: string };

  beforeEach(async () => {
    createdJson = (await (
      await routes.request('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: 'created' }),
      })
    ).json()) as { id: string };
  });

  it('should update a task', async () => {
    const res = await routes.request(`/${createdJson.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: 'updated' }),
    });

    expect(res.status).toBe(STATUS_CODE.OK);
    expect(await res.json()).toMatchObject({
      description: 'updated',
    });
  });

  it('should send an error if no values are provided', async () => {
    const res = await routes.request(`/${createdJson.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    expect(res.status).toBe(STATUS_CODE.BadRequest);
  });

  it('should send an error if an invalid id is provided', async () => {
    const res = await routes.request('/test', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: 'updated' }),
    });

    expect(res.status).toBe(STATUS_CODE.BadRequest);
  });

  it('should send an error if an unavailable id is provided', async () => {
    const res = await routes.request('/04aed59a-032c-4437-97f5-cec7477b8158', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: 'updated' }),
    });

    expect(res.status).toBe(STATUS_CODE.NotFound);
  });
});

describe('delete', () => {
  it('should delete a task', async () => {
    const createdJson = (await (
      await routes.request('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: 'created' }),
      })
    ).json()) as { id: string };

    const res = await routes.request(`/${createdJson.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(STATUS_CODE.NoContent);
  });

  it('should send an error if an invalid id is provided', async () => {
    const res = await routes.request('/test', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(STATUS_CODE.BadRequest);
  });

  it('should send an error if an unavailable id is provided', async () => {
    const res = await routes.request('/04aed59a-032c-4437-97f5-cec7477b8158', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(STATUS_CODE.NotFound);
  });
});
