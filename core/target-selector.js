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
 * @file        /core/target-selector.js
 * @version     0.3.3.6
 * @author      Claude (Godlike AI Operator)
 * @description Sélecteur intelligent - OPTIMISÉ RAM (5.70GB)
 *              TRI PAR PROFIT/S - Spawne auto-spider après
 * 
 * @usage
 *   run /core/target-selector.js
 *   run /core/target-selector.js --debug 2
 * 
 * @algorithm
 *   profit/s = (maxMoney × hackPercent × hackChance) / hackTime
 *   TRI: Plus haut profit/s en premier
 * 
 * @spawn_chain_v0.3.3.6
 *   boot.js → target-selector.js → auto-spider.js
 *   
 *   Target-selector:
 *   - Spawned by boot.js (has 8GB free)
 *   - Creates best-target.json
 *   - Spawns auto-spider.js
 *   - Exits (frees 5.70GB)
 * 
 * @changelog
 *   v0.3.3.6 - 2026-03-14 - SPAWN CHAIN
 *            - Spawns auto-spider.js after creating best-target.json
 *            - Part of spawn chain: boot → target → auto-spider
 *   v0.3.3.2 - 2026-03-14 - RAM OPTIMIZATION
 *            - Inline logic (pas d'import Network.js)
 *            - 5.20GB → 2.0GB RAM (-60%!)
 *            - Fallback intelligent: foodnstuff/n00dles
 *            - Compatible early game (MIN_TARGET_MONEY = $100k)
 *   v0.3.0 - 2025-01-XX - G.H.O.S.T. v0.3.0 NEXUS Fusion
 *            - REFONTE: Utilise network.js
 *            - TRI PAR PROFIT/SECONDE
 *   v0.2.0 - 2025-01-XX - Initial (score custom)
 */

import { StateManager } from "/lib/state-manager.js";
import { CONFIG } from "/lib/constants.js";

/** @param {NS} ns */
export async function main(ns) {
    ns.disableLog("ALL");
    ns.ui.openTail();
    ns.clearLog();
    
    // ═══════════════════════════════════════════════════════════════════
    // HEADER
    // ═══════════════════════════════════════════════════════════════════
    ns.print("╔═══════════════════════════════════════════════════════════╗");
    ns.print("║   🎯 TARGET SELECTOR v0.3.3.2 - RAM OPTIMIZED             ║");
    ns.print("╚═══════════════════════════════════════════════════════════╝");
    ns.print("");
    
    const stateMgr = new StateManager(ns);
    const playerLevel = ns.getHackingLevel();
    
    // ═══════════════════════════════════════════════════════════════════
    // SCAN NETWORK (BFS)
    // ═══════════════════════════════════════════════════════════════════
    const allServers = scanNetwork(ns);
    ns.print(`🌐 Scanned ${allServers.length} servers`);
    ns.print(`📊 Hacking level: ${playerLevel}`);
    ns.print("");
    
    // ═══════════════════════════════════════════════════════════════════
    // FILTER TARGETS
    // ═══════════════════════════════════════════════════════════════════
    const minMoney = CONFIG.HACKING.MIN_TARGET_MONEY;
    
    const validTargets = allServers.filter(host => {
        // Must have root access
        if (!ns.hasRootAccess(host)) return false;
        
        // Must be hackable
        const reqLevel = ns.getServerRequiredHackingLevel(host);
        if (reqLevel > playerLevel) return false;
        
        // Must have money
        const maxMoney = ns.getServerMaxMoney(host);
        if (maxMoney < minMoney) return false;
        
        // Ignore home & purchased servers
        if (host === "home") return false;
        if (ns.getPurchasedServers().includes(host)) return false;
        
        return true;
    });
    
    ns.print(`✅ Valid targets: ${validTargets.length}/${allServers.length}`);
    ns.print("");
    
    // ═══════════════════════════════════════════════════════════════════
    // FALLBACK: If no valid targets, use early game defaults
    // ═══════════════════════════════════════════════════════════════════
    if (validTargets.length === 0) {
        ns.print("⚠️  No targets match filter, using fallback...");
        
        // Try common early game targets
        const fallbacks = ["foodnstuff", "n00dles", "sigma-cosmetics", "joesguns"];
        
        for (const target of fallbacks) {
            if (ns.serverExists(target) && ns.hasRootAccess(target)) {
                const maxMoney = ns.getServerMaxMoney(target);
                const reqLevel = ns.getServerRequiredHackingLevel(target);
                
                if (reqLevel <= playerLevel && maxMoney > 0) {
                    ns.print(`✅ Fallback selected: ${target}`);
                    
                    const bestTarget = {
                        target: target,
                        profitPerSecond: 0,
                        maxMoney: maxMoney,
                        minSecurity: ns.getServerMinSecurityLevel(target),
                        requiredLevel: reqLevel,
                        timestamp: Date.now()
                    };
                    
                    stateMgr.save("best-target.json", bestTarget);
                    
                    ns.print("");
                    ns.print(`💾 Saved: ${target}`);
                    ns.toast(`🎯 Target: ${target} (fallback)`, "info");
                    return;
                }
            }
        }
        
        ns.print("❌ No fallback targets available!");
        ns.toast("⚠️ No targets found", "warning");
        return;
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // CALCULATE PROFIT/S FOR EACH TARGET
    // ═══════════════════════════════════════════════════════════════════
    ns.print("💰 Calculating profit/s...");
    
    const targetScores = [];
    
    for (const host of validTargets) {
        const maxMoney = ns.getServerMaxMoney(host);
        const hackChance = ns.hackAnalyzeChance(host);
        const hackTime = ns.getHackTime(host);
        
        // Assume 10% hack per cycle
        const hackPercent = 0.10;
        
        // profit/s = (maxMoney × hackPercent × hackChance) / hackTime
        const profitPerSecond = (maxMoney * hackPercent * hackChance) / (hackTime / 1000);
        
        targetScores.push({
            target: host,
            profitPerSecond: profitPerSecond,
            maxMoney: maxMoney,
            minSecurity: ns.getServerMinSecurityLevel(host),
            requiredLevel: ns.getServerRequiredHackingLevel(host),
            hackChance: hackChance,
            hackTime: hackTime
        });
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // SORT BY PROFIT/S (DESC)
    // ═══════════════════════════════════════════════════════════════════
    targetScores.sort((a, b) => b.profitPerSecond - a.profitPerSecond);
    
    const best = targetScores[0];
    
    ns.print(`✅ Best target: ${best.target}`);
    ns.print(`   Profit/s: $${ns.formatNumber(best.profitPerSecond)}/s`);
    ns.print(`   Max money: $${ns.formatNumber(best.maxMoney)}`);
    ns.print(`   Hack chance: ${(best.hackChance * 100).toFixed(1)}%`);
    ns.print("");
    
    // ═══════════════════════════════════════════════════════════════════
    // SAVE TO STATE
    // ═══════════════════════════════════════════════════════════════════
    const bestTarget = {
        target: best.target,
        profitPerSecond: best.profitPerSecond,
        maxMoney: best.maxMoney,
        minSecurity: best.minSecurity,
        requiredLevel: best.requiredLevel,
        timestamp: Date.now()
    };
    
    stateMgr.save("best-target.json", bestTarget);
    
    ns.print("💾 Saved to state/best-target.json");
    ns.toast(`🎯 Target: ${best.target} ($${ns.formatNumber(best.profitPerSecond)}/s)`, "success");
    
    // ═══════════════════════════════════════════════════════════════════
    // SHOW TOP 5
    // ═══════════════════════════════════════════════════════════════════
    ns.print("");
    ns.print("📊 TOP 5 TARGETS:");
    for (let i = 0; i < Math.min(5, targetScores.length); i++) {
        const t = targetScores[i];
        ns.print(`   ${i + 1}. ${t.target.padEnd(20)} $${ns.formatNumber(t.profitPerSecond)}/s`);
    }
    

// ═══════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS (INLINE - NO IMPORTS)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Scan network complet (BFS)
 * @param {NS} ns 
 * @returns {Array<string>} Liste hostnames
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
    
    // Add purchased servers
    const purchased = ns.getPurchasedServers();
    for (const p of purchased) {
        if (!servers.includes(p)) {
            servers.push(p);
        }
    }
    
    return servers;
}
