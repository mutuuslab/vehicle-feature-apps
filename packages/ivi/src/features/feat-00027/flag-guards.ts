// FF가 만든 호출 뼈대 — 기본값 OFF(false). 기능 코드는 이 함수로만 Flag를 읽는다.
import type { FlagClient, FlagContext } from '../../../../runtime/src/flag-client.ts';
import { IVI_00027_DETAIL, IVI_00027_BANNER, IVI_00027_VOICE } from './flags.ts';

/** Flag 제어점 — 기능 사용 허용 */
export function ivi00027DetailEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(IVI_00027_DETAIL, false, ctx);
}

/** Signal 제어점 — 신호 출력 허용 */
export function ivi00027BannerEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(IVI_00027_BANNER, false, ctx);
}

/** Flag 제어점 — 기능 사용 허용 */
export function ivi00027VoiceEnabled(client: FlagClient, ctx: FlagContext): Promise<boolean> {
  return client.getBooleanValue(IVI_00027_VOICE, false, ctx);
}
