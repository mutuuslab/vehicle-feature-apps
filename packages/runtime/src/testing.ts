// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// 기능 시험 도구 — 가짜 Flag 클라이언트, 신호·고장 코드 기록기. 실제 Flag 키는 시험 파일이 상수로 넘긴다.
import type { Calibration, DtcSink, FeatureDeps, FlagClient, LocalGuard, SignalBus } from './flag-client.ts';

export const TEST_VIN = 'KMHTEST0000000001';

/** 주어진 키만 켜진 클라이언트 */
export function fakeClient(on: readonly string[] = []): FlagClient {
  const set = new Set(on);
  return { getBooleanValue: async (flagKey: string) => set.has(flagKey) };
}
/** 늘 오류를 내는 클라이언트(연결 실패) */
export const failingClient: FlagClient = {
  getBooleanValue: async () => {
    throw new Error('연결 실패');
  },
};
/** 응답하지 않는 클라이언트(시간 초과) */
export const hangingClient: FlagClient = { getBooleanValue: () => new Promise<boolean>(() => undefined) };

export const allowAll: LocalGuard = { allows: () => true };
export const denyAll: LocalGuard = { allows: () => false };

export interface Recorded {
  signals: { signal: string; value: string }[];
  reported: string[];
  logged: string[];
}

/** 시험용 차량 의존성 — 신호·고장 코드를 기록한다 */
export function testDeps(client: FlagClient, opts: { guard?: LocalGuard; calibration?: Record<string, number>; timeoutMs?: number } = {}): FeatureDeps & { recorded: Recorded } {
  const recorded: Recorded = { signals: [], reported: [], logged: [] };
  const signals: SignalBus = { publish: (signal, value) => void recorded.signals.push({ signal, value }) };
  const dtc: DtcSink = { report: (code) => void recorded.reported.push(code), log: (code) => void recorded.logged.push(code) };
  const values = opts.calibration ?? {};
  const calibration: Calibration = { value: (flagKey) => values[flagKey] };
  return { client, vin: TEST_VIN, localGuard: opts.guard ?? allowAll, signals, dtc, calibration, timeoutMs: opts.timeoutMs ?? 20, recorded };
}
