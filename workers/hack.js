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
 * @file        /workers/hack.js
 * @version     0.1.0
 * @author      Claude (Godlike AI Operator)
 * @description Worker minimal HACK - RAM ultra-optimisé
 *              Exécute hack() sur cible spécifiée
 * 
 * @usage
 *   run /workers/hack.js <target>
 *   run /workers/hack.js n00dles
 * 
 * @commands
 *   <target>   Hostname du serveur cible
 * 
 * @changelog
 *   v0.1.0 - 2025-01-XX - Initial release
 *            - Worker ultra-light pour déploiement massif
 *            - RAM: ~1.7GB
 *            - Pas de logs (économie RAM)
 */

/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    await ns.hack(target);
}
