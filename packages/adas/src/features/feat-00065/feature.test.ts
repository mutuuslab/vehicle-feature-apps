// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00065 기능 분기 시험 — 기본 OFF, 켜짐 분기, Guard 차단, 오류·시간 초과 시 OFF
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { denyAll, failingClient, fakeClient, hangingClient, testDeps } from '../../../../runtime/src/testing.ts';
import { ADAS_00065_ENABLE } from './flags.ts';
import { FEATURE, runFeature } from './feature.ts';

const ALL = [ADAS_00065_ENABLE];

test('FEAT-00065 지능형 속도 제한 보조 — 기본값 OFF(Flag 없음)는 기존 경로', async () => {
  const d = testDeps(fakeClient([]));
  assert.equal((await runFeature(d)).path, 'LEGACY');
});

test('FEAT-00065 지능형 속도 제한 보조 — 켜지면 새 경로', async () => {
  const d = testDeps(fakeClient(ALL));
  assert.equal(FEATURE.featureId, 'FEAT-00065');
  assert.equal((await runFeature(d)).path, 'NEW');
});

test('FEAT-00065 지능형 속도 제한 보조 — 로컬 Guard가 막으면 꺼짐(F2 이상)', async () => {
  const d = testDeps(fakeClient(ALL), { guard: denyAll });
  assert.equal((await runFeature(d)).path, 'LEGACY');
});

test('FEAT-00065 지능형 속도 제한 보조 — 클라이언트 오류·시간 초과는 꺼짐', async () => {
  for (const client of [failingClient, hangingClient]) {
    const d = testDeps(client, { timeoutMs: 5 });
    assert.equal((await runFeature(d)).path, 'LEGACY');
  }
});
