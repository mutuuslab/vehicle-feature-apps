// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00183 5.5.0 「스마트 크루즈 컨트롤」 — 선행 차량과의 설정 거리 및 속도를 유지하며, 정지 후 재출발 시 운전자 확인 조건을 명시
// 모든 분기는 flag-guards.ts의 함수로만 Flag를 읽는다. 오류·시간 초과는 꺼짐(기존 경로)으로 간다.
import { flagOn, guardAllows, type FeatureDeps } from '../../../../runtime/src/flag-client.ts';
import { ADAS_00183_ENABLE, ADAS_00183_SIGNAL } from './flags.ts';
import { adas00183EnableEnabled, adas00183SignalEnabled } from './flag-guards.ts';

export const FEATURE = { featureId: 'FEAT-00183', version: '5.5.0', name: '스마트 크루즈 컨트롤', safetyRelated: true } as const;

/** 켜짐 판단 — 안전 관련 Feature(F2 이상)라 차량 로컬 Guard도 허용해야 켠다 */
async function enabled(d: FeatureDeps, flagKey: string, read: () => Promise<boolean>): Promise<boolean> {
  if (!(await flagOn(read, d.timeoutMs))) return false;
  return guardAllows(d.localGuard, flagKey, d.vin);
}

/** Flag 제어점(adas_00183_enable) — 켜지면 새 기능 경로, 꺼지면 기존 경로 */
export async function runFeature(d: FeatureDeps): Promise<{ path: 'NEW' | 'LEGACY'; flagKey: string }> {
  const on = await enabled(d, ADAS_00183_ENABLE, () => adas00183EnableEnabled(d.client, { targetingKey: d.vin }));
  return { path: on ? 'NEW' : 'LEGACY', flagKey: ADAS_00183_ENABLE };
}

export const SIGNAL = 'feat-00183.adas_00183_signal';
/** Signal 제어점(adas_00183_signal) — 켜졌을 때만 신호를 발행한다 */
export async function emitSignal(d: FeatureDeps, value: string): Promise<boolean> {
  const on = await enabled(d, ADAS_00183_SIGNAL, () => adas00183SignalEnabled(d.client, { targetingKey: d.vin }));
  if (on) d.signals.publish(SIGNAL, value);
  return on;
}
