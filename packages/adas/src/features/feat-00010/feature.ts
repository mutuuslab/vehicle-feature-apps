// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00010 2.0.0 「운전자 모니터링 시스템」 — 시선·눈감음·주의분산을 감지해 단계별 경고
// 모든 분기는 flag-guards.ts의 함수로만 Flag를 읽는다. 오류·시간 초과는 꺼짐(기존 경로)으로 간다.
import { flagOn, guardAllows, type FeatureDeps } from '../../../../runtime/src/flag-client.ts';
import { ADAS_00010_ENABLE, ADAS_00010_PARAM } from './flags.ts';
import { adas00010EnableEnabled, adas00010ParamEnabled } from './flag-guards.ts';

export const FEATURE = { featureId: 'FEAT-00010', version: '2.0.0', name: '운전자 모니터링 시스템', safetyRelated: true } as const;

/** 켜짐 판단 — 안전 관련 Feature(F2 이상)라 차량 로컬 Guard도 허용해야 켠다 */
async function enabled(d: FeatureDeps, flagKey: string, read: () => Promise<boolean>): Promise<boolean> {
  if (!(await flagOn(read, d.timeoutMs))) return false;
  return guardAllows(d.localGuard, flagKey, d.vin);
}

/** Flag 제어점(adas_00010_enable) — 켜지면 새 기능 경로, 꺼지면 기존 경로 */
export async function runFeature(d: FeatureDeps): Promise<{ path: 'NEW' | 'LEGACY'; flagKey: string }> {
  const on = await enabled(d, ADAS_00010_ENABLE, () => adas00010EnableEnabled(d.client, { targetingKey: d.vin }));
  return { path: on ? 'NEW' : 'LEGACY', flagKey: ADAS_00010_ENABLE };
}

export const PARAM_DEFAULT = 44;
export const PARAM_RANGE = { min: 22, max: 132 } as const;
/** Parameter 제어점(adas_00010_param) — 켜지면 보정값의 새 파라미터 묶음(범위 밖이면 기본), 꺼지면 기본 파라미터 */
export async function applyParameters(d: FeatureDeps): Promise<{ value: number; source: 'DEFAULT' | 'CALIBRATION' }> {
  if (!(await enabled(d, ADAS_00010_PARAM, () => adas00010ParamEnabled(d.client, { targetingKey: d.vin })))) return { value: PARAM_DEFAULT, source: 'DEFAULT' };
  const v = d.calibration.value(ADAS_00010_PARAM);
  if (typeof v !== 'number' || !Number.isFinite(v) || v < PARAM_RANGE.min || v > PARAM_RANGE.max) return { value: PARAM_DEFAULT, source: 'DEFAULT' };
  return { value: v, source: 'CALIBRATION' };
}
