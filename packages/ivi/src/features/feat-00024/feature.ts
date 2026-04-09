// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00024 1.0.0 「IC·JC 경로 사전안내」 — 고속도로 주행 중 전방 IC·JC 진입·진출 방향, 남은 거리와 필요한 차선을 실제 차선 형태로 IVI에 사전 안내
// 모든 분기는 flag-guards.ts의 함수로만 Flag를 읽는다. 오류·시간 초과는 꺼짐(기존 경로)으로 간다.
import { flagOn, guardAllows, type FeatureDeps } from '../../../../runtime/src/flag-client.ts';
import { IVI_00024_GUIDE, IVI_00024_SIGNAL } from './flags.ts';
import { ivi00024GuideEnabled, ivi00024SignalEnabled } from './flag-guards.ts';

export const FEATURE = { featureId: 'FEAT-00024', version: '1.0.0', name: 'IC·JC 경로 사전안내', safetyRelated: false } as const;

/** 켜짐 판단 — QM Feature라 로컬 Guard는 보지 않는다 */
async function enabled(d: FeatureDeps, flagKey: string, read: () => Promise<boolean>): Promise<boolean> {
  if (!(await flagOn(read, d.timeoutMs))) return false;
  return true;
}

/** Flag 제어점(ivi_00024_guide) — 켜지면 새 기능 경로, 꺼지면 기존 경로 */
export async function runFeature(d: FeatureDeps): Promise<{ path: 'NEW' | 'LEGACY'; flagKey: string }> {
  const on = await enabled(d, IVI_00024_GUIDE, () => ivi00024GuideEnabled(d.client, { targetingKey: d.vin }));
  return { path: on ? 'NEW' : 'LEGACY', flagKey: IVI_00024_GUIDE };
}

export const SIGNAL = 'feat-00024.ivi_00024_signal';
/** Signal 제어점(ivi_00024_signal) — 켜졌을 때만 신호를 발행한다 */
export async function emitSignal(d: FeatureDeps, value: string): Promise<boolean> {
  const on = await enabled(d, IVI_00024_SIGNAL, () => ivi00024SignalEnabled(d.client, { targetingKey: d.vin }));
  if (on) d.signals.publish(SIGNAL, value);
  return on;
}
