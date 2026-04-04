// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00018 1.8.4 「레거시 원격 시동 Gen1」 — 3G 기반 구형 원격 시동 서비스로 통신망 종료에 따라 폐기
// 모든 분기는 flag-guards.ts의 함수로만 Flag를 읽는다. 오류·시간 초과는 꺼짐(기존 경로)으로 간다.
import { flagOn, guardAllows, type FeatureDeps } from '../../../../runtime/src/flag-client.ts';
import { BODY_00018_ENABLE, BODY_00018_DTC } from './flags.ts';
import { body00018EnableEnabled, body00018DtcEnabled } from './flag-guards.ts';

export const FEATURE = { featureId: 'FEAT-00018', version: '1.8.4', name: '레거시 원격 시동 Gen1', safetyRelated: false } as const;

/** 켜짐 판단 — QM Feature라 로컬 Guard는 보지 않는다 */
async function enabled(d: FeatureDeps, flagKey: string, read: () => Promise<boolean>): Promise<boolean> {
  if (!(await flagOn(read, d.timeoutMs))) return false;
  return true;
}

/** Flag 제어점(body_00018_enable) — 켜지면 새 기능 경로, 꺼지면 기존 경로 */
export async function runFeature(d: FeatureDeps): Promise<{ path: 'NEW' | 'LEGACY'; flagKey: string }> {
  const on = await enabled(d, BODY_00018_ENABLE, () => body00018EnableEnabled(d.client, { targetingKey: d.vin }));
  return { path: on ? 'NEW' : 'LEGACY', flagKey: BODY_00018_ENABLE };
}

export const DTC_CODE = 'P7446';
/** DTC 제어점(body_00018_dtc) — 켜지면 고장 코드를 보고하고, 꺼지면 내부 기록만 남긴다 */
export async function reportFault(d: FeatureDeps): Promise<'REPORTED' | 'LOGGED'> {
  if (await enabled(d, BODY_00018_DTC, () => body00018DtcEnabled(d.client, { targetingKey: d.vin }))) {
    d.dtc.report(DTC_CODE);
    return 'REPORTED';
  }
  d.dtc.log(DTC_CODE);
  return 'LOGGED';
}
