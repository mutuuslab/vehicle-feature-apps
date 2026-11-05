// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00005 5.5.0 「스마트 크루즈 컨트롤」 — 선행 차량과의 설정 거리 및 속도를 유지하며, 정지 후 재출발 시 운전자 확인 조건을 명시
// 모든 분기는 flag-guards.ts의 함수로만 Flag를 읽는다. 오류·시간 초과는 꺼짐(기존 경로)으로 간다.
import { flagOn, guardAllows, type FeatureDeps } from '../../../../runtime/src/flag-client.ts';
import { ADAS_00005_SCC, ADAS_00005_SIGNAL } from './flags.ts';
import { adas00005SccEnabled } from './flag-guards.ts';

export const FEATURE = { featureId: 'FEAT-00005', version: '5.5.0', name: '스마트 크루즈 컨트롤', safetyRelated: true } as const;

/** 켜짐 판단 — 안전 관련 Feature(F2 이상)라 차량 로컬 Guard도 허용해야 켠다 */
async function enabled(d: FeatureDeps, flagKey: string, read: () => Promise<boolean>): Promise<boolean> {
  if (!(await flagOn(read, d.timeoutMs))) return false;
  return guardAllows(d.localGuard, flagKey, d.vin);
}

/** Flag 제어점(adas_00005_scc) — 켜지면 새 기능 경로, 꺼지면 기존 경로 */
export async function runFeature(d: FeatureDeps): Promise<{ path: 'NEW' | 'LEGACY'; flagKey: string }> {
  const on = await enabled(d, ADAS_00005_SCC, () => adas00005SccEnabled(d.client, { targetingKey: d.vin }));
  return { path: on ? 'NEW' : 'LEGACY', flagKey: ADAS_00005_SCC };
}

export const SIGNAL = 'feat-00005.adas_00005_signal';
/** Signal 제어점(adas_00005_signal) — 정리됨: 신호를 발행하지 않는다 */
export async function emitSignal(d: FeatureDeps, value: string): Promise<boolean> {
  // 정리: 신호 발행을 걷어냈다(ADAS_00005_SIGNAL)
  void d;
  void value;
  return false;
}
