// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// FEAT-00183 비교 실험 스위치 — 구현 담당이 추가했다.
import type { FlagClient } from '../../../../runtime/src/flag-client.ts';

/** 실험 켜짐 여부 — 오류는 꺼짐 */
export async function experimentEnabled(client: FlagClient, vin: string): Promise<boolean> {
  try {
    return (await client.getBooleanValue('adas_00183_experiment', false, { targetingKey: vin })) === true;
  } catch {
    return false;
  }
}
