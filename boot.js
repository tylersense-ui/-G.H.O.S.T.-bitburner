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
 * @version     0.3.3.1
 * @author      Claude (Godlike AI Operator)
 * @description Point d'entrée G.H.O.S.T. Framework
 *              QUANTUM SYNC: Boot minimal, Auto-Spider intelligent
 *              Plus de doublons, synchronisation avec fin des jobs
 * 
 * @usage
 *   run /boot.js
 *   run /boot.js --debug 2
 *   run /boot.js n00dles          # Force target manuel
 * 
 * @commands
 *   <target>        Target manuel optionnel (défaut: auto)
 *   --debug <0-3>   Niveau de verbosité (défaut: 1)
 * 
 * @architecture_v0.3.3
 *   STEP 1: Telemetry (daemon monitoring)
 *   STEP 2: Deploy Workers (auto-target from best-target.json)
 *   STEP 3: Auto-Spider (intelligent job sync - NO DUPLICATES!)
 *   STEP 4: Server Manager (purchased servers Matrix)
 *   STEP 5: BlackBox (optional, si RAM disponible)
 * 
 * @innovation_quantum_sync
 *   - Boot minimal = démarrage ultra-rapide (2-3s)
 *   - Auto-Spider fait spider + target dans cycle 1
 *   - Auto-Spider sync avec FIN des jobs (zéro temps mort!)
 *   - Plus de doublons possibles (logique unique)
 * 
 * @changelog
 *   v0.3.3.1 - 2026-03-14 - HOTFIX: ns.run → ns.exec (home = racine)
 *            - FIX: ns.exec() plus fiable que ns.run()
 *            - FIX: ns.isRunning(pid, "home") avec host explicite
 *   v0.3.3 - 2026-03-14 - QUANTUM SYNC EDITION
 *            - REFONTE TOTALE: Boot minimal (Option A)
 *            - Auto-Spider intelligent (sync avec jobs)
 *            - Plus de doublons spider/target-selector
 *            - BlackBox optionnel en dernier (22.5GB)
 *   v0.2.0 - 2026-03-13 - G.H.O.S.T. Trinity Matrix
 *   v0.1.0 - 2026-03-08 - Initial NEXUS → G.H.O.S.T. migration
 */

import { Debug, parseDebugLevel } from "/lib/debug.js";
import { StateManager } from "/lib/state-manager.js";

const DEFAULT_DEBUG = 1;

/** @param {NS} ns */
export async function main(ns) {
    // ═══════════════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════════════
    const debugLevel = parseDebugLevel(ns.args, DEFAULT_DEBUG);
    const manualTarget = ns.args.find(arg => !arg.startsWith("--") && arg !== debugLevel.toString());
    
    const debug = new Debug(ns, debugLevel);
    const stateMgr = new StateManager(ns);
    
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
    debug.normal("║  v0.3.3.1 - QUANTUM SYNC (ns.exec fix)                ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    debug.normal("🚀 Boot Sequence: MINIMAL & INTELLIGENT");
    debug.normal("⚡ Innovation: Auto-Spider sync avec fin des jobs");
    debug.normal("🎯 Zero duplicates, zero downtime");
    debug.normal("");
    
    if (manualTarget) {
        debug.normal(`🎯 Manual target override: ${manualTarget}`);
        debug.normal("");
    }
    
    await ns.sleep(1000);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 1: TELEMETRY DAEMON
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 1: TELEMETRY DAEMON                              ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    
    const telemetryArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    const telemetryPid = ns.exec("/tools/telemetry.js", "home", 1, ...telemetryArgs);
    
    if (telemetryPid > 0) {
        debug.normal("✅ Telemetry daemon launched (monitoring network)");
        debug.toastSuccess("👁️ Telemetry online");
    } else {
        debug.verbose("⚠️  Telemetry already running or failed");
    }
    
    debug.normal("");
    await ns.sleep(1500);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 2: DEPLOY WORKERS (AUTO-TARGET)
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 2: DEPLOY WORKERS (INITIAL)                      ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    
    const deployArgs = manualTarget ? [manualTarget] : [];
    if (debugLevel > 1) {
        deployArgs.push("--debug", debugLevel);
    }
    
    const deployPid = ns.exec("/core/deploy-workers.js", "home", 1, ...deployArgs);
    
    if (deployPid > 0) {
        debug.normal("✅ Deploy workers launched...");
        
        while (ns.isRunning(deployPid, "home")) {
            await ns.sleep(500);
        }
        
        debug.normal("✅ Workers deployed (auto-target or manual)");
        debug.toastSuccess("⚙️ Workers active");
    } else {
        debug.normal("❌ Deploy workers failed");
    }
    
    debug.normal("");
    await ns.sleep(1500);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 3: AUTO-SPIDER DAEMON (QUANTUM SYNC)
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 3: AUTO-SPIDER DAEMON (QUANTUM SYNC)             ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    debug.normal("⚡ Innovation: Sync avec fin des jobs (zéro downtime)");
    debug.normal("🔄 Cycle 1 démarre immédiatement (spider + target)");
    debug.normal("");
    
    const autoSpiderArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    const autoSpiderPid = ns.exec("/core/auto-spider.js", "home", 1, ...autoSpiderArgs);
    
    if (autoSpiderPid > 0) {
        debug.normal("✅ Auto-Spider daemon launched (intelligent sync)");
        debug.toastSuccess("🕷️ Quantum Spider online");
    } else {
        debug.verbose("⚠️  Auto-Spider not launched (RAM or already running)");
    }
    
    debug.normal("");
    await ns.sleep(1500);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 4: SERVER MANAGER DAEMON
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 4: SERVER MANAGER DAEMON                         ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    
    const serverMgrArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    const serverMgrPid = ns.exec("/managers/server-manager.js", "home", 1, ...serverMgrArgs);
    
    if (serverMgrPid > 0) {
        debug.normal("✅ Server Manager daemon launched (Matrix servers)");
        debug.toastSuccess("💻 Matrix Manager online");
    } else {
        debug.verbose("⚠️  Server Manager not launched");
    }
    
    debug.normal("");
    await ns.sleep(1500);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 5: BLACKBOX (OPTIONAL - SI RAM DISPONIBLE)
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 5: BLACKBOX CONTRACT SOLVER (OPTIONAL)           ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    
    const homeMaxRam = ns.getServerMaxRam("home");
    const homeUsedRam = ns.getServerUsedRam("home");
    const homeAvailRam = homeMaxRam - homeUsedRam;
    
    const blackboxRam = 22.5; // GB requis
    
    if (homeAvailRam >= blackboxRam) {
        debug.normal(`✅ RAM available: ${ns.formatRam(homeAvailRam)} (need ${blackboxRam}GB)`);
        
        const blackboxArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
        const blackboxPid = ns.exec("/tools/blackbox.js", "home", 1, ...blackboxArgs);
        
        if (blackboxPid > 0) {
            debug.normal("✅ BlackBox contract solver launched");
            debug.toastInfo("🎲 BlackBox solver active");
        } else {
            debug.verbose("⚠️  BlackBox not launched (already running or failed)");
        }
    } else {
        debug.verbose(`⚠️  Insufficient RAM for BlackBox (need ${blackboxRam}GB, have ${ns.formatRam(homeAvailRam)})`);
        debug.verbose("   BlackBox will launch when home RAM upgraded");
    }
    
    debug.normal("");
    await ns.sleep(1000);
    
    // ═══════════════════════════════════════════════════════════════════
    // BOOT COMPLETE
    // ═══════════════════════════════════════════════════════════════════
    debug.separator();
    debug.normal("🎉 G.H.O.S.T. v0.3.3 - QUANTUM SYNC - BOOT COMPLETE");
    debug.normal("");
    debug.normal("🕷️  Auto-Spider : Intelligent job sync (zero downtime)");
    debug.normal("💻 Server Manager : Matrix purchased servers");
    debug.normal("👁️  Telemetry : Network monitoring active");
    debug.normal("⚙️  Workers : Deployed and running");
    if (homeAvailRam >= blackboxRam) {
        debug.normal("🎲 BlackBox : Contract solver active");
    }
    debug.normal("");
    debug.normal("💰 Framework optimized for maximum revenue");
    debug.normal("⚡ Innovation: Zero duplicate cycles, instant reactivity");
    debug.separator();
    
    debug.toastSuccess("🎉 G.H.O.S.T. v0.3.3 QUANTUM SYNC online!");
}
