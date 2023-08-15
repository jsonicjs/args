import { Plugin } from '@jsonic/jsonic-next';
type ArgsOptions = {
    command: CommandSpec[];
};
type CommandSpec = {
    pattern: Record<string, any>;
};
declare const Args: Plugin;
export { Args };
export type { ArgsOptions };
