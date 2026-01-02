// 시연용 생성 코드 — 고객 차량 SW가 아닙니다. Feature Platform 등록 데이터로 만든 예시 구현입니다.
// Flag 클라이언트 경계 — 기능 코드는 FF가 만든 flag-guards.ts로만 Flag를 읽고, 여기의 flagOn으로 오류·시간 초과를 꺼짐으로 돌린다.

/** 평가 대상 — targetingKey는 VIN */
export interface FlagContext {
  targetingKey: string;
}

/** OpenFeature 형태의 최소 클라이언트 — 기본값은 늘 false(꺼짐)로 넘긴다 */
export interface FlagClient {
  getBooleanValue(flagKey: string, defaultValue: false, context: FlagContext): Promise<boolean>;
}

/** 차량 로컬 Guard — 운전 상태·고장 상태에서 켜면 안 되는 Flag를 막는다(서버 값과 무관) */
export interface LocalGuard {
  allows(flagKey: string, vin: string): boolean;
}

/** 서명 스냅샷 검증 연결점 — 차량 클라이언트가 FF 게시본 서명을 검증한 뒤 값을 읽는다 */
export interface SignedSnapshotSource {
  verifiedAt(): string | null;
  revision(): number | null;
}

/** 신호 출력(차량 네트워크) */
export interface SignalBus {
  publish(signal: string, value: string): void;
}

/** 고장 코드 — report는 외부 보고, log는 내부 기록만 */
export interface DtcSink {
  report(code: string): void;
  log(code: string): void;
}

/** 보정(calibration) 값 저장소 — 파라미터 묶음의 새 값 */
export interface Calibration {
  value(flagKey: string): number | undefined;
}

/** 기능 코드가 받는 차량 의존성 */
export interface FeatureDeps {
  client: FlagClient;
  vin: string;
  localGuard: LocalGuard;
  signals: SignalBus;
  dtc: DtcSink;
  calibration: Calibration;
  /** Flag 읽기 제한 시간(ms) — 넘으면 꺼짐 */
  timeoutMs: number;
}

export const FLAG_TIMEOUT_MS = 50;

/** Flag 읽기 결과 — 오류·시간 초과·true가 아닌 값은 모두 꺼짐 */
export async function flagOn(read: () => Promise<boolean>, timeoutMs: number = FLAG_TIMEOUT_MS): Promise<boolean> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const late = new Promise<boolean>((resolve) => {
      timer = setTimeout(() => resolve(false), timeoutMs);
    });
    return (await Promise.race([read(), late])) === true;
  } catch {
    return false;
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}

/** 로컬 Guard 확인 — Guard 오류도 막힘으로 본다 */
export function guardAllows(guard: LocalGuard, flagKey: string, vin: string): boolean {
  try {
    return guard.allows(flagKey, vin) === true;
  } catch {
    return false;
  }
}
