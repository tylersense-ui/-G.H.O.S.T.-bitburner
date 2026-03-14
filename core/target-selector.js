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
 * @version     0.2.0
 * @author      Claude (Godlike AI Operator)
 * @description Sélecteur intelligent de cible optimale
 *              Analyse tous les serveurs rootés et calcule scores
 *              Sauvegarde best target dans /state/best-target.json
 * 
 * @usage
 *   run /core/target-selector.js
 *   run /core/target-selector.js --debug 2
 * 
 * @commands
 *   --debug <0-3>   Niveau de verbosité (défaut: 1)
 * 
 * @algorithm
 *   score = (maxMoney/1M) * 0.4      // 40% poids argent
 *         + (100/hackTime) * 0.3     // 30% poids vitesse
 *         + (hackChance) * 0.2       // 20% poids probabilité
 *         + (100/securityLevel) * 0.1 // 10% poids sécurité
 * 
 * @changelog
 *   v0.2.0 - 2025-01-XX - G.H.O.S.T. v0.2.0 Trinity Matrix
 *            - NEW: Algorithme scoring intelligent
 *            - Analyse tous serveurs rootés
 *            - Filtre par hack level requis
 *            - Sauvegarde best-target.json
 *            - Système DEBUG intégré
 */

import { StateManager } from "/lib/state-manager.js";
import { Debug } from "/lib/debug.js";

const DEFAULT_DEBUG = 1;

/** @param {NS} ns */
export async function main(ns) {
    // ═══════════════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════════════
    const debugLevel = parseInt(ns.args[ns.args.indexOf("--debug") + 1]) || DEFAULT_DEBUG;
    const debug = new Debug(ns, debugLevel);
    const stateMgr = new StateManager(ns);
    
    debug.header("🎯 TARGET SELECTOR v0.2.0");
    debug.normal("");
    
    const startTime = debug.startTimer();
    
    // ═══════════════════════════════════════════════════════════════════
    // SCAN NETWORK
    // ═══════════════════════════════════════════════════════════════════
    debug.verbose("🌐 Scanning network...");
    const servers = scanNetwork(ns, debug);
    debug.normal(`🌐 Found ${servers.length} servers`);
    
    // Filter: only rooted servers with money
    const candidates = servers.filter(s => 
        ns.hasRootAccess(s) && 
        ns.getServerMaxMoney(s) > 0 &&
        ns.getServerRequiredHackingLevel(s) <= ns.getHackingLevel()
    );
    
    debug.normal(`✅ Candidates: ${candidates.length} servers`);
    debug.verbose("");
    
    if (candidates.length === 0) {
        debug.normal("⚠️  No valid candidates - keeping default target");
        debug.toastWarning("No targets available");
        return;
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // ANALYZE & SCORE
    // ═══════════════════════════════════════════════════════════════════
    debug.verbose("📊 Analyzing candidates...");
    
    const analyses = [];
    
    for (const server of candidates) {
        const analysis = analyzeServer(ns, server, debug);
        analyses.push(analysis);
        
        debug.ultra(`   ${server}: score=${analysis.score.toFixed(2)}`);
    }
    
    // Sort by score (descending)
    analyses.sort((a, b) => b.score - a.score);
    
    // Best target
    const best = analyses[0];
    
    debug.normal("");
    debug.separator();
    debug.normal("🏆 BEST TARGET FOUND:");
    debug.normal(`   Hostname: ${best.hostname}`);
    debug.normal(`   Score: ${best.score.toFixed(2)}`);
    debug.money(best.maxMoney, "Max Money");
    debug.normal(`   Hack Time: ${ns.formatNumber(best.hackTime)}s`);
    debug.normal(`   Hack Chance: ${(best.hackChance * 100).toFixed(1)}%`);
    debug.normal(`   Security: ${best.securityLevel.toFixed(1)}`);
    debug.separator();
    debug.normal("");
    
    // ═══════════════════════════════════════════════════════════════════
    // SAVE TO STATE
    // ═══════════════════════════════════════════════════════════════════
    const bestTarget = {
        timestamp: new Date().toISOString(),
        target: best.hostname,
        score: best.score,
        maxMoney: best.maxMoney,
        hackTime: best.hackTime,
        hackChance: best.hackChance,
        securityLevel: best.securityLevel,
        reason: "Optimal money/time/chance ratio",
        topCandidates: analyses.slice(0, 5).map(a => ({
            hostname: a.hostname,
            score: a.score
        }))
    };
    
    await stateMgr.save("best-target.json", bestTarget);
    
    debug.normal("💾 Best target saved to /state/best-target.json");
    
    const elapsed = debug.endTimer(startTime, "Target selection", Debug.NORMAL);
    
    debug.toastSuccess(`Best target: ${best.hostname} (score: ${best.score.toFixed(1)})`);
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER: SCAN NETWORK
// ═══════════════════════════════════════════════════════════════════════
function scanNetwork(ns, debug) {
    const servers = ["home"];
    const visited = new Set(["home"]);
    
    for (let i = 0; i < servers.length; i++) {
        const host = servers[i];
        const neighbors = ns.scan(host);
        
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                servers.push(neighbor);
            }
        }
    }
    
    return servers;
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER: ANALYZE SERVER
// ═══════════════════════════════════════════════════════════════════════
function analyzeServer(ns, hostname, debug) {
    const maxMoney = ns.getServerMaxMoney(hostname);
    const hackTime = ns.getHackTime(hostname);
    const hackChance = ns.hackAnalyzeChance(hostname);
    const securityLevel = ns.getServerSecurityLevel(hostname);
    
    // Score algorithm:
    // - 40% weight on money potential
    // - 30% weight on speed (lower hack time)
    // - 20% weight on success chance
    // - 10% weight on security (lower is better)
    
    const moneyScore = (maxMoney / 1000000) * 0.4;
    const speedScore = (100 / (hackTime / 1000)) * 0.3;
    const chanceScore = hackChance * 0.2;
    const securityScore = (100 / securityLevel) * 0.1;
    
    const totalScore = moneyScore + speedScore + chanceScore + securityScore;
    
    return {
        hostname: hostname,
        score: totalScore,
        maxMoney: maxMoney,
        hackTime: hackTime / 1000, // Convert to seconds
        hackChance: hackChance,
        securityLevel: securityLevel,
        moneyScore: moneyScore,
        speedScore: speedScore,
        chanceScore: chanceScore,
        securityScore: securityScore
    };
}
