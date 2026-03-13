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
 * @version     0.1.0
 * @author      Claude (Godlike AI Operator)
 * @description Déploiement automatique G.H.O.S.T. depuis GitHub
 *              Wget tous les fichiers depuis repo, structure complète
 * 
 * @usage
 *   run /deploy-ghost.js
 *   run /deploy-ghost.js --user YourGitHubUsername
 * 
 * @commands
 *   --user <name>   Username GitHub (défaut: ghost-bitburner)
 *   --branch <name> Branch Git (défaut: main)
 * 
 * @changelog
 *   v0.1.0 - 2025-01-XX - Initial release
 *            - Wget automatique depuis GitHub
 *            - Création structure /core/, /lib/, /workers/, /tools/
 *            - Téléchargement tous fichiers framework
 *            - Vérification intégrité via manifest.json
 */

const DEFAULT_USER = "USERNAME"; // À REMPLACER par votre GitHub username
const DEFAULT_REPO = "ghost-bitburner";
const DEFAULT_BRANCH = "main";

/** @param {NS} ns */
export async function main(ns) {
    ns.disableLog("ALL");
    ns.tail();
    
    // ═══════════════════════════════════════════════════════════════════
    // CONFIG
    // ═══════════════════════════════════════════════════════════════════
    const user = ns.args[ns.args.indexOf("--user") + 1] || DEFAULT_USER;
    const repo = DEFAULT_REPO;
    const branch = ns.args[ns.args.indexOf("--branch") + 1] || DEFAULT_BRANCH;
    
    const baseUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}`;
    
    ns.print("╔═══════════════════════════════════════════════════════════╗");
    ns.print("║  🚀 G.H.O.S.T. DEPLOYMENT FROM GITHUB                     ║");
    ns.print("╚═══════════════════════════════════════════════════════════╝");
    ns.print("");
    ns.print(`📦 Repository: ${user}/${repo}`);
    ns.print(`🌿 Branch: ${branch}`);
    ns.print(`🌐 Base URL: ${baseUrl}`);
    ns.print("");
    
    // ═══════════════════════════════════════════════════════════════════
    // FILE LIST
    // ═══════════════════════════════════════════════════════════════════
    const files = [
        // Core
        "/boot.js",
        "/manifest.json",
        "/README.md",
        "/CHANGELOG.md",
        
        // Core
        "/core/spider.js",
        "/core/deploy-workers.js",
        
        // Lib
        "/lib/state-manager.js",
        "/lib/debug.js",
        
        // Workers
        "/workers/hack.js",
        "/workers/grow.js",
        "/workers/weaken.js",
        
        // Tools
        "/tools/telemetry.js",
        "/tools/blackbox.js",
        "/tools/log-action.js"
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
        ns.print("🎉 G.H.O.S.T. v0.1.0 deployed successfully!");
        ns.print("");
        ns.print("💡 Next step:");
        ns.print("   run /boot.js");
        ns.print("");
        
        ns.tprint("════════════════════════════════════════════════════════════");
        ns.tprint("✅ G.H.O.S.T. v0.1.0 DEPLOYED SUCCESSFULLY");
        ns.tprint("🚀 Run: run /boot.js");
        ns.tprint("════════════════════════════════════════════════════════════");
    } else {
        ns.print("⚠️  Deployment incomplete - check failed files");
        ns.print("💡 You may need to:");
        ns.print("   1. Verify GitHub username in script");
        ns.print("   2. Check repository is public");
        ns.print("   3. Verify branch name");
        ns.print("");
        
        ns.tprint("⚠️  G.H.O.S.T. deployment incomplete - check logs");
    }
}
