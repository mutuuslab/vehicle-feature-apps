// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00067 1.2.0 「지능형 속도 제한 보조」 — 표지판과 지도 속도 제한을 융합해 경고·제어
// 모든 분기는 flag-guards.ts의 함수로만 Flag를 읽는다. 오류·시간 초과는 꺼짐(기존 경로)으로 간다.
import { flagOn, guardAllows, type FeatureDeps } from '../../../../runtime/src/flag-client.ts';
import { ADAS_00067_ENABLE, ADAS_00067_PARAM } from './flags.ts';
import { adas00067EnableEnabled, adas00067ParamEnabled } from './flag-guards.ts';

export const FEATURE = { featureId: 'FEAT-00067', version: '1.2.0', name: '지능형 속도 제한 보조', safetyRelated: true } as const;

/** 켜짐 판단 — 안전 관련 Feature(F2 이상)라 차량 로컬 Guard도 허용해야 켠다 */
async function enabled(d: FeatureDeps, flagKey: string, read: () => Promise<boolean>): Promise<boolean> {
  if (!(await flagOn(read, d.timeoutMs))) return false;
  return guardAllows(d.localGuard, flagKey, d.vin);
}

/** Flag 제어점(adas_00067_enable) — 켜지면 새 기능 경로, 꺼지면 기존 경로 */
export async function runFeature(d: FeatureDeps): Promise<{ path: 'NEW' | 'LEGACY'; flagKey: string }> {
  const on = await enabled(d, ADAS_00067_ENABLE, () => adas00067EnableEnabled(d.client, { targetingKey: d.vin }));
  return { path: on ? 'NEW' : 'LEGACY', flagKey: ADAS_00067_ENABLE };
}

export const PARAM_DEFAULT = 32;
export const PARAM_RANGE = { min: 16, max: 96 } as const;
/** Parameter 제어점(adas_00067_param) — 켜지면 보정값의 새 파라미터 묶음(범위 밖이면 기본), 꺼지면 기본 파라미터 */
export async function applyParameters(d: FeatureDeps): Promise<{ value: number; source: 'DEFAULT' | 'CALIBRATION' }> {
  if (!(await enabled(d, ADAS_00067_PARAM, () => adas00067ParamEnabled(d.client, { targetingKey: d.vin })))) return { value: PARAM_DEFAULT, source: 'DEFAULT' };
  const v = d.calibration.value(ADAS_00067_PARAM);
  if (typeof v !== 'number' || !Number.isFinite(v) || v < PARAM_RANGE.min || v > PARAM_RANGE.max) return { value: PARAM_DEFAULT, source: 'DEFAULT' };
  return { value: v, source: 'CALIBRATION' };
}
