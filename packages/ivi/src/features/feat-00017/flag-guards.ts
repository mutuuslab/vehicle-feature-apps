// FF가 만든 호출 뼈대 — 기본값 OFF(false). 기능 코드는 이 함수로만 Flag를 읽는다.
import type { FlagClient, FlagContext } from '../../../../runtime/src/flag-client.ts';
import { IVI_00017_ENABLE, IVI_00017_ENABLE_2 } from './flags.ts';

/** Flag 제어점 — 기능 사용 허용 */
export function ivi00017EnableEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(IVI_00017_ENABLE, false, ctx);
}

/** Flag 제어점 — 기능 사용 허용 */
export function ivi00017Enable2Enabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(IVI_00017_ENABLE_2, false, ctx);
}
