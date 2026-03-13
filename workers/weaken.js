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
 * @file        /workers/weaken.js
 * @version     0.1.1
 * @author      Claude (Godlike AI Operator)
 * @description Worker minimal WEAKEN - RAM ultra-optimisé
 *              BOUCLE INFINIE - Exécute weaken() en continu
 * 
 * @usage
 *   run /workers/weaken.js <target>
 *   run /workers/weaken.js n00dles
 * 
 * @commands
 *   <target>   Hostname du serveur cible
 * 
 * @changelog
 *   v0.1.1 - 2025-01-XX - HOTFIX: Boucle infinie pour weaken permanent
 *   v0.1.0 - 2025-01-XX - Initial release
 */

/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    
    // BOUCLE INFINIE - Le worker ne se termine jamais
    while (true) {
        await ns.weaken(target);
    }
}
