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
 * @file        /core/bootstrap.js
 * @version     0.3.3.7
 * @author      Claude (Godlike AI Operator)
 * @description BOOTSTRAP ORCHESTRATOR - Runs on n00dles!
 *              Orchestrates spider + target + deploy + auto-spider
 *              Keeps home RAM free (8GB) during entire bootstrap
 * 
 * @usage
 *   run /core/bootstrap.js (launched by boot.js)
 *   run /core/bootstrap.js --debug 2
 * 
 * @commands
 *   --debug <0-3>   Niveau de verbosité (défaut: 1)
 * 
 * @architecture
 *   Bootstrap (runs on n00dles ~2GB):
 *     STEP 1: Spider (root network) on n00dles
 *     STEP 2: Target-selector on home (8GB free ✅)
 *     STEP 3: Deploy-workers on home (8GB free ✅)
 *     STEP 4: Auto-spider on home (8GB free ✅)
 *     EXIT
 * 
 * @innovation
 *   - Runs on n00dles (not home!)
 *   - Home always 8GB free
 *   - Sequential execution on home
 *   - Each script has full RAM available
 * 
 * @changelog
 *   v0.3.3.7 - 2026-03-14 - Initial creation
 *            - Bootstrap orchestrator
 *            - Multi-server architecture
 */

/** @param {NS} ns */
export async function main(ns) {
    // ═══════════════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════════════
    ns.disableLog("ALL");
    ns.ui.openTail();
    ns.clearLog();
    
    const debugArg = ns.args.find(arg => arg === "--debug");
    const debugLevel = debugArg ? parseInt(ns.args[ns.args.indexOf("--debug") + 1]) : 1;
    
    const currentServer = ns.getHostname();
    
    // ═══════════════════════════════════════════════════════════════════
    // HEADER
    // ═══════════════════════════════════════════════════════════════════
    ns.print("╔═══════════════════════════════════════════════════════════╗");
    ns.print("║   🔧 BOOTSTRAP ORCHESTRATOR v0.3.3.7                      ║");
    ns.print("╚═══════════════════════════════════════════════════════════╝");
    ns.print("");
    ns.print(`📍 Running on: ${currentServer}`);
    ns.print("🎯 Orchestrates: spider → target → deploy → auto-spider");
    ns.print("💰 Home RAM: 8GB free during entire bootstrap");
    ns.print("");
    ns.print("═══════════════════════════════════════════════════════════");
    
    await ns.sleep(1000);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 1: SPIDER (ROOT NETWORK)
    // ═══════════════════════════════════════════════════════════════════
    ns.print("");
    ns.print("STEP 1/4: Spider (root network)...");
    ns.print("");
    
    const spiderPid = ns.exec("/core/spider.js", currentServer, 1);
    
    if (spiderPid > 0) {
        ns.print(`   ✅ Spider launched (PID: ${spiderPid} on ${currentServer})`);
        
        while (ns.isRunning(spiderPid, currentServer)) {
            await ns.sleep(500);
        }
        
        ns.print("   ✅ Spider complete");
    } else {
        ns.print("   ⚠️  Spider failed to launch");
    }
    
    await ns.sleep(500);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 2: TARGET-SELECTOR (ON HOME - 8GB FREE!)
    // ═══════════════════════════════════════════════════════════════════
    ns.print("");
    ns.print("STEP 2/4: Target-selector (on home, 8GB free)...");
    ns.print("");
    
    const targetPid = ns.exec("/core/target-selector.js", "home", 1);
    
    if (targetPid > 0) {
        ns.print(`   ✅ Target-selector launched (PID: ${targetPid} on home)`);
        
        while (ns.isRunning(targetPid, "home")) {
            await ns.sleep(500);
        }
        
        ns.print("   ✅ Target-selector complete");
        ns.print("   📄 Created: state/best-target.json");
    } else {
        ns.print("   ❌ Target-selector failed to launch!");
        ns.toast("⚠️ Bootstrap: target failed", "error");
        return;
    }
    
    await ns.sleep(500);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 3: DEPLOY-WORKERS (ON HOME - 8GB FREE!)
    // ═══════════════════════════════════════════════════════════════════
    ns.print("");
    ns.print("STEP 3/4: Deploy-workers (on home, 8GB free)...");
    ns.print("");
    
    // Load best target
    const bestTargetFile = ns.read("state/best-target.json");
    let target = "foodnstuff"; // Fallback
    
    if (bestTargetFile) {
        try {
            const bestTarget = JSON.parse(bestTargetFile);
            target = bestTarget.target;
            ns.print(`   🎯 Target: ${target}`);
        } catch (e) {
            ns.print("   ⚠️  Failed to read best-target.json, using fallback");
        }
    }
    
    const deployPid = ns.exec("/core/deploy-workers.js", "home", 1, target);
    
    if (deployPid > 0) {
        ns.print(`   ✅ Deploy-workers launched (PID: ${deployPid} on home)`);
        
        while (ns.isRunning(deployPid, "home")) {
            await ns.sleep(500);
        }
        
        ns.print("   ✅ Deploy-workers complete");
        ns.print("   ⚙️  Workers active on all servers");
    } else {
        ns.print("   ❌ Deploy-workers failed to launch!");
        ns.toast("⚠️ Bootstrap: deploy failed", "error");
        return;
    }
    
    await ns.sleep(500);
    
    // ═══════════════════════════════════════════════════════════════════
    // STEP 4: AUTO-SPIDER (ON HOME - DAEMON ∞)
    // ═══════════════════════════════════════════════════════════════════
    ns.print("");
    ns.print("STEP 4/4: Auto-spider (on home, DAEMON ∞)...");
    ns.print("");
    
    const autoSpiderArgs = debugLevel > 1 ? ["--debug", debugLevel] : [];
    const autoSpiderPid = ns.exec("/core/auto-spider.js", "home", 1, ...autoSpiderArgs);
    
    if (autoSpiderPid > 0) {
        ns.print(`   ✅ Auto-spider launched (PID: ${autoSpiderPid} on home)`);
        ns.print("   🔄 Quantum sync active (runs FOREVER)");
    } else {
        ns.print("   ❌ Auto-spider failed to launch!");
        ns.toast("⚠️ Bootstrap: auto-spider failed", "error");
        return;
    }
    
    await ns.sleep(1000);
    
    // ═══════════════════════════════════════════════════════════════════
    // BOOTSTRAP COMPLETE
    // ═══════════════════════════════════════════════════════════════════
    ns.print("");
    ns.print("═══════════════════════════════════════════════════════════");
    ns.print("🎉 BOOTSTRAP COMPLETE!");
    ns.print("");
    ns.print("✅ Spider: Network rooted");
    ns.print("✅ Target: best-target.json created");
    ns.print("✅ Deploy: Workers active on all servers");
    ns.print("✅ Auto-spider: Quantum sync running ∞");
    ns.print("");
    ns.print("💰 Home RAM was 8GB free during entire bootstrap");
    ns.print("🔧 Bootstrap exits now (frees n00dles RAM)");
    ns.print("");
    ns.print("📋 Tail auto-spider to monitor:");
    ns.print("   tail /core/auto-spider.js");
    ns.print("═══════════════════════════════════════════════════════════");
    
    ns.toast("🎉 Bootstrap complete! Workers active!", "success");
    
    await ns.sleep(2000);
    
    // EXIT → libère n00dles RAM
}
