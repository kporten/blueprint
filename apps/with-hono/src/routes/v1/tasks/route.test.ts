import { beforeEach, describe, expect, it } from 'bun:test';

import { STATUS_CODE } from '@std/http/status';
import type { InferResponseType } from 'hono';
import { testClient } from 'hono/testing';

import tasks from './route';

const client = testClient(tasks);

describe('create', () => {
  it('should create a task', async () => {
    const res = await client.index.$post({
      json: {
        description: 'created',
      },
    });

    expect(res.status).toBe(STATUS_CODE.Created);
    expect(await res.json()).toMatchObject({
      description: 'created',
    });
  });

  it('should send an error if required values are missing', async () => {
    const res = await client.index.$post({
      // @ts-expect-error without required values
      json: {},
    });

    expect(res.status).toBe(STATUS_CODE.BadRequest);
  });
});

describe('read', () => {
  let createdJson: InferResponseType<typeof client.index.$post>;

  beforeEach(async () => {
    createdJson = await (
      await client.index.$post({
        json: {
          description: 'created',
        },
      })
    ).json();
  });

  it('should get a list of tasks', async () => {
    const res = await client.index.$get();

    expect(res.status).toBe(STATUS_CODE.OK);
    expect(await res.json()).toMatchObject([
      {
        id: createdJson.id,
        description: 'created',
      },
    ]);
  });

  it('should get a task', async () => {
    const res = await client[':id'].$get({
      param: {
        id: createdJson.id,
      },
    });

    expect(res.status).toBe(STATUS_CODE.OK);
    expect(await res.json()).toMatchObject({
      id: createdJson.id,
      description: 'created',
    });
  });

  it('should send an error if an invalid id is provided', async () => {
    const res = await client[':id'].$get({
      param: {
        id: 'test',
      },
    });

    expect(res.status).toBe(STATUS_CODE.NotFound);
  });
});

describe('update', () => {
  let createdJson: InferResponseType<typeof client.index.$post>;

  beforeEach(async () => {
    createdJson = await (
      await client.index.$post({
        json: {
          description: 'created',
        },
      })
    ).json();
  });

  it('should update a task', async () => {
    const res = await client[':id'].$patch({
      param: {
        id: createdJson.id,
      },
      json: {
        description: 'updated',
      },
    });

    expect(res.status).toBe(STATUS_CODE.OK);
    expect(await res.json()).toMatchObject({
      description: 'updated',
    });
  });

  it('should send an error if no values are provided', async () => {
    const res = await client[':id'].$patch({
      param: {
        id: createdJson.id,
      },
      json: {},
    });

    expect(res.status).toBe(STATUS_CODE.BadRequest);
  });

  it('should send an error if an invalid id is provided', async () => {
    const res = await client[':id'].$patch({
      param: {
        id: 'test',
      },
      json: {
        description: 'updated',
      },
    });

    expect(res.status).toBe(STATUS_CODE.NotFound);
  });
});

describe('delete', () => {
  it('should delete a task', async () => {
    const createdJson = await (
      await client.index.$post({
        json: {
          description: 'created',
        },
      })
    ).json();

    const res = await client[':id'].$delete({
      param: {
        id: createdJson.id,
      },
    });

    expect(res.status).toBe(STATUS_CODE.NoContent);
  });

  it('should send an error if an invalid id is provided', async () => {
    const res = await client[':id'].$delete({
      param: {
        id: 'test',
      },
    });

    expect(res.status).toBe(STATUS_CODE.NotFound);
  });
});
