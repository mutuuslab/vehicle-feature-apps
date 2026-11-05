// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00001 2.2.0 「원격 스마트 주차 보조」 — 차량 외부에서 전·후진 주차를 제어하고, 원격 조작 입력 해제 시 차량 정지 조건을 명시
// 모든 분기는 flag-guards.ts의 함수로만 Flag를 읽는다. 오류·시간 초과는 꺼짐(기존 경로)으로 간다.
import { flagOn, guardAllows, type FeatureDeps } from '../../../../runtime/src/flag-client.ts';
import { ADAS_00001_RSPA, ADAS_00001_PARAM, ADAS_00001_SIGNAL } from './flags.ts';
import { adas00001RspaEnabled, adas00001ParamEnabled, adas00001SignalEnabled } from './flag-guards.ts';

export const FEATURE = { featureId: 'FEAT-00001', version: '2.2.0', name: '원격 스마트 주차 보조', safetyRelated: true } as const;

/** 켜짐 판단 — 안전 관련 Feature(F2 이상)라 차량 로컬 Guard도 허용해야 켠다 */
async function enabled(d: FeatureDeps, flagKey: string, read: () => Promise<boolean>): Promise<boolean> {
  if (!(await flagOn(read, d.timeoutMs))) return false;
  return guardAllows(d.localGuard, flagKey, d.vin);
}

/** Flag 제어점(adas_00001_rspa) — 켜지면 새 기능 경로, 꺼지면 기존 경로 */
export async function runFeature(d: FeatureDeps): Promise<{ path: 'NEW' | 'LEGACY'; flagKey: string }> {
  const on = await enabled(d, ADAS_00001_RSPA, () => adas00001RspaEnabled(d.client, { targetingKey: d.vin }));
  return { path: on ? 'NEW' : 'LEGACY', flagKey: ADAS_00001_RSPA };
}

export const PARAM_DEFAULT = 49;
export const PARAM_RANGE = { min: 24, max: 147 } as const;
/** Parameter 제어점(adas_00001_param) — 켜지면 보정값의 새 파라미터 묶음(범위 밖이면 기본), 꺼지면 기본 파라미터 */
export async function applyParameters(d: FeatureDeps): Promise<{ value: number; source: 'DEFAULT' | 'CALIBRATION' }> {
  if (!(await enabled(d, ADAS_00001_PARAM, () => adas00001ParamEnabled(d.client, { targetingKey: d.vin })))) return { value: PARAM_DEFAULT, source: 'DEFAULT' };
  const v = d.calibration.value(ADAS_00001_PARAM);
  if (typeof v !== 'number' || !Number.isFinite(v) || v < PARAM_RANGE.min || v > PARAM_RANGE.max) return { value: PARAM_DEFAULT, source: 'DEFAULT' };
  return { value: v, source: 'CALIBRATION' };
}

export const SIGNAL = 'feat-00001.adas_00001_signal';
/** Signal 제어점(adas_00001_signal) — 켜졌을 때만 신호를 발행한다 */
export async function emitSignal(d: FeatureDeps, value: string): Promise<boolean> {
  const on = await enabled(d, ADAS_00001_SIGNAL, () => adas00001SignalEnabled(d.client, { targetingKey: d.vin }));
  if (on) d.signals.publish(SIGNAL, value);
  return on;
}
