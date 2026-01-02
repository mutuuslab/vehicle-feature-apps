// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { flagOn, guardAllows } from './flag-client.ts';

test('flagOn — true만 켜짐, 오류·시간 초과·다른 값은 꺼짐', async () => {
  assert.equal(await flagOn(async () => true), true);
  assert.equal(await flagOn(async () => false), false);
  assert.equal(await flagOn(async () => {
    throw new Error('실패');
  }), false);
  assert.equal(await flagOn(() => new Promise<boolean>(() => undefined), 5), false);
  assert.equal(await flagOn(async () => 1 as unknown as boolean), false);
});

test('guardAllows — Guard 오류는 막힘', () => {
  assert.equal(guardAllows({ allows: () => true }, 'x_00001_enable', 'VIN'), true);
  assert.equal(guardAllows({ allows: () => {
    throw new Error('고장');
  } }, 'x_00001_enable', 'VIN'), false);
});
