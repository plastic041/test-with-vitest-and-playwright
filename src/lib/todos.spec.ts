import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import type { Todo } from '../typings/todo'
import { add, edit, remove, sort, toggle } from './todos'

function getTodos(): Todo[] {
  return [
    {
      id: '1',
      content: 'first todo',
    },
    {
      id: '2',
      content: 'second todo',
      completedAt: 1592265600000,
    },
  ]
}

describe('todos', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    const date = new Date('2020-08-18T00:00:00.000Z')
    vi.setSystemTime(date)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('add', () => {
    const defaultTodos = getTodos()
    const todos = add('third todo', defaultTodos)
    expect(todos).toEqual([
      {
        id: '1',
        content: 'first todo',
      },
      {
        id: '2',
        content: 'second todo',
        completedAt: '2020-06-16T00:00:00.000Z',
      },
      {
        id: expect.any(String),
        content: 'third todo',
      },
    ])
  })

  test('edit', () => {
    const defaultTodos = getTodos()
    const todos = edit('1', 'first todo edited', defaultTodos)
    expect(todos).toEqual([
      {
        id: '1',
        content: 'first todo edited',
      },
      {
        id: '2',
        content: 'second todo',
        completedAt: '2020-06-16T00:00:00.000Z',
      },
    ])
  })

  test('remove', () => {
    const defaultTodos = getTodos()
    const todos = remove('1', defaultTodos)
    expect(todos).toEqual([
      {
        id: '2',
        content: 'second todo',
        completedAt: '2020-06-16T00:00:00.000Z',
      },
    ])
  })

  test('toggle to complete', () => {
    const defaultTodos = getTodos()
    const todos = toggle('1', defaultTodos)
    expect(todos).toEqual([
      {
        id: '1',
        content: 'first todo',
        completedAt: '2020-08-18T00:00:00.000Z',
      },
      {
        id: '2',
        content: 'second todo',
        completedAt: '2020-06-16T00:00:00.000Z',
      },
    ])
  })

  test('toggle to not complete', () => {
    const defaultTodos = getTodos()
    const todos = toggle('2', defaultTodos)
    expect(todos).toEqual([
      {
        id: '1',
        content: 'first todo',
      },
      {
        id: '2',
        content: 'second todo',
      },
    ])
  })

  test('sort', () => {
    const defaultTodos = getTodos()
    const todos = sort(defaultTodos)
    expect(todos).toEqual([
      {
        id: '1',
        content: 'first todo',
      },
      {
        id: '2',
        content: 'second todo',
        completedAt: '2020-06-16T00:00:00.000Z',
      },
    ])
  })
})
