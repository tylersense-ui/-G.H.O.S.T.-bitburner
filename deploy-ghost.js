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
 * @file        /deploy-ghost.js
 * @version     0.3.0
 * @author      Claude (Godlike AI Operator)
 * @description Déploiement auto-update G.H.O.S.T. depuis GitHub
 *              AUTO-UPDATE : Se télécharge lui-même en premier !
 * 
 * @usage
 *   run /deploy-ghost.js
 *   run /deploy-ghost.js --user YourGitHubUsername
 * 
 * @changelog
 *   v0.3.0 - 2025-01-XX - G.H.O.S.T. v0.3.0 NEXUS Fusion
 *            - Liste fichiers v0.3.0 complète (7 lib/)
 *   v0.2.1 - 2025-01-XX - HOTFIX: Auto-update + liste complète v0.2.0
 *   v0.2.0 - 2025-01-XX - Ajout fichiers Trinity Matrix
 *   v0.1.0 - 2025-01-XX - Initial release
 */

const DEFAULT_USER = "tylersense-ui"; 
const DEFAULT_REPO = "-G.H.O.S.T.-bitburner";
const DEFAULT_BRANCH = "main";

/** @param {NS} ns */
export async function main(ns) {
    ns.disableLog("ALL");
    ns.ui.openTail();
    
    // ═══════════════════════════════════════════════════════════════════
    // CONFIG
    // ═══════════════════════════════════════════════════════════════════
    const user = ns.args[ns.args.indexOf("--user") + 1] || DEFAULT_USER;
    const repo = DEFAULT_REPO;
    const branch = ns.args[ns.args.indexOf("--branch") + 1] || DEFAULT_BRANCH;
    
    const baseUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}`;
    
    ns.print("╔═══════════════════════════════════════════════════════════╗");
    ns.print("║  🚀 G.H.O.S.T. AUTO-UPDATE DEPLOYMENT                     ║");
    ns.print("╚═══════════════════════════════════════════════════════════╝");
    ns.print("");
    ns.print(`📦 Repository: ${user}/${repo}`);
    ns.print(`🌿 Branch: ${branch}`);
    ns.print(`🌐 Base URL: ${baseUrl}`);
    ns.print("");
    
    // ═══════════════════════════════════════════════════════════════════
    // ÉTAPE 0 : AUTO-UPDATE DE deploy-ghost.js LUI-MÊME
    // ═══════════════════════════════════════════════════════════════════
    ns.print("🔄 STEP 0: Self-update deploy-ghost.js...");
    const selfUrl = `${baseUrl}/deploy-ghost.js`;
    const selfUpdate = await ns.wget(selfUrl, "/deploy-ghost.js", "home");
    
    if (selfUpdate) {
        ns.print("   ✅ deploy-ghost.js updated!");
    } else {
        ns.print("   ⚠️  Self-update failed (might be already latest)");
    }
    ns.print("");
    
    // ═══════════════════════════════════════════════════════════════════
    // FILE LIST - COMPLET v0.2.0 TRINITY MATRIX
    // ═══════════════════════════════════════════════════════════════════
    const files = [
        // Core (5)
        "/boot.js",
        "/core/spider.js",
        "/core/deploy-workers.js",
        "/core/target-selector.js",
        "/core/auto-spider.js",
        
        // Lib (7) - NEXUS FUSION v0.3.0
        "/lib/state-manager.js",
        "/lib/debug.js",
        "/lib/capabilities.js",
        "/lib/constants.js",
        "/lib/formulas-helper.js",
        "/lib/logger.js",
        "/lib/network.js",
        
        // Workers (3)
        "/workers/hack.js",
        "/workers/grow.js",
        "/workers/weaken.js",
        
        // Managers (1)
        "/managers/server-manager.js",
        
        // Tools (4)
        "/tools/telemetry.js",
        "/tools/blackbox.js",
        "/tools/log-action.js",
        "/tools/global-kill.js",
        
        // Config
        "/manifest.json"
    ];
    
    ns.print(`📋 Files to download: ${files.length}`);
    ns.print("");
    
    // ═══════════════════════════════════════════════════════════════════
    // DOWNLOAD
    // ═══════════════════════════════════════════════════════════════════
    let success = 0;
    let failed = 0;
    
    for (const file of files) {
        const url = `${baseUrl}${file}`;
        const destination = file;
        
        ns.print(`⏬ Downloading: ${file}...`);
        
        const result = await ns.wget(url, destination, "home");
        
        if (result) {
            success++;
            ns.print(`   ✅ Success`);
        } else {
            failed++;
            ns.print(`   ❌ Failed`);
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // RESULTS
    // ═══════════════════════════════════════════════════════════════════
    ns.print("");
    ns.print("╔═══════════════════════════════════════════════════════════╗");
    ns.print("║  📊 DEPLOYMENT RESULTS                                    ║");
    ns.print("╚═══════════════════════════════════════════════════════════╝");
    ns.print(`✅ Success: ${success}/${files.length}`);
    ns.print(`❌ Failed: ${failed}`);
    ns.print("");
    
    if (failed === 0) {
        ns.print("🎉 G.H.O.S.T. v0.2.0 Trinity Matrix deployed successfully!");
        ns.print("");
        ns.print("💡 Next steps:");
        ns.print("   1. run /tools/global-kill.js    (kill all except telemetry)");
        ns.print("   2. run /boot.js                  (launch Trinity Matrix)");
        ns.print("");
        
        ns.tprint("════════════════════════════════════════════════════════════");
        ns.tprint("✅ G.H.O.S.T. v0.2.0 TRINITY MATRIX DEPLOYED");
        ns.tprint("🚀 Run: run /tools/global-kill.js && run /boot.js");
        ns.tprint("════════════════════════════════════════════════════════════");
    } else {
        ns.print("⚠️  Deployment incomplete - check failed files");
        ns.print("");
        
        ns.tprint("⚠️  G.H.O.S.T. deployment incomplete - check logs");
    }
}
