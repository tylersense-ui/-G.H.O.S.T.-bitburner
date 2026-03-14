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
 * @file        /managers/server-manager.js
 * @version     0.3.2
 * @author      Claude (Godlike AI Operator)
 * @description Gestionnaire automatique purchased servers Matrix
 *              Achète et upgrade servers avec noms Matrix stylés
 *              Déploie workers automatiquement après chaque action
 *              AUTO-STOP quand tous les serveurs sont maxés
 * 
 * @usage
 *   run /managers/server-manager.js
 *   run /managers/server-manager.js --debug 2
 *   run /managers/server-manager.js --interval 60000
 * 
 * @commands
 *   --debug <0-3>     Niveau de verbosité (défaut: 1)
 *   --interval <ms>   Intervalle cycle en ms (défaut: 120000 = 2min)
 * 
 * @matrix_names
 *   25 noms de la Matrice pour purchased servers:
 *   neo, trinity, morpheus, oracle, tank, dozer, mouse, cypher,
 *   apoc, switch, zion, sentinel, merovingian, keymaker, architect,
 *   seraph, persephone, nebuchadnezzar, logos, vigilant, osiris,
 *   agent-smith, construct, red-pill, white-rabbit
 * 
 * @workflow
 *   1. Vérifie argent disponible
 *   2. Si < 25 servers ET argent > 55k → Achète server 8GB
 *   3. Pour chaque server existant → Upgrade si argent suffisant
 *   4. Déploie workers après achat/upgrade
 *   5. Si 25 servers × MAX_RAM → Auto-stop
 *   6. Sleep → recommence
 * 
 * @upgrade_path
 *   8GB → 16GB → 32GB → 64GB → 128GB → 256GB → 512GB → 1TB
 * 
 * @changelog
 *   v0.3.2 - 2025-01-XX - HOTFIX: MAX_RAM constant added
 *   v0.3.1 - 2025-01-XX - HOTFIX: Auto-stop quand tous serveurs maxés
 *   v0.2.0 - 2025-01-XX - G.H.O.S.T. v0.2.0 Trinity Matrix
 *            - NEW: Auto-achat purchased servers
 *            - 25 noms Matrix stylés
 *            - Upgrade automatique progressif
 *            - Déploiement workers post-action
 *            - Cycle 2 minutes (configurable)
 */

import { StateManager } from "/lib/state-manager.js";
import { Debug } from "/lib/debug.js";

const DEFAULT_INTERVAL = 120000; // 2 minutes
const DEFAULT_DEBUG = 1;

const MAX_SERVERS = 25;
const MIN_RAM = 8; // GB minimum purchase
const MAX_RAM = 1024; // GB maximum upgrade
const PURCHASE_COST_8GB = 55000;

// Matrix-themed server names (25 total)
const MATRIX_NAMES = [
    "neo", "trinity", "morpheus", "oracle", "tank",
    "dozer", "mouse", "cypher", "apoc", "switch",
    "zion", "sentinel", "merovingian", "keymaker", "architect",
    "seraph", "persephone", "nebuchadnezzar", "logos", "vigilant",
    "osiris", "agent-smith", "construct", "red-pill", "white-rabbit"
];

// Upgrade path (in GB)
const UPGRADE_PATH = [8, 16, 32, 64, 128, 256, 512, 1024];

/** @param {NS} ns */
export async function main(ns) {
    // ═══════════════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════════════
    const debugLevel = parseInt(ns.args[ns.args.indexOf("--debug") + 1]) || DEFAULT_DEBUG;
    const interval = parseInt(ns.args[ns.args.indexOf("--interval") + 1]) || DEFAULT_INTERVAL;
    
    const debug = new Debug(ns, debugLevel);
    const stateMgr = new StateManager(ns);
    
    debug.header("💻 SERVER MANAGER v0.2.0 - MATRIX");
    debug.normal("");
    debug.normal(`🔒 Protection: Exception global-kill`);
    debug.normal(`⏱️  Cycle interval: ${interval/1000}s`);
    debug.normal(`🐛 Debug level: ${debug.getLevelName()}`);
    debug.normal("");
    
    debug.toastInfo("Server Manager daemon activé");
    
    let cycle = 0;
    
    // ═══════════════════════════════════════════════════════════════════
    // MAIN LOOP
    // ═══════════════════════════════════════════════════════════════════
    while (true) {
        cycle++;
        const startTime = debug.startTimer();
        
        if (debugLevel >= Debug.VERBOSE) {
            debug.clear();
            debug.header("💻 SERVER MANAGER - MATRIX");
        }
        
        debug.normal(`📊 Cycle: ${cycle}`);
        debug.normal(`⏰ Time: ${new Date().toLocaleTimeString()}`);
        debug.normal("");
        
        const money = ns.getServerMoneyAvailable("home");
        const purchasedServers = ns.getPurchasedServers();
        
        debug.money(money);
        debug.normal(`💻 Purchased servers: ${purchasedServers.length}/${MAX_SERVERS}`);
        debug.normal("");
        
        let actionsThisCycle = 0;
        
        // ═══════════════════════════════════════════════════════════
        // STEP 1: BUY NEW SERVERS (if money available and < 25)
        // ═══════════════════════════════════════════════════════════
        if (purchasedServers.length < MAX_SERVERS && money > PURCHASE_COST_8GB) {
            debug.verbose("🛒 Checking for server purchase...");
            
            const nextName = getNextServerName(ns, debug);
            if (nextName) {
                const cost = ns.getPurchasedServerCost(MIN_RAM);
                
                if (money > cost) {
                    const hostname = ns.purchaseServer(nextName, MIN_RAM);
                    
                    if (hostname) {
                        actionsThisCycle++;
                        debug.normal(`✅ Purchased: ${hostname} (${MIN_RAM}GB)`);
                        debug.toastSuccess(`Server ${hostname} purchased!`);
                        
                        // Deploy workers immediately
                        await deployWorkersOnServer(ns, hostname, debug);
                    } else {
                        debug.verbose("   ⚠️  Purchase failed");
                    }
                } else {
                    debug.ultra(`   💰 Need $${ns.formatNumber(cost - money)} more`);
                }
            }
        } else {
            debug.ultra("🛒 No purchase needed (max servers or insufficient funds)");
        }
        
        // ═══════════════════════════════════════════════════════════
        // STEP 2: UPGRADE EXISTING SERVERS
        // ═══════════════════════════════════════════════════════════
        debug.verbose("⬆️  Checking for upgrades...");
        
        let allMaxed = true;  // v0.3.1: Track if all servers are maxed
        
        for (const server of purchasedServers) {
            const currentRam = ns.getServerMaxRam(server);
            const nextRam = getNextUpgrade(currentRam);
            
            if (nextRam) {
                allMaxed = false;  // v0.3.1: At least one server can be upgraded
                const upgradeCost = ns.getPurchasedServerUpgradeCost(server, nextRam);
                
                if (upgradeCost > 0 && ns.getServerMoneyAvailable("home") > upgradeCost) {
                    const success = ns.upgradePurchasedServer(server, nextRam);
                    
                    if (success) {
                        actionsThisCycle++;
                        debug.normal(`⬆️  Upgraded: ${server} (${currentRam}GB → ${nextRam}GB)`);
                        debug.toastSuccess(`${server} upgraded to ${nextRam}GB`);
                        
                        // Redeploy workers with more threads
                        await deployWorkersOnServer(ns, server, debug);
                    }
                }
            } else {
                debug.ultra(`   ${server}: Already maxed (${currentRam}GB)`);
            }
        }
        
        if (actionsThisCycle === 0) {
            debug.verbose("   No upgrades available this cycle");
        }
        
        // ═══════════════════════════════════════════════════════════
        // v0.3.1: AUTO-STOP when all servers maxed
        // ═══════════════════════════════════════════════════════════
        if (purchasedServers.length === MAX_SERVERS && allMaxed) {
            debug.normal("");
            debug.separator();
            debug.normal("🎉 ALL SERVERS MAXED OUT!");
            debug.normal(`   ${MAX_SERVERS} servers × ${MAX_RAM}GB = ${ns.formatRam(MAX_SERVERS * MAX_RAM)}`);
            debug.normal("");
            debug.normal("💤 Server Manager mission complete - Shutting down...");
            debug.separator();
            debug.toastSuccess("All Matrix servers maxed! Manager stopping.");
            break;  // Exit while loop
        }
        
        debug.normal("");
        
        // ═══════════════════════════════════════════════════════════
        // CYCLE COMPLETE
        // ═══════════════════════════════════════════════════════════
        const elapsed = debug.endTimer(startTime, "Server manager cycle", Debug.VERBOSE);
        
        debug.normal(`📊 Actions this cycle: ${actionsThisCycle}`);
        debug.normal(`⏳ Next cycle in ${interval/1000}s...`);
        debug.normal("");
        
        await ns.sleep(interval);
    }
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER: GET NEXT SERVER NAME
// ═══════════════════════════════════════════════════════════════════════
function getNextServerName(ns, debug) {
    const existingServers = ns.getPurchasedServers();
    
    for (const name of MATRIX_NAMES) {
        if (!existingServers.includes(name)) {
            debug.ultra(`   Next available name: ${name}`);
            return name;
        }
    }
    
    debug.verbose("   All Matrix names used");
    return null;
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER: GET NEXT UPGRADE
// ═══════════════════════════════════════════════════════════════════════
function getNextUpgrade(currentRam) {
    for (const ram of UPGRADE_PATH) {
        if (ram > currentRam) {
            return ram;
        }
    }
    return null; // Already at max
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER: DEPLOY WORKERS ON SERVER
// ═══════════════════════════════════════════════════════════════════════
async function deployWorkersOnServer(ns, hostname, debug) {
    debug.verbose(`   📦 Deploying workers on ${hostname}...`);
    
    // Load best target
    const stateMgr = new StateManager(ns);
    const bestTarget = stateMgr.load("best-target.json");
    const target = bestTarget?.target || "n00dles";
    
    // Copy workers
    const workers = ["/workers/hack.js", "/workers/grow.js", "/workers/weaken.js"];
    await ns.scp(workers, hostname, "home");
    
    // Kill existing processes
    ns.killall(hostname);
    
    // Calculate threads
    const maxRam = ns.getServerMaxRam(hostname);
    const workerRam = 1.75;
    const totalThreads = Math.floor(maxRam / workerRam);
    
    if (totalThreads === 0) {
        debug.ultra(`   ⚠️  ${hostname}: Not enough RAM`);
        return;
    }
    
    // Strategy: 50% weaken, 30% grow, 20% hack
    const weakenThreads = Math.floor(totalThreads * 0.5);
    const growThreads = Math.floor(totalThreads * 0.3);
    const hackThreads = Math.floor(totalThreads * 0.2);
    
    // Launch workers
    if (weakenThreads > 0) {
        ns.exec("/workers/weaken.js", hostname, weakenThreads, target);
    }
    
    if (growThreads > 0) {
        ns.exec("/workers/grow.js", hostname, growThreads, target);
    }
    
    if (hackThreads > 0) {
        ns.exec("/workers/hack.js", hostname, hackThreads, target);
    }
    
    debug.ultra(`   ✅ ${hostname}: ${totalThreads} threads deployed`);
}
