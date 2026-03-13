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
 * @file        /core/deploy-workers.js
 * @version     0.1.0
 * @author      Claude (Godlike AI Operator)
 * @description Déploiement intelligent de workers sur réseau
 *              Copie workers sur serveurs rootés, lance threads optimaux
 * 
 * @usage
 *   run /core/deploy-workers.js <target>
 *   run /core/deploy-workers.js n00dles
 *   run /core/deploy-workers.js n00dles --debug 2
 * 
 * @commands
 *   <target>        Serveur cible pour hack/grow/weaken
 *   --debug <0-3>   Niveau de verbosité (défaut: 1)
 * 
 * @changelog
 *   v0.1.0 - 2025-01-XX - Initial release
 *            - Scan BFS du réseau
 *            - Copie workers sur serveurs rootés
 *            - Calcul threads optimaux par serveur
 *            - Stratégie: 50% weaken, 30% grow, 20% hack
 *            - Toast récap déploiement
 */

import { Debug } from "/lib/debug.js";

const WORKER_HACK = "/workers/hack.js";
const WORKER_GROW = "/workers/grow.js";
const WORKER_WEAKEN = "/workers/weaken.js";

const WORKER_RAM = 1.75; // RAM approximative des workers

/** @param {NS} ns */
export async function main(ns) {
    // ═══════════════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════════════
    if (ns.args.length === 0) {
        ns.tprint("❌ ERROR: Usage: run /core/deploy-workers.js <target>");
        ns.tprint("📝 Example: run /core/deploy-workers.js n00dles");
        return;
    }
    
    const target = ns.args[0];
    const debugLevel = parseInt(ns.args[ns.args.indexOf("--debug") + 1]) || 1;
    const debug = new Debug(ns, debugLevel);
    
    debug.header("🚀 DEPLOY WORKERS v0.1.0");
    debug.normal(`🎯 Target: ${target}`);
    debug.normal("");
    
    const startTime = debug.startTimer();
    
    // ═══════════════════════════════════════════════════════════════════
    // SCAN NETWORK
    // ═══════════════════════════════════════════════════════════════════
    debug.verbose("🌐 Scanning network...");
    const servers = scanNetwork(ns, debug);
    debug.normal(`🌐 Found ${servers.length} servers`);
    
    // Filter only rooted servers with RAM
    const deployableServers = servers.filter(s => 
        ns.hasRootAccess(s) && 
        ns.getServerMaxRam(s) > 0
    );
    
    debug.normal(`✅ Deployable: ${deployableServers.length} servers`);
    debug.verbose("");
    
    // ═══════════════════════════════════════════════════════════════════
    // COPY WORKERS
    // ═══════════════════════════════════════════════════════════════════
    debug.verbose("📦 Copying workers...");
    const workers = [WORKER_HACK, WORKER_GROW, WORKER_WEAKEN];
    
    for (const server of deployableServers) {
        await ns.scp(workers, server, "home");
        debug.ultra(`   📤 Workers copied to ${server}`);
    }
    
    debug.normal("📦 Workers copied to all servers");
    debug.verbose("");
    
    // ═══════════════════════════════════════════════════════════════════
    // DEPLOY & LAUNCH
    // ═══════════════════════════════════════════════════════════════════
    debug.verbose("🚀 Launching workers...");
    
    let totalThreads = 0;
    let serversDeployed = 0;
    
    for (const server of deployableServers) {
        const result = deployOnServer(ns, server, target, debug);
        
        if (result.totalThreads > 0) {
            serversDeployed++;
            totalThreads += result.totalThreads;
            
            debug.verbose(`✅ [${server}] Deployed ${result.totalThreads} threads`);
            debug.ultra(`   W: ${result.weakenThreads}, G: ${result.growThreads}, H: ${result.hackThreads}`);
        } else {
            debug.ultra(`⚠️  [${server}] No RAM available`);
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // FINAL STATS
    // ═══════════════════════════════════════════════════════════════════
    const elapsed = debug.endTimer(startTime, "Worker deployment", Debug.NORMAL);
    
    debug.normal("");
    debug.separator();
    debug.normal("📊 DEPLOYMENT RESULTS:");
    debug.normal(`   Target: ${target}`);
    debug.normal(`   Servers deployed: ${serversDeployed}/${deployableServers.length}`);
    debug.normal(`   Total threads: ${totalThreads}`);
    debug.separator();
    
    debug.toastSuccess(`Deployed ${totalThreads} threads on ${serversDeployed} servers`);
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
// HELPER: DEPLOY ON SERVER
// ═══════════════════════════════════════════════════════════════════════
function deployOnServer(ns, server, target, debug) {
    // Kill existing scripts
    ns.killall(server);
    
    // Calculate available RAM
    const maxRam = ns.getServerMaxRam(server);
    const availableRam = maxRam;
    
    if (availableRam < WORKER_RAM) {
        return {
            totalThreads: 0,
            weakenThreads: 0,
            growThreads: 0,
            hackThreads: 0
        };
    }
    
    // Calculate total threads possible
    const totalThreads = Math.floor(availableRam / WORKER_RAM);
    
    // Strategy: 50% weaken, 30% grow, 20% hack
    const weakenThreads = Math.floor(totalThreads * 0.5);
    const growThreads = Math.floor(totalThreads * 0.3);
    const hackThreads = Math.floor(totalThreads * 0.2);
    
    // Launch workers
    if (weakenThreads > 0) {
        ns.exec(WORKER_WEAKEN, server, weakenThreads, target);
    }
    
    if (growThreads > 0) {
        ns.exec(WORKER_GROW, server, growThreads, target);
    }
    
    if (hackThreads > 0) {
        ns.exec(WORKER_HACK, server, hackThreads, target);
    }
    
    return {
        totalThreads: weakenThreads + growThreads + hackThreads,
        weakenThreads,
        growThreads,
        hackThreads
    };
}
