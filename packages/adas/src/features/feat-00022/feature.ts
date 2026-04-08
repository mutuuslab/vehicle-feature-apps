// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00022 1.0.0 「전방 안전거리 3단계」 — 전방 차량과의 거리를 정상·주의·위험 3단계로 판정하고 운전자에게 안내하며 필요 시 속도를 조절
// 모든 분기는 flag-guards.ts의 함수로만 Flag를 읽는다. 오류·시간 초과는 꺼짐(기존 경로)으로 간다.
import { flagOn, guardAllows, type FeatureDeps } from '../../../../runtime/src/flag-client.ts';
import { CARE_00022_SIGNAL, CARE_00022_PARAM } from './flags.ts';
import { care00022SignalEnabled, care00022ParamEnabled } from './flag-guards.ts';

export const FEATURE = { featureId: 'FEAT-00022', version: '1.0.0', name: '전방 안전거리 3단계', safetyRelated: true } as const;

/** 켜짐 판단 — 안전 관련 Feature(F2 이상)라 차량 로컬 Guard도 허용해야 켠다 */
async function enabled(d: FeatureDeps, flagKey: string, read: () => Promise<boolean>): Promise<boolean> {
  if (!(await flagOn(read, d.timeoutMs))) return false;
  return guardAllows(d.localGuard, flagKey, d.vin);
}

export const SIGNAL = 'feat-00022.care_00022_signal';
/** Signal 제어점(care_00022_signal) — 켜졌을 때만 신호를 발행한다 */
export async function emitSignal(d: FeatureDeps, value: string): Promise<boolean> {
  const on = await enabled(d, CARE_00022_SIGNAL, () => care00022SignalEnabled(d.client, { targetingKey: d.vin }));
  if (on) d.signals.publish(SIGNAL, value);
  return on;
}

export const PARAM_DEFAULT = 16;
export const PARAM_RANGE = { min: 8, max: 48 } as const;
/** Parameter 제어점(care_00022_param) — 켜지면 보정값의 새 파라미터 묶음(범위 밖이면 기본), 꺼지면 기본 파라미터 */
export async function applyParameters(d: FeatureDeps): Promise<{ value: number; source: 'DEFAULT' | 'CALIBRATION' }> {
  if (!(await enabled(d, CARE_00022_PARAM, () => care00022ParamEnabled(d.client, { targetingKey: d.vin })))) return { value: PARAM_DEFAULT, source: 'DEFAULT' };
  const v = d.calibration.value(CARE_00022_PARAM);
  if (typeof v !== 'number' || !Number.isFinite(v) || v < PARAM_RANGE.min || v > PARAM_RANGE.max) return { value: PARAM_DEFAULT, source: 'DEFAULT' };
  return { value: v, source: 'CALIBRATION' };
}
