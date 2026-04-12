// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00027 1.0.0 「고속도로 IC·JC 상세 안내」 — 고속도로 주행 중 전방 IC·JC 정보, 진행 방향, 확대 지도 및 권장 차로를 IVI에 상세 표시
// 모든 분기는 flag-guards.ts의 함수로만 Flag를 읽는다. 오류·시간 초과는 꺼짐(기존 경로)으로 간다.
import { flagOn, guardAllows, type FeatureDeps } from '../../../../runtime/src/flag-client.ts';
import { IVI_00027_DETAIL, IVI_00027_BANNER, IVI_00027_VOICE } from './flags.ts';
import { ivi00027DetailEnabled, ivi00027BannerEnabled, ivi00027VoiceEnabled } from './flag-guards.ts';

export const FEATURE = { featureId: 'FEAT-00027', version: '1.0.0', name: '고속도로 IC·JC 상세 안내', safetyRelated: false } as const;

/** 켜짐 판단 — QM Feature라 로컬 Guard는 보지 않는다 */
async function enabled(d: FeatureDeps, flagKey: string, read: () => Promise<boolean>): Promise<boolean> {
  if (!(await flagOn(read, d.timeoutMs))) return false;
  return true;
}

/** Flag 제어점(ivi_00027_detail) — 켜지면 새 기능 경로, 꺼지면 기존 경로 */
export async function runFeature(d: FeatureDeps): Promise<{ path: 'NEW' | 'LEGACY'; flagKey: string }> {
  const on = await enabled(d, IVI_00027_DETAIL, () => ivi00027DetailEnabled(d.client, { targetingKey: d.vin }));
  return { path: on ? 'NEW' : 'LEGACY', flagKey: IVI_00027_DETAIL };
}

export const SIGNAL = 'feat-00027.ivi_00027_banner';
/** Signal 제어점(ivi_00027_banner) — 켜졌을 때만 신호를 발행한다 */
export async function emitSignal(d: FeatureDeps, value: string): Promise<boolean> {
  const on = await enabled(d, IVI_00027_BANNER, () => ivi00027BannerEnabled(d.client, { targetingKey: d.vin }));
  if (on) d.signals.publish(SIGNAL, value);
  return on;
}

/** Flag 제어점(ivi_00027_voice) — 켜지면 새 기능 경로, 꺼지면 기존 경로 */
export async function runFeature2(d: FeatureDeps): Promise<{ path: 'NEW' | 'LEGACY'; flagKey: string }> {
  const on = await enabled(d, IVI_00027_VOICE, () => ivi00027VoiceEnabled(d.client, { targetingKey: d.vin }));
  return { path: on ? 'NEW' : 'LEGACY', flagKey: IVI_00027_VOICE };
}
