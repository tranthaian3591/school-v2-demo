import { SafeAny } from './safe';

export type OnTouchedType = () => SafeAny;
export type OnChangeType = (_: SafeAny) => void;
