// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00144 3.3.0 「서라운드 뷰 모니터」 — 차량 주변 360도 영상을 운전자에게 제공하고, 저속 주차 중 화면 전환 조건을 명시
// 모든 분기는 flag-guards.ts의 함수로만 Flag를 읽는다. 오류·시간 초과는 꺼짐(기존 경로)으로 간다.
import { flagOn, guardAllows, type FeatureDeps } from '../../../../runtime/src/flag-client.ts';
import { BODY_00144_SVM } from './flags.ts';
import { body00144SvmEnabled } from './flag-guards.ts';

export const FEATURE = { featureId: 'FEAT-00144', version: '3.3.0', name: '서라운드 뷰 모니터', safetyRelated: false } as const;

/** 켜짐 판단 — QM Feature라 로컬 Guard는 보지 않는다 */
async function enabled(d: FeatureDeps, flagKey: string, read: () => Promise<boolean>): Promise<boolean> {
  if (!(await flagOn(read, d.timeoutMs))) return false;
  return true;
}

/** Flag 제어점(body_00144_svm) — 켜지면 새 기능 경로, 꺼지면 기존 경로 */
export async function runFeature(d: FeatureDeps): Promise<{ path: 'NEW' | 'LEGACY'; flagKey: string }> {
  const on = await enabled(d, BODY_00144_SVM, () => body00144SvmEnabled(d.client, { targetingKey: d.vin }));
  return { path: on ? 'NEW' : 'LEGACY', flagKey: BODY_00144_SVM };
}
