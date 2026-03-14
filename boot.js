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
 * @version     0.2.0
 * @author      Claude (Godlike AI Operator)
 * @description Point d'entrée principal G.H.O.S.T. v0.2.0 Trinity Matrix
 *              Orchestrateur : telemetry, spider, target-selector,
 *              deploy-workers, blackbox, auto-spider, server-manager
 * 
 * @usage
 *   run /boot.js
 *   run /boot.js --debug 2
 *   run /boot.js --target foodnstuff
 * 
 * @commands
 *   --debug <0-3>   Niveau de verbosité (défaut: 1)
 *   --target <srv>  Serveur cible initial (défaut: auto from best-target.json)
 * 
 * @changelog
 *   v0.2.0 - 2025-01-XX - G.H.O.S.T. v0.2.0 Trinity Matrix
 *            - ADDED: target-selector (initial run)
 *            - ADDED: auto-spider daemon (5min cycle)
 *            - ADDED: server-manager daemon (2min cycle)
 *            - MODIFIED: deploy-workers avec auto-target
 *            - Trinity Matrix complete automation
 *   v0.1.0 - 2025-01-XX - Initial release (BN1.1 virgin run)
 *            - Bootstrap séquence : telemetry -> spider -> deploy
 *            - Target automatique : n00dles (facile, early game)
 *            - Monitoring permanent (telemetry daemon)
 *            - Auto-root network (spider)
 *            - Worker deployment (deploy-workers)
 *            - BlackBox contract solver en option
 */

import { Debug } from "/lib/debug.js";

const DEFAULT_DEBUG = 1;

/** @param {NS} ns */
export async function main(ns) {
    // ═══════════════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════════════
    const debugLevel = parseInt(ns.args[ns.args.indexOf("--debug") + 1]) || DEFAULT_DEBUG;
    const manualTarget = ns.args[ns.args.indexOf("--target") + 1] || null;
    
    const debug = new Debug(ns, debugLevel);
    
    // ═══════════════════════════════════════════════════════════════════
    // HEADER
    // ═══════════════════════════════════════════════════════════════════
    debug.clear();
    ns.print("╔═══════════════════════════════════════════════════════════╗");
    ns.print("║  ██████╗ ██╗  ██╗ ██████╗ ███████╗████████╗             ║");
    ns.print("║ ██╔════╝ ██║  ██║██╔═══██╗██╔════╝╚══██╔══╝             ║");
    ns.print("║ ██║  ███╗███████║██║   ██║███████╗   ██║                ║");
    ns.print("║ ██║   ██║██╔══██║██║   ██║╚════██║   ██║                ║");
    ns.print("║ ╚██████╔╝██║  ██║╚██████╔╝███████║   ██║                ║");
    ns.print("║  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝                ║");
    ns.print("║                                                           ║");
    ns.print("║  Godlike Heuristic Operator & Strategy Toolkit           ║");
    ns.print("║  v0.2.0 - TRINITY MATRIX                                 ║");
    ns.print("╚═══════════════════════════════════════════════════════════╝");
    ns.print("");
    ns.print(`🐛 Debug Level: ${debug.getLevelName()}`);
    ns.print(`💰 Money: $${ns.formatNumber(ns.getServerMoneyAvailable("home"))}`);
    ns.print(`📊 Hacking: ${ns.getHackingLevel()}`);
    ns.print("");
    
    debug.toastInfo("G.H.O.S.T. v0.2.0 - Trinity Matrix - Initializing...");
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 1: LAUNCH TELEMETRY DAEMON
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 1: TELEMETRY DAEMON                              ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    
    const telemetryArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    const telemetryPid = ns.exec("/tools/telemetry.js", "home", 1, ...telemetryArgs);
    
    if (telemetryPid > 0) {
        debug.normal("✅ Telemetry daemon launched");
        debug.toastSuccess("Telemetry daemon online");
    } else {
        debug.normal("⚠️  Telemetry daemon already running or failed");
    }
    
    debug.normal("");
    await ns.sleep(2000);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 2: SPIDER (AUTO-ROOT NETWORK)
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 2: SPIDER - AUTO-ROOT NETWORK                    ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    
    const spiderArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    const spiderPid = ns.run("/core/spider.js", 1, ...spiderArgs);
    
    if (spiderPid > 0) {
        debug.normal("✅ Spider launched - waiting for completion...");
        
        while (ns.isRunning(spiderPid)) {
            await ns.sleep(500);
        }
        
        debug.normal("✅ Spider completed");
        debug.toastSuccess("Network auto-rooted");
    } else {
        debug.normal("❌ Spider failed to launch");
    }
    
    debug.normal("");
    await ns.sleep(2000);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 3: TARGET SELECTOR (INITIAL RUN) - NEW v0.2.0
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 3: TARGET SELECTOR - INITIAL RUN                 ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    
    const selectorArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    const selectorPid = ns.run("/core/target-selector.js", 1, ...selectorArgs);
    
    if (selectorPid > 0) {
        debug.normal("✅ Target selector launched - waiting for completion...");
        
        while (ns.isRunning(selectorPid)) {
            await ns.sleep(500);
        }
        
        debug.normal("✅ Best target calculated");
        debug.toastSuccess("Optimal target selected");
    } else {
        debug.normal("❌ Target selector failed to launch");
    }
    
    debug.normal("");
    await ns.sleep(2000);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 4: DEPLOY WORKERS
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 4: DEPLOY WORKERS                                ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    
    const deployArgs = manualTarget ? [manualTarget] : []; // Auto-target if no manual
    if (debugLevel > 1) {
        deployArgs.push("--debug", debugLevel);
    }
    
    const deployPid = ns.run("/core/deploy-workers.js", 1, ...deployArgs);
    
    if (deployPid > 0) {
        debug.normal("✅ Deploy workers launched - waiting for completion...");
        
        while (ns.isRunning(deployPid)) {
            await ns.sleep(500);
        }
        
        debug.normal("✅ Workers deployed");
        debug.toastSuccess("Workers deployed on all servers");
    } else {
        debug.normal("❌ Deploy workers failed to launch");
    }
    
    debug.normal("");
    await ns.sleep(2000);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 5: BLACKBOX CONTRACT SOLVER (OPTIONAL)
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 5: BLACKBOX (OPTIONAL)                           ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    
    const blackboxArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    const blackboxPid = ns.exec("/tools/blackbox.js", "home", 1, ...blackboxArgs);
    
    if (blackboxPid > 0) {
        debug.normal("✅ BlackBox contract solver launched (background)");
        debug.toastInfo("BlackBox solver active");
    } else {
        debug.verbose("⚠️  BlackBox not launched (RAM or already running)");
    }
    
    debug.normal("");
    await ns.sleep(2000);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 6: AUTO-SPIDER DAEMON - NEW v0.2.0
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 6: AUTO-SPIDER DAEMON (5min cycle)               ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    
    const autoSpiderArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    const autoSpiderPid = ns.exec("/core/auto-spider.js", "home", 1, ...autoSpiderArgs);
    
    if (autoSpiderPid > 0) {
        debug.normal("✅ Auto-Spider daemon launched (background)");
        debug.toastSuccess("Auto-Spider daemon online");
    } else {
        debug.verbose("⚠️  Auto-Spider not launched");
    }
    
    debug.normal("");
    await ns.sleep(2000);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 7: SERVER MANAGER DAEMON - NEW v0.2.0
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 7: SERVER MANAGER DAEMON (2min cycle)            ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    
    const serverMgrArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    const serverMgrPid = ns.exec("/managers/server-manager.js", "home", 1, ...serverMgrArgs);
    
    if (serverMgrPid > 0) {
        debug.normal("✅ Server Manager daemon launched (background)");
        debug.toastSuccess("Server Manager Matrix online");
    } else {
        debug.verbose("⚠️  Server Manager not launched");
    }
    
    debug.normal("");
    
    // ═══════════════════════════════════════════════════════════════════
    // BOOT COMPLETE
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ 🚀 G.H.O.S.T. v0.2.0 TRINITY MATRIX - BOOT COMPLETE    ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    debug.normal("📊 Active Services:");
    debug.normal("   👁️  Telemetry daemon (monitoring 30s)");
    debug.normal("   💰 Workers deployed (auto-target)");
    debug.normal("   🎯 BlackBox solver (contracts)");
    debug.normal("   🕷️  Auto-Spider daemon (re-root 5min)");
    debug.normal("   💻 Server Manager daemon (Matrix 2min)");
    debug.normal("");
    debug.normal("💡 Next steps:");
    debug.normal("   - Monitor: tail /tools/telemetry.js");
    debug.normal("   - Check target: cat /state/best-target.json");
    debug.normal("   - Manual action: run /tools/log-action.js \"message\"");
    debug.normal("");
    
    debug.toastSuccess("G.H.O.S.T. v0.2.0 Trinity Matrix fully operational!");
    
    ns.tprint("════════════════════════════════════════════════════════════");
    ns.tprint("🎉 G.H.O.S.T. v0.2.0 - TRINITY MATRIX - BOOT COMPLETE");
    ns.tprint("🎯 Auto-targeting enabled");
    ns.tprint("🕷️  Auto-Spider active (5min)");
    ns.tprint("💻 Server Manager active (2min)");
    ns.tprint("════════════════════════════════════════════════════════════");
}
