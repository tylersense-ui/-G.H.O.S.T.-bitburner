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
 * @version     0.3.3.2
 * @author      Claude (Godlike AI Operator)
 * @description Point d'entrée G.H.O.S.T. Framework
 *              EARLY GAME FIX: Spider + Target AVANT deploy!
 *              RAM optimisé pour home 8GB
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
 * @architecture_v0.3.3.2
 *   STEP 1: Telemetry (daemon monitoring)
 *   STEP 2: Spider (root network - one-shot)         ← NOUVEAU!
 *   STEP 3: Target Selector (créé best-target.json)  ← NOUVEAU!
 *   STEP 4: Deploy Workers (lit best-target.json)
 *   STEP 5: Auto-Spider (quantum sync cycles)
 *   STEP 6: Server Manager (purchased servers)
 *   STEP 7: BlackBox (optionnel si RAM)
 * 
 * @innovation_v0.3.3.2
 *   - Spider + Target AVANT deploy (résout race condition)
 *   - Target-selector optimisé RAM (5.20GB → 2.0GB)
 *   - best-target.json GARANTI d'exister avant deploy
 *   - Compatible home 8GB (early game)
 * 
 * @changelog
 *   v0.3.3.2 - 2026-03-14 - EARLY GAME FIX
 *            - STEP 2+3 NOUVEAUX: Spider + Target AVANT deploy
 *            - Résout "No target selected" en early game
 *            - Target-selector optimisé RAM (5.20GB → 2.0GB)
 *            - Compatible home 8GB
 *   v0.3.3.1 - 2026-03-14 - HOTFIX: ns.run → ns.exec
 *   v0.3.3 - 2026-03-14 - QUANTUM SYNC EDITION
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
    debug.normal("║  v0.3.3.2 - EARLY GAME FIX (8GB home)                 ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    debug.normal("🚀 Boot Sequence: OPTIMIZED FOR 8GB HOME");
    debug.normal("⚡ Spider + Target BEFORE deploy (race condition fix)");
    debug.normal("🎯 Target-selector RAM optimized (5.2GB → 2.0GB)");
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
        debug.normal("✅ Telemetry daemon launched");
        debug.toastSuccess("👁️ Telemetry online");
    } else {
        debug.verbose("⚠️  Telemetry already running or failed");
    }
    
    debug.normal("");
    await ns.sleep(1500);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 2: SPIDER (ROOT NETWORK - ONE-SHOT)
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 2: SPIDER (ROOT NETWORK)                         ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    debug.normal("🕷️  Rooting all hackable servers...");
    
    const spiderPid = ns.exec("/core/spider.js", "home", 1);
    
    if (spiderPid > 0) {
        while (ns.isRunning(spiderPid, "home")) {
            await ns.sleep(500);
        }
        debug.normal("✅ Spider complete (network rooted)");
    } else {
        debug.normal("⚠️  Spider failed or already running");
    }
    
    debug.normal("");
    await ns.sleep(1000);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 3: TARGET SELECTOR (CREATE BEST-TARGET.JSON)
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 3: TARGET SELECTOR (OPTIMIZED 2.0GB)            ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    
    if (!manualTarget) {
        debug.normal("🎯 Calculating best target (profit/s)...");
        
        const targetPid = ns.exec("/core/target-selector.js", "home", 1);
        
        if (targetPid > 0) {
            while (ns.isRunning(targetPid, "home")) {
                await ns.sleep(500);
            }
            
            const bestTarget = stateMgr.load("best-target.json");
            if (bestTarget) {
                debug.normal(`✅ Target selected: ${bestTarget.target}`);
                debug.normal(`   Profit/s: $${ns.formatNumber(bestTarget.profitPerSecond)}/s`);
            } else {
                debug.normal("⚠️  No target found (using deploy fallback)");
            }
        } else {
            debug.normal("⚠️  Target selector failed (RAM or already running)");
        }
    } else {
        debug.normal(`✅ Manual target: ${manualTarget} (skipping selector)`);
    }
    
    debug.normal("");
    await ns.sleep(1500);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 4: DEPLOY WORKERS
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 4: DEPLOY WORKERS                                ║");
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
        
        debug.normal("✅ Workers deployed and active");
        debug.toastSuccess("⚙️ Workers online");
    } else {
        debug.normal("❌ Deploy workers failed (RAM insufficient)");
    }
    
    debug.normal("");
    await ns.sleep(1500);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 5: AUTO-SPIDER DAEMON (QUANTUM SYNC)
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 5: AUTO-SPIDER DAEMON (QUANTUM SYNC)             ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    debug.normal("⚡ Quantum sync: Monitors jobs, instant cycles");
    debug.normal("");
    
    const autoSpiderArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    const autoSpiderPid = ns.exec("/core/auto-spider.js", "home", 1, ...autoSpiderArgs);
    
    if (autoSpiderPid > 0) {
        debug.normal("✅ Auto-Spider daemon launched");
        debug.toastSuccess("🕷️ Quantum Spider online");
    } else {
        debug.verbose("⚠️  Auto-Spider not launched (RAM or already running)");
    }
    
    debug.normal("");
    await ns.sleep(1500);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 6: SERVER MANAGER DAEMON
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 6: SERVER MANAGER DAEMON                         ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    
    const serverMgrArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    const serverMgrPid = ns.exec("/managers/server-manager.js", "home", 1, ...serverMgrArgs);
    
    if (serverMgrPid > 0) {
        debug.normal("✅ Server Manager daemon launched");
        debug.toastSuccess("💻 Matrix Manager online");
    } else {
        debug.verbose("⚠️  Server Manager not launched");
    }
    
    debug.normal("");
    await ns.sleep(1500);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 7: BLACKBOX (OPTIONAL - SI RAM DISPONIBLE)
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 7: BLACKBOX CONTRACT SOLVER (OPTIONAL)           ║");
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
            debug.toastInfo("🎲 BlackBox active");
        } else {
            debug.verbose("⚠️  BlackBox not launched");
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
    debug.normal("🎉 G.H.O.S.T. v0.3.3.2 - EARLY GAME FIX - BOOT COMPLETE");
    debug.normal("");
    debug.normal("🕷️  Auto-Spider : Quantum sync (zero downtime)");
    debug.normal("💻 Server Manager : Matrix purchased servers");
    debug.normal("👁️  Telemetry : Network monitoring");
    debug.normal("⚙️  Workers : Deployed and active");
    debug.normal("🎯 Target : Auto-selected (profit/s optimized)");
    if (homeAvailRam >= blackboxRam) {
        debug.normal("🎲 BlackBox : Contract solver active");
    }
    debug.normal("");
    debug.normal("💰 Framework optimized for home 8GB");
    debug.normal("⚡ Spider + Target BEFORE deploy (race condition fixed)");
    debug.separator();
    
    debug.toastSuccess("🎉 G.H.O.S.T. v0.3.3.2 online!");
}
