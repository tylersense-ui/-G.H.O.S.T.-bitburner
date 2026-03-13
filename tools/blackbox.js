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
 * @file        /tools/blackbox.js
 * @version     0.1.0
 * @author      Claude (Godlike AI Operator)
 * @description Solveur automatique de contrats de code (.cct)
 *              Scanne le réseau entier, détecte tous les contrats,
 *              et les résout automatiquement avec algorithmes optimisés.
 * 
 * @usage
 *   run /tools/blackbox.js
 *   run /tools/blackbox.js --debug 2
 *   run /tools/blackbox.js --debug 3 --interval 60000
 * 
 * @commands
 *   --debug <0-3>     Niveau de verbosité (0=silent, 1=normal, 2=verbose, 3=ultra)
 *   --interval <ms>   Intervalle de scan en millisecondes (défaut: 30000)
 * 
 * @changelog
 *   v0.1.0 - 2025-01-XX - Initial G.H.O.S.T. release
 *            - Adapté depuis Bible du Hacker v2.0
 *            - Ajout système DEBUG multi-niveaux (0-3)
 *            - Intégration ns.tail() + ns.toast() systématique
 *            - Couleurs et icônes pour meilleure lisibilité
 *            - Support 8 types de contrats algorithmiques
 *            - Scan BFS complet du réseau toutes les 30s
 */

// ═══════════════════════════════════════════════════════════════════════
// DEBUG LEVELS
// ═══════════════════════════════════════════════════════════════════════
const DEBUG_SILENT = 0;   // Toasts succès uniquement
const DEBUG_NORMAL = 1;   // Infos importantes (défaut)
const DEBUG_VERBOSE = 2;  // Détails + metrics
const DEBUG_ULTRA = 3;    // Tout (debug complet)

// ═══════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════
const DEFAULT_INTERVAL = 30000; // 30s entre chaque scan
const DEFAULT_DEBUG = DEBUG_NORMAL;

/** @param {NS} ns */
export async function main(ns) {
    // ═══════════════════════════════════════════════════════════════════
    // INITIALISATION
    // ═══════════════════════════════════════════════════════════════════
    ns.disableLog("ALL");
    ns.tail();
    
    // Parse arguments
    const debugLevel = parseInt(ns.args[ns.args.indexOf("--debug") + 1]) || DEFAULT_DEBUG;
    const scanInterval = parseInt(ns.args[ns.args.indexOf("--interval") + 1]) || DEFAULT_INTERVAL;
    
    // ═══════════════════════════════════════════════════════════════════
    // HEADER DISPLAY
    // ═══════════════════════════════════════════════════════════════════
    printHeader(ns, debugLevel, scanInterval);
    
    // Toast de démarrage
    ns.toast("🎯 BlackBox Solver activé !", "info", 3000);
    
    // ═══════════════════════════════════════════════════════════════════
    // MAIN LOOP
    // ═══════════════════════════════════════════════════════════════════
    let cycle = 0;
    let totalSolved = 0;
    let totalReward = 0;
    
    while (true) {
        cycle++;
        const startTime = Date.now();
        
        if (debugLevel >= DEBUG_VERBOSE) {
            ns.clearLog();
            printHeader(ns, debugLevel, scanInterval);
        }
        
        debugLog(ns, debugLevel, DEBUG_NORMAL, `\n🔄 Cycle #${cycle} - ${new Date().toLocaleTimeString()}`);
        
        // ═══════════════════════════════════════════════════════════
        // NETWORK SCAN (BFS)
        // ═══════════════════════════════════════════════════════════
        debugLog(ns, debugLevel, DEBUG_VERBOSE, "🌐 Scanning network...");
        const servers = scanNetwork(ns, debugLevel);
        debugLog(ns, debugLevel, DEBUG_VERBOSE, `   Found ${servers.length} servers`);
        
        // ═══════════════════════════════════════════════════════════
        // CONTRACT SCAN & SOLVE
        // ═══════════════════════════════════════════════════════════
        let cycleContracts = 0;
        let cycleSolved = 0;
        
        for (let i = 0; i < servers.length; i++) {
            const host = servers[i];
            const contracts = ns.ls(host, ".cct");
            
            if (contracts.length > 0) {
                cycleContracts += contracts.length;
                debugLog(ns, debugLevel, DEBUG_VERBOSE, `\n📋 [${host}] Found ${contracts.length} contract(s)`);
            }
            
            for (const file of contracts) {
                const result = await solveContract(ns, host, file, debugLevel);
                
                if (result.success) {
                    cycleSolved++;
                    totalSolved++;
                    
                    // Toast succès (tous niveaux sauf SILENT)
                    if (debugLevel > DEBUG_SILENT) {
                        ns.toast(`✅ Contrat résolu sur ${host} !`, "success", 5000);
                    }
                    
                    debugLog(ns, debugLevel, DEBUG_NORMAL, 
                        `✅ [${host}] ${result.type} RÉSOLU ! Reward: ${result.reward}`);
                    
                    if (debugLevel >= DEBUG_ULTRA) {
                        debugLog(ns, debugLevel, DEBUG_ULTRA, 
                            `   Solution: ${JSON.stringify(result.solution)}`);
                    }
                } else {
                    debugLog(ns, debugLevel, DEBUG_VERBOSE, 
                        `⚠️  [${host}] ${result.type} - Non résolu (type inconnu ou erreur)`);
                }
            }
        }
        
        // ═══════════════════════════════════════════════════════════
        // CYCLE STATS
        // ═══════════════════════════════════════════════════════════
        const elapsed = Date.now() - startTime;
        
        if (cycleContracts > 0) {
            debugLog(ns, debugLevel, DEBUG_NORMAL, 
                `\n📊 Cycle Stats: ${cycleSolved}/${cycleContracts} solved in ${elapsed}ms`);
        } else {
            debugLog(ns, debugLevel, DEBUG_VERBOSE, 
                `\n📊 No contracts found this cycle (${elapsed}ms)`);
        }
        
        debugLog(ns, debugLevel, DEBUG_NORMAL, 
            `💰 Total Solved: ${totalSolved} | Next scan in ${scanInterval/1000}s`);
        
        // ═══════════════════════════════════════════════════════════
        // SLEEP
        // ═══════════════════════════════════════════════════════════
        await ns.sleep(scanInterval);
    }
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER: NETWORK SCAN (BFS)
// ═══════════════════════════════════════════════════════════════════════
/**
 * Scanne tout le réseau en BFS
 * @param {NS} ns
 * @param {number} debugLevel
 * @returns {string[]} Liste des serveurs
 */
function scanNetwork(ns, debugLevel) {
    const servers = ["home"];
    const visited = new Set(["home"]);
    
    for (let i = 0; i < servers.length; i++) {
        const host = servers[i];
        const neighbors = ns.scan(host);
        
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                servers.push(neighbor);
                
                if (debugLevel >= DEBUG_ULTRA) {
                    debugLog(ns, debugLevel, DEBUG_ULTRA, 
                        `   🔗 Discovered: ${neighbor} (via ${host})`);
                }
            }
        }
    }
    
    return servers;
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER: SOLVE CONTRACT
// ═══════════════════════════════════════════════════════════════════════
/**
 * Résout un contrat
 * @param {NS} ns
 * @param {string} host
 * @param {string} file
 * @param {number} debugLevel
 * @returns {Object} Résultat {success, type, reward, solution}
 */
async function solveContract(ns, host, file, debugLevel) {
    try {
        const type = ns.codingcontract.getContractType(file, host);
        const data = ns.codingcontract.getData(file, host);
        
        if (debugLevel >= DEBUG_ULTRA) {
            debugLog(ns, debugLevel, DEBUG_ULTRA, 
                `   🔍 [${host}/${file}] Type: ${type}`);
            debugLog(ns, debugLevel, DEBUG_ULTRA, 
                `   📊 Data: ${JSON.stringify(data)}`);
        }
        
        const solution = solve(type, data);
        
        if (solution === null) {
            return { 
                success: false, 
                type: type, 
                reward: null, 
                solution: null 
            };
        }
        
        const reward = ns.codingcontract.attempt(solution, file, host, { returnReward: true });
        
        if (reward) {
            return { 
                success: true, 
                type: type, 
                reward: reward, 
                solution: solution 
            };
        } else {
            // Tentative échouée (mauvaise solution)
            if (debugLevel >= DEBUG_VERBOSE) {
                debugLog(ns, debugLevel, DEBUG_VERBOSE, 
                    `   ❌ [${host}/${file}] Solution incorrecte !`);
            }
            return { 
                success: false, 
                type: type, 
                reward: null, 
                solution: solution 
            };
        }
        
    } catch (error) {
        if (debugLevel >= DEBUG_VERBOSE) {
            debugLog(ns, debugLevel, DEBUG_VERBOSE, 
                `   ⚠️  [${host}/${file}] Error: ${error}`);
        }
        return { 
            success: false, 
            type: "UNKNOWN", 
            reward: null, 
            solution: null 
        };
    }
}

// ═══════════════════════════════════════════════════════════════════════
// SOLVE ALGORITHMS (from Bible du Hacker v2.0)
// ═══════════════════════════════════════════════════════════════════════
/**
 * Résout un contrat selon son type
 * @param {string} type - Type de contrat
 * @param {any} data - Données du contrat
 * @returns {any} Solution ou null si type inconnu
 */
function solve(type, data) {
    switch (type) {
        // ═══════════════════════════════════════════════════════════
        // MATH & ALGORITHMS
        // ═══════════════════════════════════════════════════════════
        case "Find Largest Prime Factor": {
            let n = data;
            let f = 2;
            while (f * f <= n) {
                if (n % f === 0) {
                    n /= f;
                } else {
                    f++;
                }
            }
            return n;
        }
        
        case "Subarray with Maximum Sum": {
            // Kadane's Algorithm
            let maxSum = data[0];
            let currentSum = data[0];
            for (let i = 1; i < data.length; i++) {
                currentSum = Math.max(data[i], currentSum + data[i]);
                maxSum = Math.max(maxSum, currentSum);
            }
            return maxSum;
        }
        
        case "Total Ways to Sum": {
            // Dynamic Programming
            let ways = [1].concat(Array(data).fill(0));
            for (let i = 1; i < data; i++) {
                for (let j = i; j <= data; j++) {
                    ways[j] += ways[j - i];
                }
            }
            return ways[data];
        }
        
        // ═══════════════════════════════════════════════════════════
        // STOCK TRADING
        // ═══════════════════════════════════════════════════════════
        case "Algorithmic Stock Trader I": {
            // 1 transaction max
            let profit = 0;
            let minPrice = data[0];
            for (let price of data) {
                minPrice = Math.min(minPrice, price);
                profit = Math.max(profit, price - minPrice);
            }
            return profit;
        }
        
        case "Algorithmic Stock Trader II": {
            // Transactions illimitées
            let profit = 0;
            for (let i = 1; i < data.length; i++) {
                if (data[i] > data[i - 1]) {
                    profit += data[i] - data[i - 1];
                }
            }
            return profit;
        }
        
        // ═══════════════════════════════════════════════════════════
        // STRING & NETWORKING
        // ═══════════════════════════════════════════════════════════
        case "Generate IP Addresses": {
            let ips = [];
            for (let a = 1; a <= 3; a++) {
                for (let b = 1; b <= 3; b++) {
                    for (let c = 1; c <= 3; c++) {
                        for (let d = 1; d <= 3; d++) {
                            if (a + b + c + d === data.length) {
                                let parts = [
                                    data.slice(0, a),
                                    data.slice(a, a + b),
                                    data.slice(a + b, a + b + c),
                                    data.slice(a + b + c)
                                ];
                                
                                if (parts.every(p => parseInt(p) <= 255 && (p === "0" || p[0] !== "0"))) {
                                    ips.push(parts.join("."));
                                }
                            }
                        }
                    }
                }
            }
            return ips;
        }
        
        // ═══════════════════════════════════════════════════════════
        // ENCRYPTION
        // ═══════════════════════════════════════════════════════════
        case "Encryption I: Caesar Cipher": {
            let shift = data[1] % 26;
            return data[0].replace(/[A-Z]/g, c => 
                String.fromCharCode((c.charCodeAt(0) - 65 - shift + 26) % 26 + 65)
            );
        }
        
        case "Encryption II: Vigenère Cipher": {
            let key = data[1];
            let idx = 0;
            return data[0].replace(/[A-Z]/g, c => {
                let shift = key[idx++ % key.length].charCodeAt(0) - 65;
                return String.fromCharCode((c.charCodeAt(0) - 65 + shift) % 26 + 65);
            });
        }
        
        // ═══════════════════════════════════════════════════════════
        // UNKNOWN TYPE
        // ═══════════════════════════════════════════════════════════
        default:
            return null;
    }
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER: DEBUG LOG
// ═══════════════════════════════════════════════════════════════════════
/**
 * Log conditionnel selon niveau debug
 * @param {NS} ns
 * @param {number} currentLevel - Niveau debug actuel
 * @param {number} requiredLevel - Niveau requis pour afficher
 * @param {string} message
 */
function debugLog(ns, currentLevel, requiredLevel, message) {
    if (currentLevel >= requiredLevel) {
        ns.print(message);
    }
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER: PRINT HEADER
// ═══════════════════════════════════════════════════════════════════════
/**
 * Affiche header du script
 * @param {NS} ns
 * @param {number} debugLevel
 * @param {number} scanInterval
 */
function printHeader(ns, debugLevel, scanInterval) {
    ns.print("╔═══════════════════════════════════════════════════════════╗");
    ns.print("║   🎯 G.H.O.S.T. BLACKBOX CONTRACT SOLVER v0.1.0          ║");
    ns.print("╚═══════════════════════════════════════════════════════════╝");
    ns.print("");
    ns.print(`⚙️  Config:`);
    ns.print(`   Debug Level: ${debugLevel} (${getDebugName(debugLevel)})`);
    ns.print(`   Scan Interval: ${scanInterval/1000}s`);
    ns.print("");
}

/**
 * Nom du niveau debug
 * @param {number} level
 * @returns {string}
 */
function getDebugName(level) {
    switch(level) {
        case 0: return "SILENT";
        case 1: return "NORMAL";
        case 2: return "VERBOSE";
        case 3: return "ULTRA";
        default: return "UNKNOWN";
    }
}
