// FF가 만든 호출 뼈대 — 기본값 OFF(false). 기능 코드는 이 함수로만 Flag를 읽는다.
import type { FlagClient, FlagContext } from '../../../../runtime/src/flag-client.ts';
import { CONNECTIVITY_00011_DTC } from './flags.ts';

/** DTC 제어점 — 고장 코드 보고 허용 */
export function connectivity00011DtcEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(CONNECTIVITY_00011_DTC, false, ctx);
}
