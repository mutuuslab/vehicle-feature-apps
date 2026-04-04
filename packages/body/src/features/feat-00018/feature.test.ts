// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00018 기능 분기 시험 — 기본 OFF, 켜짐 분기, Guard 차단, 오류·시간 초과 시 OFF
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { denyAll, failingClient, fakeClient, hangingClient, testDeps } from '../../../../runtime/src/testing.ts';
import { BODY_00018_ENABLE, BODY_00018_DTC } from './flags.ts';
import { FEATURE, runFeature, reportFault, DTC_CODE } from './feature.ts';

const ALL = [BODY_00018_ENABLE, BODY_00018_DTC];

test('FEAT-00018 레거시 원격 시동 Gen1 — 기본값 OFF(Flag 없음)는 기존 경로', async () => {
  const d = testDeps(fakeClient([]));
  assert.equal((await runFeature(d)).path, 'LEGACY');
  assert.equal(await reportFault(d), 'LOGGED');
  assert.equal(d.recorded.reported.length, 0);
});

test('FEAT-00018 레거시 원격 시동 Gen1 — 켜지면 새 경로', async () => {
  const d = testDeps(fakeClient(ALL));
  assert.equal(FEATURE.featureId, 'FEAT-00018');
  assert.equal((await runFeature(d)).path, 'NEW');
  assert.equal(await reportFault(d), 'REPORTED');
  assert.equal(d.recorded.reported.length, 1);
});

test('FEAT-00018 레거시 원격 시동 Gen1 — QM이라 로컬 Guard와 무관', async () => {
  const d = testDeps(fakeClient(ALL), { guard: denyAll });
  assert.equal((await runFeature(d)).path, 'NEW');
  assert.equal(await reportFault(d), 'REPORTED');
});

test('FEAT-00018 레거시 원격 시동 Gen1 — 클라이언트 오류·시간 초과는 꺼짐', async () => {
  for (const client of [failingClient, hangingClient]) {
    const d = testDeps(client, { timeoutMs: 5 });
    assert.equal((await runFeature(d)).path, 'LEGACY');
    assert.equal(await reportFault(d), 'LOGGED');
  }
});

test('FEAT-00018 레거시 원격 시동 Gen1 — body_00018_dtc 꺼지면 고장 코드 보고 0회(내부 기록만)', async () => {
  const d = testDeps(fakeClient([]));
  await reportFault(d);
  assert.deepEqual(d.recorded.reported, []);
  assert.deepEqual(d.recorded.logged, [DTC_CODE]);
});
