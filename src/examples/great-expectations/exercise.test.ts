import { describe, expect, it } from 'vitest';
import { createPerson, Person } from '$lib/person';
import { KanbanBoard } from '$lib/kanban-board';

/**
 * toBe: https://vitest.dev/api/expect.html#tobe
 * toBeCloseTo: https://vitest.dev/api/expect.html#tobecloseto
 * toBeInstanceOf: https://vitest.dev/api/expect.html#tobeinstanceof
 * toBeUndefined: https://vitest.dev/api/expect.html#tobeundefined
 * toContain: https://vitest.dev/api/expect.html#tocontain
 * toThrow: https://vitest.dev/api/expect.html#tothrow
 * toThrowError: https://vitest.dev/api/expect.html#tothrowerror
 */

it('should pass if the two numbers would add up correctly in a language other than JavaScript', () => {
  expect(0.2 + 0.1).toBeCloseTo(0.3, 10);
});

describe('createPerson', () => {
  it('should create an instance of a person', () => {
    const person = createPerson('Ada Lovelace');
    expect(person).toBeInstanceOf(Person);
  });
});

describe('Kanban Board', () => {
  it('should include "Backlog" in board.statuses', () => {
    const board = new KanbanBoard('Things to Do');
    expect(board.statuses).toContain('Backlog');
  });

  it('should *not* include "Bogus" in board.statuses', () => {
    const board = new KanbanBoard('Things to Do');
    expect(board.statuses).not.toContain('Bogus');
  });

  it('should include an added status in board.statuses using #addStatus', () => {
    const board = new KanbanBoard('Things to Do');
    expect(board.statuses).not.toContain('Watch Resident Alien');
    board.addStatus('Watch Resident Alien');
    expect(board.statuses).toContain('Watch Resident Alien');
  });

  it('should remove a status using #removeStatus', () => {
    const board = new KanbanBoard('Things to Do');

    board.addStatus('Watch Resident Alien');
    expect(board.statuses).toContain('Watch Resident Alien');
    board.removeStatus('Watch Resident Alien');
    expect(board.statuses).not.toContain('Watch Resident Alien');
  });
});

describe('Person', () => {
  it('will create a person with a first name', () => {
    const person = new Person('Madonna');
    expect(person.firstName).toBe('Madonna');
    expect(person.middleName).toBe(undefined);
    expect(person.lastName).toBe(undefined);
  });

  it('will create a person with a first and last name', () => {
    const person = new Person('Madonna Ciccone');
    expect(person.firstName).toBe('Madonna');
    expect(person.middleName).toBe(undefined);
    expect(person.lastName).toBe('Ciccone');
  });

  it('will create a person with a first, middle, and last name', () => {
    const person = new Person('Madonna Louise Ciccone');
    expect(person.firstName).toBe('Madonna');
    expect(person.middleName).toBe('Louise');
    expect(person.lastName).toBe('Ciccone');
  });

  it('will throw if you provide an empty string', () => {
    const fn = () => {
      new Person('');
    };
    expect(fn).toThrow();
  });

  it('will throw a specific error message if you provide an empty string', () => {
    const errorMessage = 'fullName cannot be an empty string';

    const fn = () => {
      new Person('');
    };

    expect(fn).toThrowError(errorMessage);
  });

  it('will add a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);

    expect(Array.from(paul.friends)).toContains(john);
  });

  it('will mutually add a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);

    expect(Array.from(paul.friends)).toContain(john);
  });

  it('will remove a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);
    john.removeFriend(paul);

    expect(Array.from(john.friends)).not.toContain(paul);
  });

  it('will mutually remove friends', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);
    john.removeFriend(paul);

    expect(Array.from(paul.friends)).not.toContain(john);
  });
});

const explode = () => {
  throw new Error('Something went terribly wrong');
};

describe('explode', () => {
  it('should throw an error', () => {
    expect(explode).toThrowError();
  });

  it('should throw a specific error containing "terribly wrong"', () => {
    expect(explode).toThrowError('terribly wrong');
  });
});
