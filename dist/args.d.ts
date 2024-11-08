import { Plugin } from 'jsonic';
type ArgsOptions = {
    command: CommandSpec[];
};
type CommandSpec = {
    pattern: Record<string, any>;
};
declare const Args: Plugin;
export { Args };
export type { ArgsOptions };
