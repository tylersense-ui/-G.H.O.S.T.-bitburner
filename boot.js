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
 * @file        /boot.js
 * @version     0.3.3.7
 * @author      Claude (Godlike AI Operator)
 * @description Point d'entrée G.H.O.S.T. Framework
 *              BOOTSTRAP MULTI-SERVEUR: Utilise n00dles pour orchestrer!
 *              home reste libre (8GB) pendant tout le bootstrap
 * 
 * @usage
 *   run /boot.js
 *   run /boot.js --debug 2
 * 
 * @commands
 *   --debug <0-3>   Niveau de verbosité (défaut: 1)
 * 
 * @architecture_v0.3.3.7
 *   BOOTSTRAP MULTI-SERVEUR:
 *   
 *   boot.js (home 4.40GB):
 *     → Copie bootstrap.js sur n00dles
 *     → Lance bootstrap.js sur n00dles
 *     → EXIT (libère home → 8GB libres!)
 *   
 *   bootstrap.js (n00dles ~2GB):
 *     → Lance spider sur n00dles
 *     → Lance target-selector sur home (8GB libres ✅)
 *     → Lance deploy-workers sur home (8GB libres ✅)
 *     → Lance auto-spider sur home (8GB libres ✅)
 *     → EXIT n00dles
 *   
 *   auto-spider.js (home, DAEMON ∞):
 *     → Cycle 1: SKIP (workers déjà actifs!)
 *     → Cycle 2+: quantum sync normal
 * 
 * @innovation_v0.3.3.7
 *   - Bootstrap sur n00dles = orchestre tout
 *   - Home toujours 8GB libres pendant bootstrap
 *   - Target + Deploy + Auto-spider ont chacun 8GB
 *   - Workers déjà actifs avant auto-spider
 *   - Architecture multi-serveur scalable
 * 
 * @changelog
 *   v0.3.3.7 - 2026-03-14 - BOOTSTRAP MULTI-SERVEUR
 *            - Bootstrap sur n00dles (orchestre)
 *            - Home toujours 8GB libres
 *            - Architecture multi-serveur
 *   v0.3.3.6 - 2026-03-14 - SPAWN CHAIN PROPRE
 */

/** @param {NS} ns */
export async function main(ns) {
    // ═══════════════════════════════════════════════════════════════════
    // HEADER
    // ═══════════════════════════════════════════════════════════════════
    ns.ui.openTail();
    ns.clearLog();
    
    ns.print("╔════════════════════════════════════════════════════════╗");
    ns.print("║  ██████╗ ██╗  ██╗ ██████╗ ███████╗████████╗          ║");
    ns.print("║ ██╔════╝ ██║  ██║██╔═══██╗██╔════╝╚══██╔══╝          ║");
    ns.print("║ ██║  ███╗███████║██║   ██║███████╗   ██║             ║");
    ns.print("║ ██║   ██║██╔══██║██║   ██║╚════██║   ██║             ║");
    ns.print("║ ╚██████╔╝██║  ██║╚██████╔╝███████║   ██║             ║");
    ns.print("║  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝             ║");
    ns.print("║                                                        ║");
    ns.print("║  Godlike Heuristic Operator & Strategy Toolkit        ║");
    ns.print("║  v0.3.3.7 - BOOTSTRAP MULTI-SERVEUR                   ║");
    ns.print("╚════════════════════════════════════════════════════════╝");
    ns.print("");
    ns.print("🚀 Boot: BOOTSTRAP MULTI-SERVEUR (uses n00dles!)");
    ns.print("⚡ Bootstrap: Orchestrates on n00dles (frees home RAM)");
    ns.print("🎯 Home: Always 8GB free during bootstrap");
    ns.print("");
    
    await ns.sleep(1000);
    
    // ═══════════════════════════════════════════════════════════════════
    // FIND BOOTSTRAP SERVER (n00dles or fallback)
    // ═══════════════════════════════════════════════════════════════════
    const bootstrapServer = findBootstrapServer(ns);
    
    if (!bootstrapServer) {
        ns.print("❌ No suitable bootstrap server found!");
        ns.print("   Need: rooted server with 4GB+ RAM");
        ns.toast("⚠️ Bootstrap failed: no server", "error");
        return;
    }
    
    ns.print(`✅ Bootstrap server: ${bootstrapServer}`);
    ns.print(`   RAM: ${ns.formatRam(ns.getServerMaxRam(bootstrapServer))}`);
    ns.print("");
    
    await ns.sleep(500);
    
    // ═══════════════════════════════════════════════════════════════════
    // COPY BOOTSTRAP TO SERVER
    // ═══════════════════════════════════════════════════════════════════
    ns.print("📦 Copying bootstrap.js to " + bootstrapServer + "...");
    
    const success = await ns.scp("/core/bootstrap.js", bootstrapServer);
    
    if (!success) {
        ns.print("❌ Failed to copy bootstrap.js");
        ns.toast("⚠️ Bootstrap copy failed", "error");
        return;
    }
    
    ns.print("✅ Bootstrap copied");
    ns.print("");
    
    await ns.sleep(500);
    
    // ═══════════════════════════════════════════════════════════════════
    // LAUNCH BOOTSTRAP
    // ═══════════════════════════════════════════════════════════════════
    ns.print("═══════════════════════════════════════════════════════");
    ns.print("BOOTSTRAP MULTI-SERVEUR:");
    ns.print("");
    ns.print(`   1. Boot copies bootstrap.js → ${bootstrapServer}`);
    ns.print(`   2. Boot launches bootstrap on ${bootstrapServer}`);
    ns.print("   3. Boot exits → home has 8GB free!");
    ns.print("");
    ns.print(`   4. Bootstrap (on ${bootstrapServer}) orchestrates:`);
    ns.print("      → Spider (root network)");
    ns.print("      → Target-selector (find best, 8GB free ✅)");
    ns.print("      → Deploy-workers (launch workers, 8GB free ✅)");
    ns.print("      → Auto-spider (daemon, 8GB free ✅)");
    ns.print("");
    ns.print("═══════════════════════════════════════════════════════");
    ns.print("");
    
    await ns.sleep(1000);
    
    // Parse debug level
    const debugArg = ns.args.find(arg => arg === "--debug");
    const debugLevel = debugArg ? parseInt(ns.args[ns.args.indexOf("--debug") + 1]) : 1;
    
    const bootstrapArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    
    ns.print(`🚀 Launching bootstrap on ${bootstrapServer}...`);
    if (bootstrapArgs.length > 0) {
        ns.print(`   Args: ${bootstrapArgs.join(" ")}`);
    }
    ns.print("");
    
    const pid = ns.exec("/core/bootstrap.js", bootstrapServer, 1, ...bootstrapArgs);
    
    if (pid === 0) {
        ns.print("❌ Failed to launch bootstrap!");
        ns.toast("⚠️ Bootstrap launch failed", "error");
        return;
    }
    
    ns.print(`✅ Bootstrap launched (PID: ${pid} on ${bootstrapServer})`);
    ns.print("");
    
    await ns.sleep(500);
    
    // ═══════════════════════════════════════════════════════════════════
    // BOOT EXIT
    // ═══════════════════════════════════════════════════════════════════
    ns.print("═══════════════════════════════════════════════════════");
    ns.print("🎉 G.H.O.S.T. v0.3.3.7 - BOOTSTRAP RUNNING!");
    ns.print("");
    ns.print("📋 EXECUTION:");
    ns.print("   1. Boot exits NOW → home has 8GB free");
    ns.print(`   2. Bootstrap (${bootstrapServer}) orchestrates everything`);
    ns.print("   3. Target/Deploy/Auto-spider all have 8GB available");
    ns.print("   4. Workers active, auto-spider quantum sync ∞");
    ns.print("");
    ns.print("💡 Tail bootstrap to watch:");
    ns.print(`   tail /core/bootstrap.js --server ${bootstrapServer}`);
    ns.print("═══════════════════════════════════════════════════════");
    
    ns.toast("🎉 G.H.O.S.T. v0.3.3.7 bootstrapping!", "success");
    
    await ns.sleep(2000);
    
    // EXIT → libère home (8GB libres!)
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Find suitable bootstrap server
 * Priorité: n00dles, puis autre serveur rooté avec 4GB+ RAM
 * @param {NS} ns
 * @returns {string|null} Hostname ou null
 */
function findBootstrapServer(ns) {
    // Try n00dles first (early game always available)
    if (ns.hasRootAccess("n00dles")) {
        const ram = ns.getServerMaxRam("n00dles");
        if (ram >= 4) return "n00dles";
    }
    
    // Scan all servers for fallback
    const servers = scanNetwork(ns);
    
    for (const server of servers) {
        if (server === "home") continue;
        if (!ns.hasRootAccess(server)) continue;
        
        const ram = ns.getServerMaxRam(server);
        if (ram >= 4) return server;
    }
    
    return null;
}

/**
 * Scan network (BFS)
 * @param {NS} ns
 * @returns {Array<string>}
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
            if (!visited.has(neighbor)) queue.push(neighbor);
        }
    }
    
    return servers;
}
