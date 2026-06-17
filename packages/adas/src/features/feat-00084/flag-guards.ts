// FF가 만든 호출 뼈대 — 기본값 OFF(false). 기능 코드는 이 함수로만 Flag를 읽는다.
import type { FlagClient, FlagContext } from '../../../../runtime/src/flag-client.ts';
import { ADAS_00084_ENABLE, ADAS_00084_SIGNAL } from './flags.ts';

/** Flag 제어점 — 기능 사용 허용 */
export function adas00084EnableEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(ADAS_00084_ENABLE, false, ctx);
}

/** Signal 제어점 — 신호 출력 허용 */
export function adas00084SignalEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(ADAS_00084_SIGNAL, false, ctx);
}
