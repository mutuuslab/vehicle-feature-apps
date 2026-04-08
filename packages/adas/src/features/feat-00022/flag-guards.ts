// FF가 만든 호출 뼈대 — 기본값 OFF(false). 기능 코드는 이 함수로만 Flag를 읽는다.
import type { FlagClient, FlagContext } from '../../../../runtime/src/flag-client.ts';
import { CARE_00022_SIGNAL, CARE_00022_PARAM } from './flags.ts';

/** Signal 제어점 — 신호 출력 허용 */
export function care00022SignalEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(CARE_00022_SIGNAL, false, ctx);
}

/** Parameter 제어점 — 조정 파라미터 사용(꺼지면 기본 파라미터) */
export function care00022ParamEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(CARE_00022_PARAM, false, ctx);
}
