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
 * @version     0.1.0
 * @author      Claude (Godlike AI Operator)
 * @description Point d'entrée principal G.H.O.S.T. v0.1.0
 *              Orchestrateur de démarrage : lance telemetry, spider, déploiement
 * 
 * @usage
 *   run /boot.js
 *   run /boot.js --debug 2
 *   run /boot.js --target foodnstuff
 * 
 * @commands
 *   --debug <0-3>   Niveau de verbosité (défaut: 1)
 *   --target <srv>  Serveur cible initial (défaut: n00dles)
 * 
 * @changelog
 *   v0.1.0 - 2025-01-XX - Initial release (BN1.1 virgin run)
 *            - Bootstrap séquence : telemetry -> spider -> deploy
 *            - Target automatique : n00dles (facile, early game)
 *            - Monitoring permanent (telemetry daemon)
 *            - Auto-root network (spider)
 *            - Worker deployment (deploy-workers)
 *            - BlackBox contract solver en option
 */

import { Debug } from "/lib/debug.js";

const DEFAULT_TARGET = "n00dles"; // Cible facile pour early game
const DEFAULT_DEBUG = 1;

/** @param {NS} ns */
export async function main(ns) {
    // ═══════════════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════════════
    const debugLevel = parseInt(ns.args[ns.args.indexOf("--debug") + 1]) || DEFAULT_DEBUG;
    const target = ns.args[ns.args.indexOf("--target") + 1] || DEFAULT_TARGET;
    
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
    ns.print("║  v0.1.0 - BN1.1 Bootstrap                                ║");
    ns.print("╚═══════════════════════════════════════════════════════════╝");
    ns.print("");
    ns.print(`🎯 Target: ${target}`);
    ns.print(`🐛 Debug Level: ${debug.getLevelName()}`);
    ns.print(`💰 Money: $${ns.formatNumber(ns.getServerMoneyAvailable("home"))}`);
    ns.print(`📊 Hacking: ${ns.getHackingLevel()}`);
    ns.print("");
    
    debug.toastInfo("G.H.O.S.T. v0.1.0 - Initializing...");
    
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
        
        // Wait for spider to finish
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
    // STEP 3: DEPLOY WORKERS
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 3: DEPLOY WORKERS                                ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    
    const deployArgs = [target];
    if (debugLevel > 1) {
        deployArgs.push("--debug", debugLevel);
    }
    
    const deployPid = ns.run("/core/deploy-workers.js", 1, ...deployArgs);
    
    if (deployPid > 0) {
        debug.normal("✅ Deploy workers launched - waiting for completion...");
        
        // Wait for deploy to finish
        while (ns.isRunning(deployPid)) {
            await ns.sleep(500);
        }
        
        debug.normal("✅ Workers deployed");
        debug.toastSuccess(`Workers deployed on target: ${target}`);
    } else {
        debug.normal("❌ Deploy workers failed to launch");
    }
    
    debug.normal("");
    await ns.sleep(2000);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 4: OPTIONAL - BLACKBOX CONTRACT SOLVER
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ STEP 4: BLACKBOX (OPTIONAL)                           ║");
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
    
    // ═══════════════════════════════════════════════════════════════════
    // BOOT COMPLETE
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║ 🚀 G.H.O.S.T. v0.1.0 BOOT COMPLETE                     ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    debug.normal("📊 Active Services:");
    debug.normal("   👁️  Telemetry daemon (monitoring)");
    debug.normal("   💰 Workers deployed (hacking)");
    debug.normal("   🎯 BlackBox solver (contracts)");
    debug.normal("");
    debug.normal("💡 Next steps:");
    debug.normal("   - Monitor with: tail /tools/telemetry.js");
    debug.normal("   - Check state: cat /state/network-status.json");
    debug.normal("   - Manual action: run /tools/log-action.js \"message\"");
    debug.normal("");
    
    debug.toastSuccess("G.H.O.S.T. v0.1.0 fully operational!");
    
    ns.tprint("════════════════════════════════════════════════════════════");
    ns.tprint("🎉 G.H.O.S.T. v0.1.0 - BOOT COMPLETE");
    ns.tprint(`🎯 Workers attacking: ${target}`);
    ns.tprint("👁️  Telemetry monitoring active");
    ns.tprint("════════════════════════════════════════════════════════════");
}
