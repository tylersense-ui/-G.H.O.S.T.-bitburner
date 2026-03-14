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
 * @file        /core/auto-spider.js
 * @version     0.3.1
 * @author      Claude (Godlike AI Operator)
 * @description Daemon automatique de re-root et redéploiement
 *              Cycle 5 minutes : spider → target-selector → deploy
 *              Détecte nouveaux serveurs et optimise automatiquement
 * 
 * @usage
 *   run /core/auto-spider.js
 *   run /core/auto-spider.js --debug 2
 *   run /core/auto-spider.js --interval 180000
 * 
 * @commands
 *   --debug <0-3>     Niveau de verbosité (défaut: 1)
 *   --interval <ms>   Intervalle cycle en ms (défaut: 300000 = 5min)
 * 
 * @workflow
 *   1. Lance spider.js (auto-root nouveaux serveurs)
 *   2. Détecte nombre de serveurs rootés
 *   3. Lance target-selector.js (recalcule meilleure cible)
 *   4. Si nouveaux serveurs → redéploie workers
 *   5. Toast si changements détectés
 *   6. Sleep → recommence
 * 
 * @changelog
 *   v0.3.1 - 2025-01-XX - HOTFIX: profitPerSecond support
 *   v0.2.0 - 2025-01-XX - G.H.O.S.T. v0.2.0 Trinity Matrix
 *            - NEW: Daemon automatique re-root
 *            - Cycle 5 minutes (configurable)
 *            - Détection changements réseau
 *            - Redéploiement automatique workers
 *            - Intégration target-selector
 *   v0.1.0 - 2025-01-XX - Initial release.
 * 
 */

import { StateManager } from "/lib/state-manager.js";
import { Debug } from "/lib/debug.js";

const DEFAULT_INTERVAL = 300000; // 5 minutes
const DEFAULT_DEBUG = 1;

/** @param {NS} ns */
export async function main(ns) {
    // ═══════════════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════════════
    const debugLevel = parseInt(ns.args[ns.args.indexOf("--debug") + 1]) || DEFAULT_DEBUG;
    const interval = parseInt(ns.args[ns.args.indexOf("--interval") + 1]) || DEFAULT_INTERVAL;
    
    const debug = new Debug(ns, debugLevel);
    const stateMgr = new StateManager(ns);
    
    debug.header("🕷️  AUTO-SPIDER DAEMON v0.2.0");
    debug.normal("");
    debug.normal(`🔒 Protection: Exception global-kill`);
    debug.normal(`⏱️  Cycle interval: ${interval/1000}s`);
    debug.normal(`🐛 Debug level: ${debug.getLevelName()}`);
    debug.normal("");
    
    debug.toastInfo("Auto-Spider daemon activé");
    
    let cycle = 0;
    let previousRootedCount = 0;
    
    // ═══════════════════════════════════════════════════════════════════
    // MAIN LOOP
    // ═══════════════════════════════════════════════════════════════════
    while (true) {
        cycle++;
        const startTime = debug.startTimer();
        
        if (debugLevel >= Debug.VERBOSE) {
            debug.clear();
            debug.header("🕷️  AUTO-SPIDER DAEMON");
        }
        
        debug.normal(`📊 Cycle: ${cycle}`);
        debug.normal(`⏰ Time: ${new Date().toLocaleTimeString()}`);
        debug.normal("");
        
        // ═══════════════════════════════════════════════════════════
        // STEP 1: RUN SPIDER (AUTO-ROOT)
        // ═══════════════════════════════════════════════════════════
        debug.verbose("🕷️  Running spider...");
        const spiderArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
        const spiderPid = ns.run("/core/spider.js", 1, ...spiderArgs);
        
        if (spiderPid > 0) {
            // Wait for spider to finish
            while (ns.isRunning(spiderPid)) {
                await ns.sleep(500);
            }
            debug.verbose("   ✅ Spider completed");
        } else {
            debug.verbose("   ⚠️  Spider already running or failed");
        }
        
        // ═══════════════════════════════════════════════════════════
        // STEP 2: COUNT ROOTED SERVERS
        // ═══════════════════════════════════════════════════════════
        const rootedCount = countRootedServers(ns);
        const newServers = rootedCount - previousRootedCount;
        
        debug.normal(`🌐 Rooted servers: ${rootedCount}`);
        
        if (newServers > 0) {
            debug.normal(`🆕 New servers rooted: ${newServers}`);
            debug.toastSuccess(`+${newServers} new servers rooted!`);
        } else {
            debug.verbose("   No new servers this cycle");
        }
        
        debug.normal("");
        
        // ═══════════════════════════════════════════════════════════
        // STEP 3: RUN TARGET SELECTOR
        // ═══════════════════════════════════════════════════════════
        debug.verbose("🎯 Running target selector...");
        const selectorArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
        const selectorPid = ns.run("/core/target-selector.js", 1, ...selectorArgs);
        
        if (selectorPid > 0) {
            // Wait for selector to finish
            while (ns.isRunning(selectorPid)) {
                await ns.sleep(500);
            }
            debug.verbose("   ✅ Target selector completed");
        } else {
            debug.verbose("   ⚠️  Target selector failed");
        }
        
        // Load best target
        const bestTarget = stateMgr.load("best-target.json");
        if (bestTarget) {
            // v0.3.1 FIX: profitPerSecond au lieu de score
            const metric = bestTarget.profitPerSecond 
                ? `$${ns.formatNumber(bestTarget.profitPerSecond)}/s`
                : `score ${(bestTarget.score || 0).toFixed(1)}`;
            debug.normal(`🎯 Current target: ${bestTarget.target} (${metric})`);
        }
        
        debug.normal("");
        
        // ═══════════════════════════════════════════════════════════
        // STEP 4: REDEPLOY IF NEW SERVERS
        // ═══════════════════════════════════════════════════════════
        if (newServers > 0 && bestTarget) {
            debug.normal("🚀 Redeploying workers...");
            
            const deployArgs = [bestTarget.target];
            if (debugLevel > 1) {
                deployArgs.push("--debug", debugLevel);
            }
            
            const deployPid = ns.run("/core/deploy-workers.js", 1, ...deployArgs);
            
            if (deployPid > 0) {
                // Wait for deployment to finish
                while (ns.isRunning(deployPid)) {
                    await ns.sleep(500);
                }
                debug.normal("   ✅ Workers redeployed");
                debug.toastSuccess(`Workers redeployed on ${newServers} new servers`);
            } else {
                debug.verbose("   ⚠️  Deploy failed or already running");
            }
        } else {
            debug.verbose("🔄 No redeployment needed");
        }
        
        debug.normal("");
        
        // Update count for next cycle
        previousRootedCount = rootedCount;
        
        // ═══════════════════════════════════════════════════════════
        // CYCLE COMPLETE
        // ═══════════════════════════════════════════════════════════
        const elapsed = debug.endTimer(startTime, "Auto-spider cycle", Debug.VERBOSE);
        
        debug.normal(`💓 Cycle ${cycle} complete`);
        debug.normal(`⏳ Next cycle in ${interval/1000}s...`);
        debug.normal("");
        
        await ns.sleep(interval);
    }
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER: COUNT ROOTED SERVERS
// ═══════════════════════════════════════════════════════════════════════
function countRootedServers(ns) {
    const servers = ["home"];
    const visited = new Set(["home"]);
    let rooted = 0;
    
    for (let i = 0; i < servers.length; i++) {
        const host = servers[i];
        const neighbors = ns.scan(host);
        
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                servers.push(neighbor);
            }
        }
        
        if (ns.hasRootAccess(host)) {
            rooted++;
        }
    }
    
    return rooted;
}
