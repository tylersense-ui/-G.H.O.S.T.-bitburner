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
 * @version     0.3.3.6
 * @author      Claude (Godlike AI Operator)
 * @description Point d'entrée G.H.O.S.T. Framework
 *              SPAWN CHAIN: boot → target → auto-spider
 *              Ultra-clean, pas de bloat, juste ce qui marche
 * 
 * @usage
 *   run /boot.js
 *   run /boot.js --debug 2
 * 
 * @commands
 *   --debug <0-3>   Niveau de verbosité (défaut: 1)
 * 
 * @architecture_v0.3.3.6
 *   SPAWN CHAIN:
 *   
 *   boot.js (one-shot):
 *     → Spawn target-selector.js
 *     → EXIT (libère 4.40GB)
 *   
 *   target-selector.js (one-shot):
 *     → Créé best-target.json (avec 8GB libres!)
 *     → Spawn auto-spider.js
 *     → EXIT (libère 5.70GB)
 *   
 *   auto-spider.js (DAEMON ∞):
 *     → Cycle 1: spider + deploy (target déjà fait!)
 *     → Cycle 2+: spider + target + deploy + quantum sync
 *     → BOUCLE INFINIE jusqu'à kill
 * 
 * @innovation_v0.3.3.6
 *   - Boot ultra-simple: spawne target, c'est tout
 *   - Target a 8GB libres (5.70GB requis ✅)
 *   - Auto-spider a 8GB libres (5.85GB requis ✅)
 *   - Spawn chain propre: boot → target → auto-spider
 *   - Pas de server-manager (ridicule level 1)
 *   - Pas de telemetry (manual)
 *   - Pas de blackbox (manual)
 * 
 * @changelog
 *   v0.3.3.6 - 2026-03-14 - SPAWN CHAIN PROPRE
 *            - Boot spawne UNIQUEMENT target-selector
 *            - Target spawne auto-spider après création best-target.json
 *            - Pas de server-manager (ridicule)
 *            - Architecture propre: boot → target → auto-spider
 *   v0.3.3.5 - 2026-03-14 - ns.spawn() FIX
 *   v0.3.3.4 - 2026-03-14 - ULTRA-SIMPLE BOOT
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
    ns.print("║  v0.3.3.6 - SPAWN CHAIN (CLEAN)                       ║");
    ns.print("╚════════════════════════════════════════════════════════╝");
    ns.print("");
    ns.print("🚀 Boot: SPAWN CHAIN (boot → target → auto-spider)");
    ns.print("⚡ Target: Creates best-target.json (8GB free)");
    ns.print("🕷️  Auto-Spider: DAEMON ∞ (quantum sync forever)");
    ns.print("");
    
    await ns.sleep(1000);
    
    // ═══════════════════════════════════════════════════════════════════
    // SPAWN TARGET-SELECTOR
    // ═══════════════════════════════════════════════════════════════════
    ns.print("═══════════════════════════════════════════════════════");
    ns.print("SPAWN CHAIN:");
    ns.print("");
    ns.print("   1. Boot.js spawns target-selector.js");
    ns.print("   2. Target finds best target → creates state file");
    ns.print("   3. Target spawns auto-spider.js");
    ns.print("   4. Auto-spider runs FOREVER (daemon)");
    ns.print("");
    ns.print("═══════════════════════════════════════════════════════");
    ns.print("");
    
    await ns.sleep(1000);
    
    // Parse debug level
    const debugArg = ns.args.find(arg => arg === "--debug");
    const debugLevel = debugArg ? parseInt(ns.args[ns.args.indexOf("--debug") + 1]) : 1;
    
    const targetArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    
    ns.print("🎯 Spawning target-selector.js...");
    if (targetArgs.length > 0) {
        ns.print(`   Args: ${targetArgs.join(" ")}`);
    }
    ns.print("");
    
    // Spawn target-selector (démarre APRÈS boot exit)
    ns.spawn("/core/target-selector.js", 1, ...targetArgs);
    
    // ═══════════════════════════════════════════════════════════════════
    // BOOT EXIT
    // ═══════════════════════════════════════════════════════════════════
    ns.print("═══════════════════════════════════════════════════════");
    ns.print("🎉 G.H.O.S.T. v0.3.3.6 - SPAWN CHAIN STARTED!");
    ns.print("");
    ns.print("📋 EXECUTION ORDER:");
    ns.print("   1. Boot exits NOW → frees 4.40GB");
    ns.print("   2. Target-selector starts → uses 5.70GB (fits!)");
    ns.print("   3. Target creates best-target.json");
    ns.print("   4. Target spawns auto-spider → uses 5.85GB (fits!)");
    ns.print("   5. Auto-spider quantum sync FOREVER");
    ns.print("");
    ns.print("💰 Clean architecture, zero bloat");
    ns.print("🔄 Auto-spider runs until kill");
    ns.print("═══════════════════════════════════════════════════════");
    
    ns.toast("🎉 G.H.O.S.T. v0.3.3.6 spawning!", "success");
    
    await ns.sleep(2000);
    
    // EXIT → libère 4.40GB → target-selector démarre!
}
