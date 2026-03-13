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
 * @file        /core/spider.js
 * @version     0.1.0
 * @author      Claude (Godlike AI Operator)
 * @description Auto-root network scanner
 *              Scanne BFS, ouvre ports, NUKE tous les serveurs accessibles
 * 
 * @usage
 *   run /core/spider.js
 *   run /core/spider.js --debug 2
 * 
 * @commands
 *   --debug <0-3>   Niveau de verbosité (défaut: 1)
 * 
 * @changelog
 *   v0.1.0 - 2025-01-XX - Initial release
 *            - BFS scan complet du réseau
 *            - Auto-détection port openers disponibles
 *            - NUKE automatique si ports suffisants
 *            - Toast pour chaque root obtenu
 *            - Statistiques finales (rootés/total)
 */

import { Debug } from "/lib/debug.js";

/** @param {NS} ns */
export async function main(ns) {
    // ═══════════════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════════════
    const debugLevel = parseInt(ns.args[ns.args.indexOf("--debug") + 1]) || 1;
    const debug = new Debug(ns, debugLevel);
    
    debug.header("🕷️  SPIDER AUTO-ROOT v0.1.0");
    debug.normal("");
    
    const startTime = debug.startTimer();
    
    // ═══════════════════════════════════════════════════════════════════
    // SCAN NETWORK (BFS)
    // ═══════════════════════════════════════════════════════════════════
    debug.verbose("🌐 Scanning network...");
    const servers = scanNetwork(ns, debug);
    debug.normal(`🌐 Found ${servers.length} servers`);
    debug.verbose("");
    
    // ═══════════════════════════════════════════════════════════════════
    // DETECT AVAILABLE PORT OPENERS
    // ═══════════════════════════════════════════════════════════════════
    const portOpeners = detectPortOpeners(ns, debug);
    debug.normal(`🔓 Port openers available: ${portOpeners.count}`);
    debug.verbose(`   Tools: ${portOpeners.tools.join(", ")}`);
    debug.verbose("");
    
    // ═══════════════════════════════════════════════════════════════════
    // ROOT SERVERS
    // ═══════════════════════════════════════════════════════════════════
    let alreadyRooted = 0;
    let newlyRooted = 0;
    let cannotRoot = 0;
    
    for (const server of servers) {
        if (server === "home") continue; // Skip home
        
        if (ns.hasRootAccess(server)) {
            alreadyRooted++;
            debug.ultra(`✅ [${server}] Already rooted`);
            continue;
        }
        
        // Tentative root
        const result = attemptRoot(ns, server, portOpeners, debug);
        
        if (result.success) {
            newlyRooted++;
            debug.normal(`✅ [${server}] ROOT ACCESS GAINED !`);
            debug.toastSuccess(`Root: ${server}`);
        } else {
            cannotRoot++;
            debug.verbose(`⚠️  [${server}] Cannot root: ${result.reason}`);
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // FINAL STATS
    // ═══════════════════════════════════════════════════════════════════
    const elapsed = debug.endTimer(startTime, "Spider scan", Debug.NORMAL);
    
    debug.normal("");
    debug.separator();
    debug.normal("📊 SPIDER RESULTS:");
    debug.normal(`   Total servers: ${servers.length}`);
    debug.normal(`   ✅ Already rooted: ${alreadyRooted}`);
    debug.normal(`   🆕 Newly rooted: ${newlyRooted}`);
    debug.normal(`   ⚠️  Cannot root: ${cannotRoot}`);
    debug.separator();
    
    if (newlyRooted > 0) {
        debug.toastSuccess(`Spider: ${newlyRooted} new roots obtained!`);
    }
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER: SCAN NETWORK (BFS)
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
                debug.ultra(`   🔗 Discovered: ${neighbor}`);
            }
        }
    }
    
    return servers;
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER: DETECT PORT OPENERS
// ═══════════════════════════════════════════════════════════════════════
function detectPortOpeners(ns, debug) {
    const tools = [];
    let count = 0;
    
    if (ns.fileExists("BruteSSH.exe", "home")) {
        tools.push("BruteSSH.exe");
        count++;
    }
    
    if (ns.fileExists("FTPCrack.exe", "home")) {
        tools.push("FTPCrack.exe");
        count++;
    }
    
    if (ns.fileExists("relaySMTP.exe", "home")) {
        tools.push("relaySMTP.exe");
        count++;
    }
    
    if (ns.fileExists("HTTPWorm.exe", "home")) {
        tools.push("HTTPWorm.exe");
        count++;
    }
    
    if (ns.fileExists("SQLInject.exe", "home")) {
        tools.push("SQLInject.exe");
        count++;
    }
    
    return { count, tools };
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER: ATTEMPT ROOT
// ═══════════════════════════════════════════════════════════════════════
function attemptRoot(ns, server, portOpeners, debug) {
    try {
        // Open ports
        let portsOpened = 0;
        
        if (portOpeners.tools.includes("BruteSSH.exe")) {
            ns.brutessh(server);
            portsOpened++;
        }
        
        if (portOpeners.tools.includes("FTPCrack.exe")) {
            ns.ftpcrack(server);
            portsOpened++;
        }
        
        if (portOpeners.tools.includes("relaySMTP.exe")) {
            ns.relaysmtp(server);
            portsOpened++;
        }
        
        if (portOpeners.tools.includes("HTTPWorm.exe")) {
            ns.httpworm(server);
            portsOpened++;
        }
        
        if (portOpeners.tools.includes("SQLInject.exe")) {
            ns.sqlinject(server);
            portsOpened++;
        }
        
        // Check if enough ports
        const portsRequired = ns.getServerNumPortsRequired(server);
        
        if (portsOpened < portsRequired) {
            return {
                success: false,
                reason: `Need ${portsRequired} ports, have ${portsOpened}`
            };
        }
        
        // Nuke !
        ns.nuke(server);
        
        return { success: true };
        
    } catch (error) {
        return {
            success: false,
            reason: error.toString()
        };
    }
}
