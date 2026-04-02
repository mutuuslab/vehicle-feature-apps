// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00014 1.0.0 「증강현실 HUD 내비게이션」 — 전방 영상과 지도 정보를 정합해 HUD에 안내 표시
// 모든 분기는 flag-guards.ts의 함수로만 Flag를 읽는다. 오류·시간 초과는 꺼짐(기존 경로)으로 간다.
import { flagOn, guardAllows, type FeatureDeps } from '../../../../runtime/src/flag-client.ts';
import { IVI_00014_ENABLE, IVI_00014_SIGNAL } from './flags.ts';
import { ivi00014EnableEnabled, ivi00014SignalEnabled } from './flag-guards.ts';

export const FEATURE = { featureId: 'FEAT-00014', version: '1.0.0', name: '증강현실 HUD 내비게이션', safetyRelated: false } as const;

/** 켜짐 판단 — QM Feature라 로컬 Guard는 보지 않는다 */
async function enabled(d: FeatureDeps, flagKey: string, read: () => Promise<boolean>): Promise<boolean> {
  if (!(await flagOn(read, d.timeoutMs))) return false;
  return true;
}

/** Flag 제어점(ivi_00014_enable) — 켜지면 새 기능 경로, 꺼지면 기존 경로 */
export async function runFeature(d: FeatureDeps): Promise<{ path: 'NEW' | 'LEGACY'; flagKey: string }> {
  const on = await enabled(d, IVI_00014_ENABLE, () => ivi00014EnableEnabled(d.client, { targetingKey: d.vin }));
  return { path: on ? 'NEW' : 'LEGACY', flagKey: IVI_00014_ENABLE };
}

export const SIGNAL = 'feat-00014.ivi_00014_signal';
/** Signal 제어점(ivi_00014_signal) — 켜졌을 때만 신호를 발행한다 */
export async function emitSignal(d: FeatureDeps, value: string): Promise<boolean> {
  const on = await enabled(d, IVI_00014_SIGNAL, () => ivi00014SignalEnabled(d.client, { targetingKey: d.vin }));
  if (on) d.signals.publish(SIGNAL, value);
  return on;
}
