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
 * @version     0.3.3.5
 * @author      Claude (Godlike AI Operator)
 * @description Point d'entrée G.H.O.S.T. Framework
 *              ns.spawn() FIX: Lance auto-spider APRÈS boot exit!
 *              Boot termine → libère 4.40GB → auto-spider démarre
 * 
 * @usage
 *   run /boot.js
 *   run /boot.js --debug 2
 * 
 * @commands
 *   --debug <0-3>   Niveau de verbosité (défaut: 1)
 * 
 * @architecture_v0.3.3.5
 *   Boot.js (4.40GB - mais TERMINE avant spawn!):
 *     1. Affiche header
 *     2. ns.spawn("/core/auto-spider.js") ← Lance APRÈS exit!
 *     3. EXIT (libère 4.40GB)
 *   
 *   Auto-Spider démarre (avec 8GB libres!):
 *     - Cycle 1: spider + target + deploy + launch server-manager
 *     - Quantum sync...
 * 
 * @innovation_v0.3.3.5
 *   - ns.spawn() au lieu de ns.exec()
 *   - Boot termine AVANT auto-spider démarre
 *   - Auto-spider a 8GB libres (vs 2.15GB avant)
 *   - Résout définitivement problème RAM
 * 
 * @changelog
 *   v0.3.3.5 - 2026-03-14 - ns.spawn() FIX
 *            - ns.exec() → ns.spawn() (lance APRÈS exit)
 *            - Boot termine avant auto-spider démarre
 *            - Auto-spider a 8GB libres (définitif!)
 *   v0.3.3.4 - 2026-03-14 - ULTRA-SIMPLE BOOT
 *   v0.3.3.3 - 2026-03-14 - ULTRA-MINIMAL BOOT
 *   v0.3.3.2 - 2026-03-14 - EARLY GAME FIX
 *   v0.3.3.1 - 2026-03-14 - HOTFIX: ns.run → ns.exec
 *   v0.3.3 - 2026-03-14 - QUANTUM SYNC EDITION
 */

import { Debug, parseDebugLevel } from "/lib/debug.js";

const DEFAULT_DEBUG = 1;

/** @param {NS} ns */
export async function main(ns) {
    // ═══════════════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════════════
    const debugLevel = parseDebugLevel(ns.args, DEFAULT_DEBUG);
    const debug = new Debug(ns, debugLevel);
    
    ns.ui.openTail();
    debug.clear();
    
    // ═══════════════════════════════════════════════════════════════════
    // HEADER
    // ═══════════════════════════════════════════════════════════════════
    debug.normal("╔════════════════════════════════════════════════════════╗");
    debug.normal("║  ██████╗ ██╗  ██╗ ██████╗ ███████╗████████╗          ║");
    debug.normal("║ ██╔════╝ ██║  ██║██╔═══██╗██╔════╝╚══██╔══╝          ║");
    debug.normal("║ ██║  ███╗███████║██║   ██║███████╗   ██║             ║");
    debug.normal("║ ██║   ██║██╔══██║██║   ██║╚════██║   ██║             ║");
    debug.normal("║ ╚██████╔╝██║  ██║╚██████╔╝███████║   ██║             ║");
    debug.normal("║  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝             ║");
    debug.normal("║                                                        ║");
    debug.normal("║  Godlike Heuristic Operator & Strategy Toolkit        ║");
    debug.normal("║  v0.3.3.5 - ns.spawn() FIX                            ║");
    debug.normal("╚════════════════════════════════════════════════════════╝");
    debug.normal("");
    debug.normal("🚀 Boot: ns.spawn() (launches AFTER boot exits)");
    debug.normal("⚡ Auto-Spider: Will have 8GB free (not 2GB!)");
    debug.normal("🎯 Fix: Boot exits → RAM freed → auto-spider starts");
    debug.normal("");
    
    await ns.sleep(1000);
    
    // ═══════════════════════════════════════════════════════════════════
    // SPAWN AUTO-SPIDER (LANCE APRÈS BOOT EXIT!)
    // ═══════════════════════════════════════════════════════════════════
    debug.separator();
    debug.normal("📋 SPAWN QUEUE:");
    debug.normal("");
    debug.normal("   1. Auto-Spider (quantum sync)");
    debug.normal("      → Cycle 1: spider + target + deploy");
    debug.normal("      → Launch server-manager in cycle 1");
    debug.normal("      → Quantum sync cycles");
    debug.normal("");
    debug.normal("⚡ Boot will EXIT → free 4.40GB");
    debug.normal("⚡ Auto-Spider will START → use 5.85GB (fits in 8GB!)");
    debug.separator();
    debug.normal("");
    
    await ns.sleep(1000);
    
    // Prépare args pour auto-spider
    const autoSpiderArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    
    debug.normal("🚀 Spawning Auto-Spider...");
    debug.verbose(`   Args: ${autoSpiderArgs.join(" ") || "(none)"}`);
    debug.normal("");
    
    // ns.spawn() lance le script APRÈS que boot.js termine
    ns.spawn("/core/auto-spider.js", 1, ...autoSpiderArgs);
    
    // ═══════════════════════════════════════════════════════════════════
    // BOOT EXIT MESSAGE
    // ═══════════════════════════════════════════════════════════════════
    debug.separator();
    debug.normal("🎉 G.H.O.S.T. v0.3.3.5 - SPAWN SCHEDULED!");
    debug.normal("");
    debug.normal("📋 EXECUTION ORDER:");
    debug.normal("   1. Boot.js exits NOW → frees 4.40GB");
    debug.normal("   2. Auto-Spider starts → uses 5.85GB (fits!)");
    debug.normal("   3. Cycle 1: spider + target + deploy + server-mgr");
    debug.normal("   4. Quantum sync running");
    debug.normal("");
    debug.normal("⚡ RAM after boot exit: 8GB free");
    debug.normal("⚡ RAM after auto-spider start: 2.15GB free");
    debug.normal("⚡ RAM for target-selector: 2.15GB available");
    debug.normal("");
    debug.normal("💡 Auto-Spider will tail automatically");
    debug.normal("💡 Or run: tail /core/auto-spider.js");
    debug.separator();
    
    debug.toastSuccess("🎉 G.H.O.S.T. v0.3.3.5 spawning!");
    
    await ns.sleep(2000);
    
    // EXIT → libère 4.40GB → auto-spider démarre avec 8GB libres!
}
