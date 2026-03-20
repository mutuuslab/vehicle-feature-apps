// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00004 기능 분기 시험 — 기본 OFF, 켜짐 분기, Guard 차단, 오류·시간 초과 시 OFF
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { denyAll, failingClient, fakeClient, hangingClient, testDeps } from '../../../../runtime/src/testing.ts';
import { ADAS_00004_ENABLE, ADAS_00004_PARAM } from './flags.ts';
import { FEATURE, runFeature, applyParameters, PARAM_DEFAULT, PARAM_RANGE } from './feature.ts';

const ALL = [ADAS_00004_ENABLE, ADAS_00004_PARAM];

test('FEAT-00004 고속도로 주행 보조 2 — 기본값 OFF(Flag 없음)는 기존 경로', async () => {
  const d = testDeps(fakeClient([]), { calibration: { [ADAS_00004_PARAM]: 44 } });
  assert.equal((await runFeature(d)).path, 'LEGACY');
  assert.deepEqual(await applyParameters(d), { value: PARAM_DEFAULT, source: 'DEFAULT' });
});

test('FEAT-00004 고속도로 주행 보조 2 — 켜지면 새 경로', async () => {
  const d = testDeps(fakeClient(ALL), { calibration: { [ADAS_00004_PARAM]: 44 } });
  assert.equal(FEATURE.featureId, 'FEAT-00004');
  assert.equal((await runFeature(d)).path, 'NEW');
  assert.deepEqual(await applyParameters(d), { value: 44, source: 'CALIBRATION' });
});

test('FEAT-00004 고속도로 주행 보조 2 — 로컬 Guard가 막으면 꺼짐(F2 이상)', async () => {
  const d = testDeps(fakeClient(ALL), { guard: denyAll, calibration: { [ADAS_00004_PARAM]: 44 } });
  assert.equal((await runFeature(d)).path, 'LEGACY');
  assert.deepEqual(await applyParameters(d), { value: PARAM_DEFAULT, source: 'DEFAULT' });
});

test('FEAT-00004 고속도로 주행 보조 2 — 클라이언트 오류·시간 초과는 꺼짐', async () => {
  for (const client of [failingClient, hangingClient]) {
    const d = testDeps(client, { timeoutMs: 5, calibration: { [ADAS_00004_PARAM]: 44 } });
    assert.equal((await runFeature(d)).path, 'LEGACY');
    assert.deepEqual(await applyParameters(d), { value: PARAM_DEFAULT, source: 'DEFAULT' });
  }
});

test('FEAT-00004 고속도로 주행 보조 2 — adas_00004_param 범위 밖 보정값은 기본 파라미터', async () => {
  const d = testDeps(fakeClient([ADAS_00004_PARAM]), { calibration: { [ADAS_00004_PARAM]: PARAM_RANGE.max + 1 } });
  assert.deepEqual(await applyParameters(d), { value: PARAM_DEFAULT, source: 'DEFAULT' });
});
