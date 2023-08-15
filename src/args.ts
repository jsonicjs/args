/* Copyright (c) 2021-2023 Richard Rodger, MIT License */

// Import Jsonic types used by plugins.
import {
  Jsonic,
  Rule,
  RuleSpec,
  Plugin,
  Context,
  Config,
  Options,
  Lex,
  AltSpec,
} from '@jsonic/jsonic-next'

// See defaults below for commentary.
type ArgsOptions = {
}

// Plugin implementation.
const Args: Plugin = (jsonic: Jsonic, options: ArgsOptions) => {
}

// Default option values.
Args.defaults = {
} as ArgsOptions

export { Args }

export type { ArgsOptions }
