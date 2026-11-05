// FF가 만든 Flag 상수 — FEAT-00145 5.5.0 「스마트 크루즈 컨트롤」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00145_SCC = 'adas_00145_scc' as const;
export const ADAS_00145_SIGNAL = 'adas_00145_signal' as const;
export const FEAT_00145_FLAGS = [ADAS_00145_SCC, ADAS_00145_SIGNAL] as const;
