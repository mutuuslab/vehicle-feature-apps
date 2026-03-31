// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00011 1.3.0 「스마트폰 디지털 키」 — UWB·BLE 기반 스마트폰 인증으로 도어 및 시동 제어
// 모든 분기는 flag-guards.ts의 함수로만 Flag를 읽는다. 오류·시간 초과는 꺼짐(기존 경로)으로 간다.
import { flagOn, guardAllows, type FeatureDeps } from '../../../../runtime/src/flag-client.ts';
import { CONNECTIVITY_00011_DTC } from './flags.ts';
import { connectivity00011DtcEnabled } from './flag-guards.ts';

export const FEATURE = { featureId: 'FEAT-00011', version: '1.3.0', name: '스마트폰 디지털 키', safetyRelated: false } as const;

/** 켜짐 판단 — QM Feature라 로컬 Guard는 보지 않는다 */
async function enabled(d: FeatureDeps, flagKey: string, read: () => Promise<boolean>): Promise<boolean> {
  if (!(await flagOn(read, d.timeoutMs))) return false;
  return true;
}

export const DTC_CODE = 'C9691';
/** DTC 제어점(connectivity_00011_dtc) — 켜지면 고장 코드를 보고하고, 꺼지면 내부 기록만 남긴다 */
export async function reportFault(d: FeatureDeps): Promise<'REPORTED' | 'LOGGED'> {
  if (await enabled(d, CONNECTIVITY_00011_DTC, () => connectivity00011DtcEnabled(d.client, { targetingKey: d.vin }))) {
    d.dtc.report(DTC_CODE);
    return 'REPORTED';
  }
  d.dtc.log(DTC_CODE);
  return 'LOGGED';
}
