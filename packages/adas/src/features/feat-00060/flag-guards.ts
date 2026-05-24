// FF가 만든 호출 뼈대 — 기본값 OFF(false). 기능 코드는 이 함수로만 Flag를 읽는다.
import type { FlagClient, FlagContext } from '../../../../runtime/src/flag-client.ts';
import { ADAS_00060_ENABLE, ADAS_00060_PARAM } from './flags.ts';

/** Flag 제어점 — 기능 사용 허용 */
export function adas00060EnableEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(ADAS_00060_ENABLE, false, ctx);
}

/** Parameter 제어점 — 조정 파라미터 사용(꺼지면 기본 파라미터) */
export function adas00060ParamEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(ADAS_00060_PARAM, false, ctx);
}
