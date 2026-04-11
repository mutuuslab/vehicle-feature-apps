// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00025 1.0.0 「전방 안전거리 확대」 — 전방 차량과의 목표 차간거리를 기존보다 크게 설정하고 주행 중 해당 거리를 유지하도록 속도를 조절
// 모든 분기는 flag-guards.ts의 함수로만 Flag를 읽는다. 오류·시간 초과는 꺼짐(기존 경로)으로 간다.
import { flagOn, guardAllows, type FeatureDeps } from '../../../../runtime/src/flag-client.ts';
import { ADAS_00025_SIGNAL, ADAS_00025_PARAM } from './flags.ts';
import { adas00025SignalEnabled, adas00025ParamEnabled } from './flag-guards.ts';

export const FEATURE = { featureId: 'FEAT-00025', version: '1.0.0', name: '전방 안전거리 확대', safetyRelated: true } as const;

/** 켜짐 판단 — 안전 관련 Feature(F2 이상)라 차량 로컬 Guard도 허용해야 켠다 */
async function enabled(d: FeatureDeps, flagKey: string, read: () => Promise<boolean>): Promise<boolean> {
  if (!(await flagOn(read, d.timeoutMs))) return false;
  return guardAllows(d.localGuard, flagKey, d.vin);
}

export const SIGNAL = 'feat-00025.adas_00025_signal';
/** Signal 제어점(adas_00025_signal) — 켜졌을 때만 신호를 발행한다 */
export async function emitSignal(d: FeatureDeps, value: string): Promise<boolean> {
  const on = await enabled(d, ADAS_00025_SIGNAL, () => adas00025SignalEnabled(d.client, { targetingKey: d.vin }));
  if (on) d.signals.publish(SIGNAL, value);
  return on;
}

export const PARAM_DEFAULT = 11;
export const PARAM_RANGE = { min: 5, max: 33 } as const;
/** Parameter 제어점(adas_00025_param) — 켜지면 보정값의 새 파라미터 묶음(범위 밖이면 기본), 꺼지면 기본 파라미터 */
export async function applyParameters(d: FeatureDeps): Promise<{ value: number; source: 'DEFAULT' | 'CALIBRATION' }> {
  if (!(await enabled(d, ADAS_00025_PARAM, () => adas00025ParamEnabled(d.client, { targetingKey: d.vin })))) return { value: PARAM_DEFAULT, source: 'DEFAULT' };
  const v = d.calibration.value(ADAS_00025_PARAM);
  if (typeof v !== 'number' || !Number.isFinite(v) || v < PARAM_RANGE.min || v > PARAM_RANGE.max) return { value: PARAM_DEFAULT, source: 'DEFAULT' };
  return { value: v, source: 'CALIBRATION' };
}
