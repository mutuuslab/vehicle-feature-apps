// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00001 기능 분기 시험 — 기본 OFF, 켜짐 분기, Guard 차단, 오류·시간 초과 시 OFF
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { denyAll, failingClient, fakeClient, hangingClient, testDeps } from '../../../../runtime/src/testing.ts';
import { ADAS_00001_ENABLE, ADAS_00001_PARAM, ADAS_00001_SIGNAL } from './flags.ts';
import { FEATURE, runFeature, applyParameters, emitSignal, PARAM_DEFAULT, PARAM_RANGE, SIGNAL } from './feature.ts';

const ALL = [ADAS_00001_ENABLE, ADAS_00001_PARAM, ADAS_00001_SIGNAL];

test('FEAT-00001 원격 스마트 주차 보조 — 기본값 OFF(Flag 없음)는 기존 경로', async () => {
  const d = testDeps(fakeClient([]), { calibration: { [ADAS_00001_PARAM]: 54 } });
  assert.equal((await runFeature(d)).path, 'LEGACY');
  assert.deepEqual(await applyParameters(d), { value: PARAM_DEFAULT, source: 'DEFAULT' });
  assert.equal(await emitSignal(d, 'ON'), false);
  assert.equal(d.recorded.signals.length, 0);
});

test('FEAT-00001 원격 스마트 주차 보조 — 켜지면 새 경로', async () => {
  const d = testDeps(fakeClient(ALL), { calibration: { [ADAS_00001_PARAM]: 54 } });
  assert.equal(FEATURE.featureId, 'FEAT-00001');
  assert.equal((await runFeature(d)).path, 'NEW');
  assert.deepEqual(await applyParameters(d), { value: 54, source: 'CALIBRATION' });
  assert.equal(await emitSignal(d, 'ON'), true);
  assert.equal(d.recorded.signals.length, 1);
});

test('FEAT-00001 원격 스마트 주차 보조 — 로컬 Guard가 막으면 꺼짐(F2 이상)', async () => {
  const d = testDeps(fakeClient(ALL), { guard: denyAll, calibration: { [ADAS_00001_PARAM]: 54 } });
  assert.equal((await runFeature(d)).path, 'LEGACY');
  assert.deepEqual(await applyParameters(d), { value: PARAM_DEFAULT, source: 'DEFAULT' });
  assert.equal(await emitSignal(d, 'ON'), false);
});

test('FEAT-00001 원격 스마트 주차 보조 — 클라이언트 오류·시간 초과는 꺼짐', async () => {
  for (const client of [failingClient, hangingClient]) {
    const d = testDeps(client, { timeoutMs: 5, calibration: { [ADAS_00001_PARAM]: 54 } });
    assert.equal((await runFeature(d)).path, 'LEGACY');
    assert.deepEqual(await applyParameters(d), { value: PARAM_DEFAULT, source: 'DEFAULT' });
    assert.equal(await emitSignal(d, 'ON'), false);
  }
});

test('FEAT-00001 원격 스마트 주차 보조 — adas_00001_param 범위 밖 보정값은 기본 파라미터', async () => {
  const d = testDeps(fakeClient([ADAS_00001_PARAM]), { calibration: { [ADAS_00001_PARAM]: PARAM_RANGE.max + 1 } });
  assert.deepEqual(await applyParameters(d), { value: PARAM_DEFAULT, source: 'DEFAULT' });
});

test('FEAT-00001 원격 스마트 주차 보조 — adas_00001_signal 꺼지면 신호 발행 0회', async () => {
  const d = testDeps(fakeClient([]));
  await emitSignal(d, 'ON');
  assert.deepEqual(d.recorded.signals.filter((s) => s.signal === SIGNAL), []);
});
