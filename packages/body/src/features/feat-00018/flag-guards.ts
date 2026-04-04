// FF가 만든 호출 뼈대 — 기본값 OFF(false). 기능 코드는 이 함수로만 Flag를 읽는다.
import type { FlagClient, FlagContext } from '../../../../runtime/src/flag-client.ts';
import { BODY_00018_ENABLE, BODY_00018_DTC } from './flags.ts';

/** Flag 제어점 — 기능 사용 허용 */
export function body00018EnableEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(BODY_00018_ENABLE, false, ctx);
}

/** DTC 제어점 — 고장 코드 보고 허용 */
export function body00018DtcEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(BODY_00018_DTC, false, ctx);
}
