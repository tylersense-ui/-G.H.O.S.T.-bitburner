/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║  ██████╗ ██╗  ██╗ ██████╗ ███████╗████████╗             ║
 * ║ ██╔════╝ ██║  ██║██╔═══██╗██╔════╝╚══██╔══╝             ║
 * ║ ██║  ███╗███████║██║   ██║███████╗   ██║                ║
 * ║ ██║   ██║██╔══██║██║   ██║╚════██║   ██║                ║
 * ║ ╚██████╔╝██║  ██║╚██████╔╝███████║   ██║                ║
 * ║  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝                ║
 * ║                                                           ║
 * ║  Godlike Heuristic Operator & Strategy Toolkit           ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /boot.js
 * @version     0.3.3.4
 * @author      Claude (Godlike AI Operator)
 * @description Point d'entrée G.H.O.S.T. Framework
 *              ULTRA-SIMPLE: Auto-Spider + Server-Manager + EXIT
 *              Telemetry & BlackBox: launch manual
 * 
 * @usage
 *   run /boot.js
 *   run /boot.js --debug 2
 * 
 * @commands
 *   --debug <0-3>   Niveau de verbosité (défaut: 1)
 * 
 * @architecture_v0.3.3.4
 *   Boot.js (minimal RAM - EXIT rapide!):
 *     STEP 1: Launch Auto-Spider daemon  ← FAIT TOUT!
 *     STEP 2: Launch Server Manager daemon
 *     STEP 3: EXIT (libère boot.js RAM!)
 *   
 *   Auto-Spider cycle 1 (avec ~7GB libres!):
 *     - Spider (2.35GB) ✅
 *     - Target-selector (5.70GB) ✅ RAM suffisante!
 *     - Deploy-workers (5.60GB) ✅
 *     - Quantum sync...
 * 
 * @manual_launch
 *   Telemetry (5.75GB): run tools/telemetry.js
 *   BlackBox (22.5GB): run tools/blackbox.js
 * 
 * @innovation_v0.3.3.4
 *   - Boot ULTRA-SIMPLE: 2 daemons + exit
 *   - Telemetry skipped (manual launch)
 *   - BlackBox skipped (manual launch)
 *   - Auto-spider has ~7GB free for cycle 1
 *   - Résout définitivement problème RAM 8GB
 * 
 * @changelog
 *   v0.3.3.4 - 2026-03-14 - ULTRA-SIMPLE BOOT
 *            - Telemetry removed (5.75GB saved!)
 *            - BlackBox removed (22.5GB saved!)
 *            - Boot = auto-spider + server-manager only
 *            - ~7GB free pour auto-spider cycle 1
 *            - Manual launch: telemetry + blackbox
 *   v0.3.3.3 - 2026-03-14 - ULTRA-MINIMAL BOOT
 *   v0.3.3.2 - 2026-03-14 - EARLY GAME FIX
 *   v0.3.3.1 - 2026-03-14 - HOTFIX: ns.run → ns.exec
 *   v0.3.3 - 2026-03-14 - QUANTUM SYNC EDITION
 *   v0.2.0 - 2026-03-13 - G.H.O.S.T. Trinity Matrix
 *   v0.1.0 - 2026-03-08 - Initial NEXUS → G.H.O.S.T. migration
 */

import { Debug, parseDebugLevel } from "/lib/debug.js";

const DEFAULT_DEBUG = 1;

/** @param {NS} ns */
export async function main(ns) {
    // ═══════════════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════════════
    const debugLevel = parseDebugLevel(ns.args, DEFAULT_DEBUG);
    const debug = new Debug(ns, debugLevel);
    
    ns.ui.openTail();
    debug.clear();
    
    // ═══════════════════════════════════════════════════════════════════
    // HEADER
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║  ██████╗ ██╗  ██╗ ██████╗ ███████╗████████╗          ║");
    debug.normal("║ ██╔════╝ ██║  ██║██╔═══██╗██╔════╝╚══██╔══╝          ║");
    debug.normal("║ ██║  ███╗███████║██║   ██║███████╗   ██║             ║");
    debug.normal("║ ██║   ██║██╔══██║██║   ██║╚════██║   ██║             ║");
    debug.normal("║ ╚██████╔╝██║  ██║╚██████╔╝███████║   ██║             ║");
    debug.normal("║  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝             ║");
    debug.normal("║                                                        ║");
    debug.normal("║  Godlike Heuristic Operator & Strategy Toolkit        ║");
    debug.normal("║  v0.3.3.4 - ULTRA-SIMPLE (8GB optimized)              ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    debug.normal("🚀 Boot: ULTRA-SIMPLE (2 daemons + exit)");
    debug.normal("⚡ Auto-Spider: Does spider + target + deploy");
    debug.normal("🎯 Manual: Telemetry + BlackBox (optional)");
    debug.normal("");
    
    await ns.sleep(500);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 1: AUTO-SPIDER DAEMON (FAIT TOUT!)
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("STEP 1/2: Auto-Spider daemon (quantum sync)...");
    debug.verbose("   Cycle 1: spider + target + deploy");
    debug.verbose("   Cycles 2+: quantum sync (instant reactivity)");
    
    const autoSpiderArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    const autoSpiderPid = ns.exec("/core/auto-spider.js", "home", 1, ...autoSpiderArgs);
    
    if (autoSpiderPid > 0) {
        debug.normal("   ✅ Auto-Spider launched (PID: " + autoSpiderPid + ")");
        debug.toastSuccess("🕷️ Quantum Spider online");
    } else {
        debug.verbose("   ⚠️  Auto-Spider already running");
    }
    
    await ns.sleep(300);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 2: SERVER MANAGER DAEMON
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("STEP 2/2: Server Manager daemon...");
    
    const serverMgrArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    const serverMgrPid = ns.exec("/managers/server-manager.js", "home", 1, ...serverMgrArgs);
    
    if (serverMgrPid > 0) {
        debug.normal("   ✅ Server Manager launched (PID: " + serverMgrPid + ")");
        debug.toastSuccess("💻 Matrix Manager online");
    } else {
        debug.verbose("   ⚠️  Server Manager already running");
    }
    
    await ns.sleep(300);
    
    // ═══════════════════════════════════════════════════════════════════
    // BOOT COMPLETE - EXIT IMMÉDIATEMENT!
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("");
    debug.separator();
    debug.normal("🎉 G.H.O.S.T. v0.3.3.4 - ULTRA-SIMPLE - BOOT COMPLETE!");
    debug.normal("");
    debug.normal("🕷️  Auto-Spider : Cycle 1 starting now...");
    debug.normal("   → Spider (root network)");
    debug.normal("   → Target-selector (find best target)");
    debug.normal("   → Deploy-workers (launch workers)");
    debug.normal("   → Quantum sync (zero downtime)");
    debug.normal("");
    debug.normal("💻 Server Manager : Purchasing/upgrading Matrix servers");
    debug.normal("");
    debug.normal("📋 MANUAL LAUNCH (optional):");
    debug.normal("   Telemetry : run tools/telemetry.js");
    debug.normal("   BlackBox  : run tools/blackbox.js");
    debug.normal("");
    debug.normal("⚡ Boot.js exiting → freeing RAM for Auto-Spider!");
    debug.normal("📊 Auto-Spider will have ~7GB free for cycle 1");
    debug.separator();
    debug.normal("");
    debug.normal("💰 Framework optimized for home 8GB");
    debug.normal("🚀 Tail /core/auto-spider.js to watch cycle 1!");
    
    debug.toastSuccess("🎉 G.H.O.S.T. v0.3.3.4 online!");
    
    await ns.sleep(1000);
    
    // EXIT → libère boot.js RAM!
}
