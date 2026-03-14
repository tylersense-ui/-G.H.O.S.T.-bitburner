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
 * @file        /tools/telemetry.js
 * @version     0.2.1
 * @author      Claude (Godlike AI Operator)
 * @description Daemon de monitoring permanent - L'Œil de Claude
 *              HOTFIX: Dépréciations corrigées
 * 
 * @usage
 *   run /tools/telemetry.js
 *   run /tools/telemetry.js --debug 2
 * 
 * @changelog
 *   v0.2.1 - 2025-01-XX - HOTFIX: Dépréciations corrigées
 *            - FIX: ns.getTimeSinceLastAug() → Date.now() - ns.getResetInfo().lastAugReset
 *   v0.1.0 - 2025-01-XX - Initial release
 */

import { StateManager } from "/lib/state-manager.js";
import { Debug } from "/lib/debug.js";

const DEFAULT_INTERVAL = 30000; // 30s
const DEFAULT_DEBUG = 1; // NORMAL

/** @param {NS} ns */
export async function main(ns) {
    // ═══════════════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════════════
    const debugLevel = parseInt(ns.args[ns.args.indexOf("--debug") + 1]) || DEFAULT_DEBUG;
    const updateInterval = parseInt(ns.args[ns.args.indexOf("--interval") + 1]) || DEFAULT_INTERVAL;
    
    const debug = new Debug(ns, debugLevel);
    const stateMgr = new StateManager(ns);
    
    // ═══════════════════════════════════════════════════════════════════
    // HEADER
    // ═══════════════════════════════════════════════════════════════════
    debug.header("👁️  TELEMETRY DAEMON v0.2.1");
    debug.normal("");
    debug.normal("🔒 Protection: Exception global-kill");
    debug.normal(`⏱️  Update interval: ${updateInterval/1000}s`);
    debug.normal(`🐛 Debug level: ${debug.getLevelName()}`);
    debug.normal("");
    
    debug.toastInfo("Telemetry daemon activé");
    
    let cycle = 0;
    
    // ═══════════════════════════════════════════════════════════════════
    // MAIN LOOP
    // ═══════════════════════════════════════════════════════════════════
    while (true) {
        cycle++;
        const startTime = debug.startTimer();
        
        if (debugLevel >= Debug.VERBOSE) {
            debug.clear();
            debug.header("👁️  TELEMETRY DAEMON");
        }
        
        debug.verbose(`📊 Cycle: ${cycle}`);
        debug.verbose(`⏰ Time: ${new Date().toISOString()}`);
        debug.verbose("");
        
        // ═══════════════════════════════════════════════════════════
        // 1️⃣ NETWORK STATUS
        // ═══════════════════════════════════════════════════════════
        debug.ultra("🌐 Collecting network status...");
        const networkStatus = collectNetworkStatus(ns, debug);
        await stateMgr.save("network-status.json", networkStatus);
        
        debug.normal(`🌐 Network: ${networkStatus.totalServersScanned} scanned`);
        debug.normal(`   Rooted: ${networkStatus.totalServersRooted}`);
        debug.verbose(`   With scripts: ${networkStatus.totalServersWithScripts}`);
        debug.verbose(`   Empty: ${networkStatus.totalServersEmpty}`);
        debug.ultra(`   RAM: ${ns.formatNumber(networkStatus.totalRamUsed)}/${ns.formatNumber(networkStatus.totalRamNetwork)} GB`);
        debug.verbose("");
        
        // ═══════════════════════════════════════════════════════════
        // 2️⃣ PERFORMANCE METRICS
        // ═══════════════════════════════════════════════════════════
        debug.ultra("⚡ Collecting performance metrics...");
        const perfMetrics = collectPerformanceMetrics(ns, debug);
        await stateMgr.save("performance-metrics.json", perfMetrics);
        
        debug.metric("Threads", perfMetrics.totalThreads || 0);
        debug.money(perfMetrics.currentMoney || 0);
        debug.verbose(`📈 Revenue: $${ns.formatNumber(perfMetrics.revenuePerSecond || 0)}/s`);
        debug.verbose("");
        
        // ═══════════════════════════════════════════════════════════
        // 3️⃣ PLAYER STATS
        // ═══════════════════════════════════════════════════════════
        debug.ultra("🎯 Collecting player stats...");
        const playerStats = collectPlayerStats(ns, debug);
        await stateMgr.save("player-stats.json", playerStats);
        
        debug.normal(`🎯 Hacking: ${playerStats.hackingLevel}`);
        debug.verbose(`📡 BitNode: ${playerStats.currentBitNode}`);
        debug.verbose("");
        
        // ═══════════════════════════════════════════════════════════
        // 4️⃣ VERSION TRACKING
        // ═══════════════════════════════════════════════════════════
        debug.ultra("📦 Collecting version info...");
        const versionInfo = collectVersionInfo(ns, debug);
        await stateMgr.save("version-tracking.json", versionInfo);
        
        if (debugLevel >= Debug.VERBOSE) {
            debug.verbose("📦 Active versions:");
            for (const [file, version] of Object.entries(versionInfo.versions)) {
                debug.verbose(`   ${file}: ${version}`);
            }
            debug.verbose("");
        }
        
        // ═══════════════════════════════════════════════════════════
        // 5️⃣ HEARTBEAT
        // ═══════════════════════════════════════════════════════════
        // ✅ FIX v0.2.1: Date.now() - ns.getResetInfo().lastAugReset
        const resetInfo = ns.getResetInfo();
        const uptime = Date.now() - resetInfo.lastAugReset;
        
        await stateMgr.save("daemon-heartbeat.json", {
            timestamp: new Date().toISOString(),
            cycle: cycle,
            pid: ns.pid,
            uptime: uptime
        });
        
        const elapsed = debug.endTimer(startTime, "Telemetry cycle", Debug.VERBOSE);
        debug.normal(`💓 Heartbeat saved (cycle ${cycle})`);
        debug.verbose(`⏳ Next update in ${updateInterval/1000}s...`);
        debug.verbose("");
        
        await ns.sleep(updateInterval);
    }
}

// ═══════════════════════════════════════════════════════════════════════
// COLLECTION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

function collectNetworkStatus(ns, debug) {
    const visited = new Set();
    const queue = ["home"];
    const allServers = [];
    
    // BFS scan
    while (queue.length > 0) {
        const current = queue.shift();
        if (visited.has(current)) continue;
        visited.add(current);
        
        const neighbors = ns.scan(current);
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                queue.push(neighbor);
            }
        }
        
        allServers.push(current);
    }
    
    // Analyze servers
    const serversDetail = [];
    let totalRooted = 0;
    let totalWithScripts = 0;
    let totalEmpty = 0;
    let totalRamNetwork = 0;
    let totalRamUsed = 0;
    
    for (const hostname of allServers) {
        const hasRoot = ns.hasRootAccess(hostname);
        const maxRam = ns.getServerMaxRam(hostname);
        const usedRam = ns.getServerUsedRam(hostname);
        const processes = ns.ps(hostname);
        
        if (hasRoot) totalRooted++;
        if (processes.length > 0) totalWithScripts++;
        if (processes.length === 0 && maxRam > 0) totalEmpty++;
        
        totalRamNetwork += maxRam;
        totalRamUsed += usedRam;
        
        serversDetail.push({
            hostname: hostname,
            hasRoot: hasRoot,
            maxRam: maxRam,
            usedRam: usedRam,
            availableRam: maxRam - usedRam,
            processCount: processes.length,
            processes: processes.map(p => ({
                filename: p.filename,
                threads: p.threads,
                args: p.args
            }))
        });
    }
    
    return {
        timestamp: new Date().toISOString(),
        totalServersScanned: allServers.length,
        totalServersRooted: totalRooted,
        totalServersWithScripts: totalWithScripts,
        totalServersEmpty: totalEmpty,
        totalRamNetwork: totalRamNetwork,
        totalRamUsed: totalRamUsed,
        ramUsagePercent: totalRamNetwork > 0 ? (totalRamUsed / totalRamNetwork) * 100 : 0,
        serversDetail: serversDetail
    };
}

function collectPerformanceMetrics(ns, debug) {
    const allServers = scanAll(ns);
    let totalThreads = 0;
    
    for (const server of allServers) {
        const processes = ns.ps(server);
        for (const proc of processes) {
            totalThreads += proc.threads;
        }
    }
    
    let revenuePerSecond = 0;
    try {
        const income = ns.getScriptIncome();
        if (income && Array.isArray(income) && income.length > 0) {
            revenuePerSecond = income[0] || 0;
        }
    } catch (e) {
        revenuePerSecond = 0;
    }
    
    return {
        timestamp: new Date().toISOString(),
        currentMoney: ns.getServerMoneyAvailable("home"),
        revenuePerSecond: revenuePerSecond,
        totalThreads: totalThreads,
        hackingLevel: ns.getHackingLevel()
    };
}

function collectPlayerStats(ns, debug) {
    // ✅ FIX v0.2.1: Date.now() - ns.getResetInfo().lastAugReset
    const resetInfo = ns.getResetInfo();
    const timeSinceLastAug = Date.now() - resetInfo.lastAugReset;
    
    return {
        timestamp: new Date().toISOString(),
        hackingLevel: ns.getHackingLevel(),
        currentBitNode: "BN-1", // Placeholder
        timeSinceLastAug: timeSinceLastAug,
        homeRamMax: ns.getServerMaxRam("home"),
        homeRamUsed: ns.getServerUsedRam("home"),
        purchasedServers: ns.getPurchasedServers().length
    };
}

function collectVersionInfo(ns, debug) {
    const files = [
        "/boot.js",
        "/core/spider.js",
        "/core/deploy-workers.js",
        "/lib/state-manager.js",
        "/lib/debug.js",
        "/tools/telemetry.js",
        "/tools/blackbox.js"
    ];
    
    const versions = {};
    
    for (const file of files) {
        if (ns.fileExists(file)) {
            const content = ns.read(file);
            const match = content.match(/v([\d.]+)/);
            versions[file] = match ? match[1] : "unknown";
        }
    }
    
    return {
        timestamp: new Date().toISOString(),
        versions: versions
    };
}

function scanAll(ns) {
    const visited = new Set();
    const queue = ["home"];
    const servers = [];
    
    while (queue.length > 0) {
        const current = queue.shift();
        if (visited.has(current)) continue;
        visited.add(current);
        
        const neighbors = ns.scan(current);
        for (const n of neighbors) {
            if (!visited.has(n)) queue.push(n);
        }
        
        servers.push(current);
    }
    
    return servers;
}
