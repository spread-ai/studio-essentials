import assert from 'assert';
import { getAllEdges, getAllNodes } from '../src/main';

function expectToDeepEqual(actual: any, expected: any, testCase: string): void {
  try {
	assert.deepEqual(actual, expected, testCase);
	console.log(`\u001B[32m✓\u001B[39m Success: ${testCase}`);
  } catch (error) {
	console.log(`\u001B[31m✗\u001B[39m Fail: ${testCase} // Expected: ${JSON.stringify(expected)} | Actual: ${JSON.stringify(actual)}`);
  }
}

expectToDeepEqual(getAllNodes({}), [], 'getAllNodes({}) returns empty array');
expectToDeepEqual(getAllEdges({}), [], 'getAllEdges({}) returns empty array');