// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00002 기능 분기 시험 — 기본 OFF, 켜짐 분기, Guard 차단, 오류·시간 초과 시 OFF
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { denyAll, failingClient, fakeClient, hangingClient, testDeps } from '../../../../runtime/src/testing.ts';
import { ADAS_00002_ENABLE, ADAS_00002_SIGNAL } from './flags.ts';
import { FEATURE, runFeature, emitSignal, SIGNAL } from './feature.ts';

const ALL = [ADAS_00002_ENABLE, ADAS_00002_SIGNAL];

test('FEAT-00002 주차 충돌방지 보조 — 기본값 OFF(Flag 없음)는 기존 경로', async () => {
  const d = testDeps(fakeClient([]));
  assert.equal((await runFeature(d)).path, 'LEGACY');
  assert.equal(await emitSignal(d, 'ON'), false);
  assert.equal(d.recorded.signals.length, 0);
});

test('FEAT-00002 주차 충돌방지 보조 — 켜지면 새 경로', async () => {
  const d = testDeps(fakeClient(ALL));
  assert.equal(FEATURE.featureId, 'FEAT-00002');
  assert.equal((await runFeature(d)).path, 'NEW');
  assert.equal(await emitSignal(d, 'ON'), true);
  assert.equal(d.recorded.signals.length, 1);
});

test('FEAT-00002 주차 충돌방지 보조 — 로컬 Guard가 막으면 꺼짐(F2 이상)', async () => {
  const d = testDeps(fakeClient(ALL), { guard: denyAll });
  assert.equal((await runFeature(d)).path, 'LEGACY');
  assert.equal(await emitSignal(d, 'ON'), false);
});

test('FEAT-00002 주차 충돌방지 보조 — 클라이언트 오류·시간 초과는 꺼짐', async () => {
  for (const client of [failingClient, hangingClient]) {
    const d = testDeps(client, { timeoutMs: 5 });
    assert.equal((await runFeature(d)).path, 'LEGACY');
    assert.equal(await emitSignal(d, 'ON'), false);
  }
});

test('FEAT-00002 주차 충돌방지 보조 — adas_00002_signal 꺼지면 신호 발행 0회', async () => {
  const d = testDeps(fakeClient([]));
  await emitSignal(d, 'ON');
  assert.deepEqual(d.recorded.signals.filter((s) => s.signal === SIGNAL), []);
});
