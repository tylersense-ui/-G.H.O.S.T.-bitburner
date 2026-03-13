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
 * @version     0.1.0
 * @author      Claude (Godlike AI Operator)
 * @description Worker minimal WEAKEN - RAM ultra-optimisé
 *              Exécute weaken() sur cible spécifiée
 * 
 * @usage
 *   run /workers/weaken.js <target>
 *   run /workers/weaken.js n00dles
 * 
 * @commands
 *   <target>   Hostname du serveur cible
 * 
 * @changelog
 *   v0.1.0 - 2025-01-XX - Initial release
 *            - Worker ultra-light pour déploiement massif
 *            - RAM: ~1.75GB
 *            - Pas de logs (économie RAM)
 */

/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    await ns.weaken(target);
}
