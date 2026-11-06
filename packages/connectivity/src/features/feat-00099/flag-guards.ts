// FF가 만든 호출 뼈대 — 기본값 OFF(false). 기능 코드는 이 함수로만 Flag를 읽는다.
import type { FlagClient, FlagContext } from '../../../../runtime/src/flag-client.ts';
import { CONNECTIVITY_00099_ENABLE, CONNECTIVITY_00099_DTC } from './flags.ts';

/** Flag 제어점 — 기능 사용 허용 */
export function connectivity00099EnableEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(CONNECTIVITY_00099_ENABLE, false, ctx);
}

/** DTC 제어점 — 고장 코드 보고 허용 */
export function connectivity00099DtcEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(CONNECTIVITY_00099_DTC, false, ctx);
}
