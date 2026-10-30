// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00081 2.5.0 「후석 엔터테인먼트 Gen1」 — 구형 후석 디스플레이에 로컬 미디어와 미러링 제공
// 모든 분기는 flag-guards.ts의 함수로만 Flag를 읽는다. 오류·시간 초과는 꺼짐(기존 경로)으로 간다.
import { flagOn, guardAllows, type FeatureDeps } from '../../../../runtime/src/flag-client.ts';
import { IVI_00081_ENABLE, IVI_00081_ENABLE_2 } from './flags.ts';
import { ivi00081EnableEnabled, ivi00081Enable2Enabled } from './flag-guards.ts';

export const FEATURE = { featureId: 'FEAT-00081', version: '2.5.0', name: '후석 엔터테인먼트 Gen1', safetyRelated: false } as const;

/** 켜짐 판단 — QM Feature라 로컬 Guard는 보지 않는다 */
async function enabled(d: FeatureDeps, flagKey: string, read: () => Promise<boolean>): Promise<boolean> {
  if (!(await flagOn(read, d.timeoutMs))) return false;
  return true;
}

/** Flag 제어점(ivi_00081_enable) — 켜지면 새 기능 경로, 꺼지면 기존 경로 */
export async function runFeature(d: FeatureDeps): Promise<{ path: 'NEW' | 'LEGACY'; flagKey: string }> {
  const on = await enabled(d, IVI_00081_ENABLE, () => ivi00081EnableEnabled(d.client, { targetingKey: d.vin }));
  return { path: on ? 'NEW' : 'LEGACY', flagKey: IVI_00081_ENABLE };
}

/** Flag 제어점(ivi_00081_enable_2) — 켜지면 새 기능 경로, 꺼지면 기존 경로 */
export async function runFeature2(d: FeatureDeps): Promise<{ path: 'NEW' | 'LEGACY'; flagKey: string }> {
  const on = await enabled(d, IVI_00081_ENABLE_2, () => ivi00081Enable2Enabled(d.client, { targetingKey: d.vin }));
  return { path: on ? 'NEW' : 'LEGACY', flagKey: IVI_00081_ENABLE_2 };
}

/** 지역별 안내 배너 실험 — 지역 코드로 키를 조합한다 */
export async function regionalBanner(d: FeatureDeps, region: 'kr' | 'eu'): Promise<{ banner: boolean; compact: boolean }> {
  const ctx = { targetingKey: d.vin };
  const banner = await flagOn(() => d.client.getBooleanValue(`ivi_${region}_banner`, false, ctx), d.timeoutMs);
  const compact = await flagOn(() => d.client.getBooleanValue(`ivi_${region}_compact`, false, ctx), d.timeoutMs);
  return { banner, compact };
}
