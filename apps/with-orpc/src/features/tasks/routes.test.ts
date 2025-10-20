import { beforeEach, describe, expect, it } from 'bun:test';

import { call } from '@orpc/server';

import routes from './routes';

describe('create', () => {
  it('should create a task', () => {
    expect(
      call(routes.tasks.create, {
        body: {
          description: 'created',
        },
      }),
    ).resolves.toMatchObject({ description: 'created' });
  });

  it('should send an error if required values are missing', () => {
    expect(
      call(routes.tasks.create, {
        // @ts-expect-error test
        body: {},
      }),
    ).rejects.toMatchObject({ code: 'BAD_REQUEST' });
  });
});

describe('read', () => {
  let createdJson: { id: string };

  beforeEach(async () => {
    createdJson = await call(routes.tasks.create, {
      body: {
        description: 'created',
      },
    });
  });

  it('should get a list of tasks', () => {
    expect(call(routes.tasks.list, {})).resolves.toMatchObject([
      {
        id: createdJson.id,
        description: 'created',
      },
    ]);
  });

  it('should get a task', () => {
    expect(
      call(routes.tasks.find, { params: { id: createdJson.id } }),
    ).resolves.toMatchObject({
      id: createdJson.id,
      description: 'created',
    });
  });

  it('should send an error if an invalid id is provided', () => {
    expect(
      call(routes.tasks.find, { params: { id: 'test' } }),
    ).rejects.toMatchObject({ code: 'BAD_REQUEST' });
  });

  it('should send an error if an unavailable id is provided', () => {
    expect(
      call(routes.tasks.find, {
        params: { id: '04aed59a-032c-4437-97f5-cec7477b8158' },
      }),
    ).rejects.toMatchObject({ code: 'NOT_FOUND' });
  });
});

describe('update', () => {
  let createdJson: { id: string };

  beforeEach(async () => {
    createdJson = await call(routes.tasks.create, {
      body: {
        description: 'created',
      },
    });
  });

  it('should update a task', () => {
    expect(
      call(routes.tasks.update, {
        params: { id: createdJson.id },
        body: { description: 'updated' },
      }),
    ).resolves.toMatchObject({
      id: createdJson.id,
      description: 'updated',
    });
  });

  it('should send an error if no values are provided', () => {
    expect(
      call(routes.tasks.update, {
        params: { id: createdJson.id },
        body: {},
      }),
    ).rejects.toMatchObject({ code: 'BAD_REQUEST' });
  });

  it('should send an error if an invalid id is provided', () => {
    expect(
      call(routes.tasks.update, {
        params: { id: 'test' },
        body: { description: 'updated' },
      }),
    ).rejects.toMatchObject({ code: 'BAD_REQUEST' });
  });

  it('should send an error if an unavailable id is provided', () => {
    expect(
      call(routes.tasks.update, {
        params: { id: '04aed59a-032c-4437-97f5-cec7477b8158' },
        body: { description: 'updated' },
      }),
    ).rejects.toMatchObject({ code: 'NOT_FOUND' });
  });
});

describe('delete', () => {
  it('should delete a task', async () => {
    const createdJson = await call(routes.tasks.create, {
      body: {
        description: 'created',
      },
    });

    expect(
      call(routes.tasks.remove, {
        params: { id: createdJson.id },
      }),
    ).resolves.toBeUndefined();
  });

  it('should send an error if an invalid id is provided', () => {
    expect(
      call(routes.tasks.remove, {
        params: { id: 'test' },
      }),
    ).rejects.toMatchObject({ code: 'BAD_REQUEST' });
  });

  it('should send an error if an unavailable id is provided', () => {
    expect(
      call(routes.tasks.remove, {
        params: { id: '04aed59a-032c-4437-97f5-cec7477b8158' },
      }),
    ).rejects.toMatchObject({ code: 'NOT_FOUND' });
  });
});
