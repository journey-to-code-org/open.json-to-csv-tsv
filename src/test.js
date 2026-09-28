import test from 'node:test';
import assert from 'node:assert/strict';
import { jsonToCsv } from './index.js';

test('converts basic array of objects to CSV', () => {
  const data = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 }
  ];
  const expected = 'name,age\nAlice,30\nBob,25';
  
  assert.equal(jsonToCsv(data), expected);
});

test('converts to TSV when format option is "tsv"', () => {
  const data = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 }
  ];
  const expected = 'name\tage\nAlice\t30\nBob\t25';

  assert.equal(jsonToCsv(data, { format: 'tsv' }), expected);
});

test('handles special characters by escaping cells with quotes', () => {
  const data = [
    { name: 'Doe, John', quote: 'He said "Hello"', notes: 'Line 1\nLine 2' }
  ];
  const expected = 'name,quote,notes\n"Doe, John","He said ""Hello""","Line 1\nLine 2"';

  assert.equal(jsonToCsv(data), expected);
});

test('handles custom headers and missing fields', () => {
  const data = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', city: 'NYC' }
  ];
  const expected = 'name,city\nAlice,\nBob,NYC';

  assert.equal(jsonToCsv(data, { headers: ['name', 'city'] }), expected);
});

test('returns empty string for empty input', () => {
  assert.equal(jsonToCsv([]), '');
  assert.equal(jsonToCsv(null), '');
});