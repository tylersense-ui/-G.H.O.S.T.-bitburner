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
 * @version     0.3.3.3
 * @author      Claude (Godlike AI Operator)
 * @description Point d'entrée G.H.O.S.T. Framework
 *              ULTRA-MINIMAL: Lance daemons puis EXIT!
 *              Auto-Spider fait TOUT (spider + target + deploy)
 * 
 * @usage
 *   run /boot.js
 *   run /boot.js --debug 2
 * 
 * @commands
 *   --debug <0-3>   Niveau de verbosité (défaut: 1)
 * 
 * @architecture_v0.3.3.3
 *   Boot.js (4.40GB - mais EXIT rapide!):
 *     STEP 1: Launch Telemetry daemon
 *     STEP 2: Launch Auto-Spider daemon  ← FAIT TOUT!
 *     STEP 3: Launch Server Manager daemon
 *     STEP 4: Launch BlackBox (si RAM)
 *     STEP 5: EXIT (libère 4.40GB!)
 *   
 *   Auto-Spider cycle 1 (avec 6.5GB libres!):
 *     - Spider (2.35GB) ✅
 *     - Target-selector (5.70GB) ✅ RAM suffisante!
 *     - Deploy-workers (5.60GB) ✅
 *     - Quantum sync...
 * 
 * @innovation_v0.3.3.3
 *   - Boot EXIT rapide → libère 4.40GB
 *   - Auto-Spider a toute la RAM pour cycle 1
 *   - Plus de problème RAM au boot!
 *   - Architecture daemon propre
 * 
 * @changelog
 *   v0.3.3.3 - 2026-03-14 - ULTRA-MINIMAL BOOT
 *            - Boot lance UNIQUEMENT daemons (pas de wait!)
 *            - EXIT immédiat après launch (libère 4.40GB)
 *            - Auto-spider fait spider + target + deploy
 *            - Résout définitivement problème RAM 8GB
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
    debug.normal("║  v0.3.3.3 - ULTRA-MINIMAL BOOT                        ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    debug.normal("🚀 Boot: ULTRA-MINIMAL (exit rapide = RAM freed!)");
    debug.normal("⚡ Auto-Spider: Does EVERYTHING in cycle 1");
    debug.normal("🎯 Architecture: Daemon-only, ultra-efficient");
    debug.normal("");
    
    await ns.sleep(500);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 1: TELEMETRY DAEMON
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("STEP 1/4: Telemetry daemon...");
    
    const telemetryArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    const telemetryPid = ns.exec("/tools/telemetry.js", "home", 1, ...telemetryArgs);
    
    if (telemetryPid > 0) {
        debug.normal("   ✅ Telemetry launched (PID: " + telemetryPid + ")");
    } else {
        debug.verbose("   ⚠️  Telemetry already running");
    }
    
    await ns.sleep(300);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 2: AUTO-SPIDER DAEMON (FAIT TOUT!)
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("STEP 2/4: Auto-Spider daemon (quantum sync)...");
    debug.verbose("   (Cycle 1 will: spider + target-selector + deploy)");
    
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
    // STEP 3: SERVER MANAGER DAEMON
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("STEP 3/4: Server Manager daemon...");
    
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
    // STEP 4: BLACKBOX (OPTIONAL)
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("STEP 4/4: BlackBox (optional)...");
    
    const homeMaxRam = ns.getServerMaxRam("home");
    const homeUsedRam = ns.getServerUsedRam("home");
    const homeAvailRam = homeMaxRam - homeUsedRam;
    
    const blackboxRam = 22.5;
    
    if (homeAvailRam >= blackboxRam) {
        const blackboxArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
        const blackboxPid = ns.exec("/tools/blackbox.js", "home", 1, ...blackboxArgs);
        
        if (blackboxPid > 0) {
            debug.normal("   ✅ BlackBox launched (PID: " + blackboxPid + ")");
            debug.toastInfo("🎲 BlackBox active");
        } else {
            debug.verbose("   ⚠️  BlackBox already running");
        }
    } else {
        debug.verbose("   ⚠️  Insufficient RAM (need " + blackboxRam + "GB)");
        debug.verbose("   Will launch after home RAM upgrade");
    }
    
    await ns.sleep(300);
    
    // ═══════════════════════════════════════════════════════════════════
    // BOOT COMPLETE - EXIT IMMÉDIATEMENT!
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("");
    debug.separator();
    debug.normal("🎉 G.H.O.S.T. v0.3.3.3 - DAEMONS LAUNCHED!");
    debug.normal("");
    debug.normal("🕷️  Auto-Spider : Cycle 1 starting now...");
    debug.normal("   → Spider (root network)");
    debug.normal("   → Target-selector (find best target)");
    debug.normal("   → Deploy-workers (launch workers)");
    debug.normal("   → Quantum sync (zero downtime)");
    debug.normal("");
    debug.normal("💻 Server Manager : Purchasing/upgrading Matrix servers");
    debug.normal("👁️  Telemetry : Monitoring network");
    if (homeAvailRam >= blackboxRam) {
        debug.normal("🎲 BlackBox : Solving contracts");
    }
    debug.normal("");
    debug.normal("⚡ Boot.js exiting → freeing 4.40GB RAM for Auto-Spider!");
    debug.normal("📊 Auto-Spider will have ~6.5GB free for cycle 1");
    debug.separator();
    debug.normal("");
    debug.normal("💰 Framework optimized for home 8GB → infinity");
    debug.normal("🚀 Tail /core/auto-spider.js to watch cycle 1!");
    
    debug.toastSuccess("🎉 G.H.O.S.T. v0.3.3.3 online!");
    
    await ns.sleep(1000);
    
    // EXIT → libère 4.40GB!
}
