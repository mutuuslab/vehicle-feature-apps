// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { failingClient, fakeClient, TEST_VIN } from '../../../../runtime/src/testing.ts';
import { experimentEnabled } from './experiment.ts';

test('FEAT-00183 실험 스위치 — 기본 꺼짐, 오류도 꺼짐', async () => {
  assert.equal(await experimentEnabled(fakeClient([]), TEST_VIN), false);
  assert.equal(await experimentEnabled(fakeClient(['adas_00183_experiment']), TEST_VIN), true);
  assert.equal(await experimentEnabled(failingClient, TEST_VIN), false);
});
