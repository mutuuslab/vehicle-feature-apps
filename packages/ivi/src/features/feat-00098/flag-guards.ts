// FF가 만든 호출 뼈대 — 기본값 OFF(false). 기능 코드는 이 함수로만 Flag를 읽는다.
import type { FlagClient, FlagContext } from '../../../../runtime/src/flag-client.ts';
import { IVI_00098_ENABLE, IVI_00098_SIGNAL } from './flags.ts';

/** Flag 제어점 — 기능 사용 허용 */
export function ivi00098EnableEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(IVI_00098_ENABLE, false, ctx);
}

/** Signal 제어점 — 신호 출력 허용 */
export function ivi00098SignalEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(IVI_00098_SIGNAL, false, ctx);
}
