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
 * @version     0.3.0
 * @author      Claude (Godlike AI Operator)
 * @description Sélecteur intelligent - TRI PAR PROFIT/S !
 *              REFONTE v0.3.0: Utilise network.js (profit/s > score)
 * 
 * @usage
 *   run /core/target-selector.js
 *   run /core/target-selector.js --debug 2
 * 
 * @algorithm
 *   profit/s = (maxMoney × hackPercent × hackChance) / hackTime
 *   TRI: Plus haut profit/s en premier
 * 
 * @changelog
 *   v0.3.0 - 2025-01-XX - G.H.O.S.T. v0.3.0 NEXUS Fusion
 *            - REFONTE: Utilise network.js au lieu de score custom
 *            - TRI PAR PROFIT/SECONDE (game changer!)
 *            - Intégration capabilities.js
 *   v0.2.0 - 2025-01-XX - Initial (score custom)
 */

import { StateManager } from "/lib/state-manager.js";
import { Debug } from "/lib/debug.js";
import { Capabilities } from "/lib/capabilities.js";
import { Network } from "/lib/network.js";

const DEFAULT_DEBUG = 1;

/** @param {NS} ns */
export async function main(ns) {
    // ═══════════════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════════════
    const debugLevel = parseInt(ns.args[ns.args.indexOf("--debug") + 1]) || DEFAULT_DEBUG;
    const debug = new Debug(ns, debugLevel);
    const stateMgr = new StateManager(ns);
    
    debug.header("🎯 TARGET SELECTOR v0.3.0 - PROFIT/S");
    debug.normal("");
    
    const startTime = debug.startTimer();
    
    // ═══════════════════════════════════════════════════════════════════
    // INIT CAPABILITIES & NETWORK
    // ═══════════════════════════════════════════════════════════════════
    debug.verbose("🔍 Scanning capabilities...");
    const caps = new Capabilities(ns);
    
    debug.verbose("🌐 Refreshing network...");
    const network = new Network(ns, caps);
    const servers = network.refresh(true);
    
    debug.normal(`🌐 Found ${servers.length} servers`);
    debug.normal(`📊 Hacking level: ${caps.hackingLevel}`);
    debug.verbose("");
    
    // ═══════════════════════════════════════════════════════════════════
    // GET TOP TARGETS (PROFIT/S)
    // ═══════════════════════════════════════════════════════════════════
    debug.verbose("💰 Calculating profit/s for all targets...");
    const topTargets = network.getTopTargets(5);
    
    if (topTargets.length === 0) {
        debug.normal("⚠️  No valid targets found");
        debug.toastWarning("No targets available");
        return;
    }
    
    // Best target
    const bestTarget = topTargets[0];
    const metrics = network.getTargetMetrics(bestTarget);
    
    debug.normal("");
    debug.separator();
    debug.normal("🏆 BEST TARGET (PROFIT/S):");
    debug.normal(`   Hostname: ${bestTarget}`);
    debug.money(metrics.maxMoney, "Max Money");
    debug.normal(`   Hack Time: ${ns.formatNumber(metrics.hackTime)}ms`);
    debug.normal(`   Hack Chance: ${(metrics.hackChance * 100).toFixed(1)}%`);
    debug.normal(`   💰 Profit/s: $${ns.formatNumber(metrics.profitPerSecond)}/s`);
    debug.separator();
    debug.normal("");
    
    // Show top 5
    if (debugLevel >= Debug.VERBOSE) {
        debug.verbose("📊 TOP 5 TARGETS:");
        for (let i = 0; i < topTargets.length; i++) {
            const target = topTargets[i];
            const m = network.getTargetMetrics(target);
            debug.verbose(`   ${i+1}. ${target}: $${ns.formatNumber(m.profitPerSecond)}/s`);
        }
        debug.verbose("");
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // SAVE TO STATE
    // ═══════════════════════════════════════════════════════════════════
    const bestTargetData = {
        timestamp: new Date().toISOString(),
        target: bestTarget,
        profitPerSecond: metrics.profitPerSecond,
        maxMoney: metrics.maxMoney,
        hackTime: metrics.hackTime,
        hackChance: metrics.hackChance,
        securityLevel: metrics.currentSec,
        reason: "Highest profit/second (v0.3.0 algorithm)",
        topCandidates: topTargets.slice(0, 5).map(t => {
            const tm = network.getTargetMetrics(t);
            return {
                hostname: t,
                profitPerSecond: tm.profitPerSecond
            };
        })
    };
    
    await stateMgr.save("best-target.json", bestTargetData);
    
    debug.normal("💾 Best target saved to /state/best-target.json");
    
    const elapsed = debug.endTimer(startTime, "Target selection", Debug.NORMAL);
    
    debug.toastSuccess(`Best target: ${bestTarget} ($${ns.formatNumber(metrics.profitPerSecond)}/s)`);
}
