// FF가 만든 Flag 상수 — FEAT-00082 1.8.4 「레거시 원격 시동 Gen1」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const BODY_00082_ENABLE = 'body_00082_enable' as const;
export const BODY_00082_DTC = 'body_00082_dtc' as const;
export const FEAT_00082_FLAGS = [BODY_00082_ENABLE, BODY_00082_DTC] as const;
