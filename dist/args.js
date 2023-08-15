"use strict";
/* Copyright (c) 2021-2023 Richard Rodger, MIT License */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Args = void 0;
const patrun_1 = require("patrun");
const gubu_1 = require("gubu");
// Plugin implementation.
const Args = (jsonic, options) => {
    const actr = (0, patrun_1.Patrun)();
    for (let cmd of options.command) {
        let pat = {};
        let patdef = cmd.pattern;
        let patprops = Object.keys(patdef);
        let valid = {};
        for (let pI = 0; pI < patprops.length; pI++) {
            let pn = patprops[pI];
            let pt = typeof patdef[pn];
            if ('object' === pt) {
                valid[pI] = (0, gubu_1.Gubu)(patdef[pn]);
            }
            else {
                pat[pI] = pn;
            }
        }
        actr.add(pat, { cmd, valid });
    }
    console.log(actr + '');
    jsonic.options({
        rule: {
            start: 'list'
        },
        tokenSet: {
            IGNORE: [null, null, null],
        }
    });
    const { SP, ZZ } = jsonic.token;
    jsonic
        .rule('list', (rs) => {
        rs
            .close([
            {
                s: [ZZ],
                c: (r) => r.d === 0,
                a: operate
            }
        ]);
    });
    jsonic
        .rule('elem', (rs) => {
        rs
            .open([], {
            delete: [
                2 // Array props not supported since conflict with map arg.
            ]
        })
            .close([
            {
                s: [SP],
                c: (r) => 1 === r.d,
                r: 'elem'
            }
        ]);
    });
    jsonic
        .rule('pair', (rs) => {
        rs
            .close([
            {
                s: [SP], b: 1
            }
        ]);
    });
    jsonic
        .rule('map', (rs) => {
        rs
            .close([
            {
                s: [SP], b: 1
            }
        ]);
    });
    function operate(_r, ctx) {
        let args = ctx.root().node;
        console.log('ARGS', args);
        let pat = {};
        let argm = {};
        for (let aI = 0; aI < args.length; aI++) {
            let v = args[aI];
            let vt = typeof v;
            if ('object' !== vt) {
                pat[aI] = v;
                argm[v] = true;
            }
        }
        console.log('PAT', pat);
        let cmdspec = actr.find(pat);
        console.log('CMDPSEC', cmdspec);
        let pnames = Object.keys(cmdspec.cmd.pattern);
        let valid = cmdspec.valid;
        let vpos = Object.keys(valid);
        console.log('VALID', pnames, vpos, valid);
        for (let dI = 0; dI < vpos.length; dI++) {
            let pI = vpos[dI];
            let shape = valid[pI];
            let pn = pnames[pI];
            argm[pn] = shape(args[pI]);
        }
        if (cmdspec) {
            cmdspec.cmd.action(argm, args);
        }
    }
};
exports.Args = Args;
// Default option values.
Args.defaults = {
    command: []
};
//# sourceMappingURL=args.js.map