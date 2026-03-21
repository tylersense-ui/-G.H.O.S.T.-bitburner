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
 * @version     0.3.3.3
 * @author      Claude (Godlike AI Operator)
 * @description QUANTUM SYNC Auto-Spider - FAIT TOUT!
 *              Cycle 1: Spider + Target + Deploy (FORCE)
 *              Cycles suivants: Quantum sync (instant reactivity)
 * 
 * @usage
 *   run /core/auto-spider.js
 *   run /core/auto-spider.js --debug 2
 * 
 * @commands
 *   --debug <0-3>   Niveau de verbosité (défaut: 1)
 * 
 * @innovation_v0.3.3.3
 *   CYCLE 1 (boot.js vient de lancer):
 *   - Spider (root network avec 6.5GB libres!)
 *   - Target-selector (5.70GB requis - OK!)
 *   - Deploy-workers (5.60GB requis - OK!)
 *   
 *   CYCLES SUIVANTS (quantum sync):
 *   - Spider (check nouveaux serveurs)
 *   - Target-selector (recalcule best target)
 *   - Deploy si nouveaux serveurs
 *   - Smart wait (90% sleep + 10% monitoring)
 *   - Instant restart dès que workers finissent
 * 
 * @workflow_quantum
 *   1. Spider (auto-root nouveaux serveurs)
 *   2. Target Selector (recalcule meilleure cible)
 *   3. Deploy Workers (cycle 1 FORCE, autres si nouveaux)
 *   4. SMART WAIT:
 *      - Sleep 90% du weaken time estimé
 *      - Surveillance active derniers 10%
 *      - Cycle immédiat dès que workers finissent
 * 
 * @changelog
 *   v0.3.3.3 - 2026-03-14 - ULTRA-MINIMAL BOOT SUPPORT
 *            - Cycle 1: FORCE deploy (même si newServers = 0)
 *            - Boot.js exit libère RAM pour cycle 1
 *            - Spider + Target + Deploy garanti au cycle 1
 *   v0.3.3.1 - 2026-03-14 - HOTFIX: ns.run → ns.exec
 *   v0.3.3 - 2026-03-14 - QUANTUM SYNC EDITION
 *   v0.2.0 - 2026-03-13 - G.H.O.S.T. Trinity Matrix
 *   v0.1.0 - 2026-03-08 - Initial release
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
    
    const debug = new Debug(ns, debugLevel);
    const stateMgr = new StateManager(ns);
    
    ns.ui.openTail();
    debug.clear();
    debug.header("🕷️ AUTO-SPIDER v0.3.3.3 - QUANTUM SYNC");
    debug.normal("");
    debug.normal("⚡ Cycle 1: Spider + Target + Deploy (FORCE)");
    debug.normal("⚡ Cycles suivants: Quantum sync (instant)");
    debug.normal("🎯 Zero downtime, maximum reactivity");
    debug.normal("");
    debug.separator();
    
    // ═══════════════════════════════════════════════════════════════════
    // MAIN LOOP - QUANTUM SYNC
    // ═══════════════════════════════════════════════════════════════════
    let cycle = 0;
    
    while (true) {
        cycle++;
        const cycleStart = Date.now();
        
        if (debugLevel >= Debug.VERBOSE) {
            debug.clear();
            debug.header("🕷️ AUTO-SPIDER - QUANTUM SYNC");
        }
        
        debug.normal(`📊 Cycle: ${cycle}`);
        debug.normal(`⏰ Time: ${new Date().toLocaleTimeString()}`);
        debug.normal("");
        
        // ═══════════════════════════════════════════════════════════
        // STEP 1: RUN SPIDER (AUTO-ROOT)
        // ═══════════════════════════════════════════════════════════
        debug.verbose("═══════════════════════════════════════════════════════");
        debug.verbose("STEP 1: SPIDER (AUTO-ROOT NETWORK)");
        debug.verbose("═══════════════════════════════════════════════════════");
        debug.verbose("");
        
        const beforeRoot = countRootedServers(ns);
        
        const spiderPid = ns.exec("/core/spider.js", "home", 1);
        if (spiderPid > 0) {
            debug.ultra("   🕷️ Spider launched, waiting...");
            while (ns.isRunning(spiderPid, "home")) {
                await ns.sleep(200);
            }
        }
        
        const afterRoot = countRootedServers(ns);
        const newServers = afterRoot - beforeRoot;
        
        debug.normal(`✅ Spider complete: ${afterRoot} servers rooted`);
        if (newServers > 0) {
            debug.normal(`   🆕 NEW: ${newServers} servers rooted!`);
            debug.toastSuccess(`🆕 ${newServers} new servers rooted!`);
        }
        debug.normal("");
        
        // ═══════════════════════════════════════════════════════════
        // STEP 2: RUN TARGET SELECTOR
        // ═══════════════════════════════════════════════════════════
        debug.verbose("═══════════════════════════════════════════════════════");
        debug.verbose("STEP 2: TARGET SELECTOR (RECALCULATE BEST)");
        debug.verbose("═══════════════════════════════════════════════════════");
        debug.verbose("");
        
        const targetPid = ns.exec("/core/target-selector.js", "home", 1);
        if (targetPid > 0) {
            debug.ultra("   🎯 Target selector launched, waiting...");
            while (ns.isRunning(targetPid, "home")) {
                await ns.sleep(200);
            }
        }
        
        // Load best target
        const bestTarget = stateMgr.load("best-target.json");
        if (bestTarget) {
            const metric = bestTarget.profitPerSecond 
                ? `$${ns.formatNumber(bestTarget.profitPerSecond)}/s`
                : `score ${(bestTarget.score || 0).toFixed(1)}`;
            debug.normal(`✅ Target selected: ${bestTarget.target} (${metric})`);
        } else {
            debug.normal(`⚠️  No target selected (using fallback)`);
        }
        
        debug.normal("");
        
        // ═══════════════════════════════════════════════════════════
        // STEP 3: DEPLOY WORKERS
        // CYCLE 1: FORCE deploy (boot.js n'a rien déployé)
        // AUTRES: Deploy seulement si nouveaux serveurs
        // ═══════════════════════════════════════════════════════════
        const shouldDeploy = (cycle === 1) || (newServers > 0);
        
        if (shouldDeploy && bestTarget) {
            debug.verbose("═══════════════════════════════════════════════════════");
            if (cycle === 1) {
                debug.verbose("STEP 3: INITIAL DEPLOY (CYCLE 1 - FORCE)");
            } else {
                debug.verbose("STEP 3: REDEPLOY WORKERS (NEW SERVERS DETECTED)");
            }
            debug.verbose("═══════════════════════════════════════════════════════");
            debug.verbose("");
            
            const deployPid = ns.exec("/core/deploy-workers.js", "home", 1, bestTarget.target);
            if (deployPid > 0) {
                debug.ultra("   📦 Deploy workers launched, waiting...");
                while (ns.isRunning(deployPid, "home")) {
                    await ns.sleep(200);
                }
                
                if (cycle === 1) {
                    debug.normal(`✅ Initial workers deployed on all servers`);
                    debug.toastSuccess(`📦 Workers deployed! Target: ${bestTarget.target}`);
                } else {
                    debug.normal(`✅ Workers redeployed on ${newServers} new servers`);
                    debug.toastSuccess(`📦 ${newServers} servers now active!`);
                }
            } else {
                debug.normal(`❌ Deploy failed (RAM insufficient or already running)`);
            }
            
            debug.normal("");
        } else {
            debug.ultra("   No deploy needed (cycle " + cycle + ", newServers " + newServers + ")");
            debug.ultra("");
        }
        
        // ═══════════════════════════════════════════════════════════
        // STEP 4: QUANTUM SYNC - SMART WAIT
        // ═══════════════════════════════════════════════════════════
        debug.separator();
        debug.normal("⚡ QUANTUM SYNC: Waiting for jobs to complete...");
        debug.normal("");
        
        if (!bestTarget) {
            // Fallback: cycle fixe si pas de target
            debug.verbose("   ⚠️  No target → using default 5min cycle");
            await ns.sleep(300000);
            continue;
        }
        
        // ═══════════════════════════════════════════════════════════
        // PHASE 1: ESTIMATION (Sleep 90% du weaken time)
        // ═══════════════════════════════════════════════════════════
        const weakenTime = ns.getWeakenTime(bestTarget.target);
        const estimatedSleep = weakenTime * 0.9; // 90%
        
        debug.normal(`📐 Estimated job time: ${(weakenTime/1000).toFixed(1)}s`);
        debug.normal(`😴 Phase 1: Sleeping ${(estimatedSleep/1000).toFixed(1)}s (90% estimated)...`);
        debug.ultra("");
        
        await ns.sleep(estimatedSleep);
        
        // ═══════════════════════════════════════════════════════════
        // PHASE 2: SURVEILLANCE ACTIVE (Derniers 10%)
        // ═══════════════════════════════════════════════════════════
        debug.normal(`👁️  Phase 2: Active monitoring (last 10%)...`);
        debug.ultra("");
        
        let checksCount = 0;
        const checkStart = Date.now();
        
        while (hasActiveWorkers(ns)) {
            checksCount++;
            debug.ultra(`   🔍 Check #${checksCount}: Workers still active...`);
            await ns.sleep(1000); // Check chaque seconde
        }
        
        const monitoringTime = Date.now() - checkStart;
        
        debug.normal(`✅ All workers finished!`);
        debug.verbose(`   Monitoring time: ${(monitoringTime/1000).toFixed(1)}s (${checksCount} checks)`);
        debug.normal("");
        
        // ═══════════════════════════════════════════════════════════
        // CYCLE STATS
        // ═══════════════════════════════════════════════════════════
        const cycleTime = Date.now() - cycleStart;
        const efficiency = ((weakenTime / cycleTime) * 100).toFixed(1);
        
        debug.separator();
        debug.normal(`📊 Cycle ${cycle} complete:`);
        debug.normal(`   Total time: ${(cycleTime/1000).toFixed(1)}s`);
        debug.normal(`   Efficiency: ${efficiency}% (${checksCount} active checks)`);
        if (cycle === 1) {
            debug.normal(`   🎉 CYCLE 1 SUCCESS: Spider + Target + Deploy complete!`);
        } else if (newServers > 0) {
            debug.normal(`   Innovation: ${newServers} new servers, instant restart`);
        }
        debug.separator();
        debug.normal("");
        debug.normal("🔄 Starting next cycle immediately...");
        debug.normal("");
        
        // Small buffer avant prochain cycle
        await ns.sleep(2000);
    }
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Compte le nombre total de serveurs rootés
 * @param {NS} ns 
 * @returns {number} Nombre de serveurs avec root access
 */
function countRootedServers(ns) {
    const allServers = scanNetwork(ns);
    return allServers.filter(host => ns.hasRootAccess(host)).length;
}

/**
 * Scanne le réseau complet (BFS)
 * @param {NS} ns 
 * @returns {Array<string>} Liste de tous les hostnames
 */
function scanNetwork(ns) {
    const visited = new Set();
    const queue = ["home"];
    const servers = [];
    
    while (queue.length > 0) {
        const current = queue.shift();
        
        if (visited.has(current)) continue;
        visited.add(current);
        
        servers.push(current);
        
        const neighbors = ns.scan(current);
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                queue.push(neighbor);
            }
        }
    }
    
    // Ajouter purchased servers
    const purchased = ns.getPurchasedServers();
    for (const p of purchased) {
        if (!servers.includes(p)) {
            servers.push(p);
        }
    }
    
    return servers;
}

/**
 * QUANTUM SYNC CORE: Détecte si des workers sont actifs
 * @param {NS} ns 
 * @returns {boolean} true si au moins un worker actif
 */
function hasActiveWorkers(ns) {
    const allServers = scanNetwork(ns);
    
    for (const server of allServers) {
        const procs = ns.ps(server);
        
        const workers = procs.filter(p => 
            p.filename === "workers/hack.js" ||
            p.filename === "workers/grow.js" ||
            p.filename === "workers/weaken.js" ||
            p.filename === "/workers/hack.js" ||
            p.filename === "/workers/grow.js" ||
            p.filename === "/workers/weaken.js"
        );
        
        if (workers.length > 0) {
            return true; // Au moins un worker actif
        }
    }
    
    return false; // Aucun worker actif
}
