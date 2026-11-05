// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00030 기능 분기 시험 — 기본 OFF, 켜짐 분기, Guard 차단, 오류·시간 초과 시 OFF
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { denyAll, failingClient, fakeClient, hangingClient, testDeps } from '../../../../runtime/src/testing.ts';
import { IVI_00030_ENABLE, IVI_00030_SIGNAL, IVI_00030_DETAIL } from './flags.ts';
import { FEATURE, runFeature, emitSignal, runFeature2, SIGNAL } from './feature.ts';

const ALL = [IVI_00030_ENABLE, IVI_00030_SIGNAL, IVI_00030_DETAIL];

test('FEAT-00030 고속도로 IC·JC 상세 안내 — 기본값 OFF(Flag 없음)는 기존 경로', async () => {
  const d = testDeps(fakeClient([]));
  assert.equal((await runFeature(d)).path, 'LEGACY');
  assert.equal(await emitSignal(d, 'ON'), false);
  assert.equal((await runFeature2(d)).path, 'LEGACY');
  assert.equal(d.recorded.signals.length, 0);
});

test('FEAT-00030 고속도로 IC·JC 상세 안내 — 켜지면 새 경로', async () => {
  const d = testDeps(fakeClient(ALL));
  assert.equal(FEATURE.featureId, 'FEAT-00030');
  assert.equal((await runFeature(d)).path, 'NEW');
  assert.equal(await emitSignal(d, 'ON'), true);
  assert.equal((await runFeature2(d)).path, 'NEW');
  assert.equal(d.recorded.signals.length, 1);
});

test('FEAT-00030 고속도로 IC·JC 상세 안내 — QM이라 로컬 Guard와 무관', async () => {
  const d = testDeps(fakeClient(ALL), { guard: denyAll });
  assert.equal((await runFeature(d)).path, 'NEW');
  assert.equal(await emitSignal(d, 'ON'), true);
  assert.equal((await runFeature2(d)).path, 'NEW');
});

test('FEAT-00030 고속도로 IC·JC 상세 안내 — 클라이언트 오류·시간 초과는 꺼짐', async () => {
  for (const client of [failingClient, hangingClient]) {
    const d = testDeps(client, { timeoutMs: 5 });
    assert.equal((await runFeature(d)).path, 'LEGACY');
    assert.equal(await emitSignal(d, 'ON'), false);
    assert.equal((await runFeature2(d)).path, 'LEGACY');
  }
});

test('FEAT-00030 고속도로 IC·JC 상세 안내 — ivi_00030_signal 꺼지면 신호 발행 0회', async () => {
  const d = testDeps(fakeClient([]));
  await emitSignal(d, 'ON');
  assert.deepEqual(d.recorded.signals.filter((s) => s.signal === SIGNAL), []);
});
